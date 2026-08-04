// Re-sends the notices that approveListing skipped when MailerSend's daily quota ran out
// mid-batch: the status update commits before the email, so a mail failure leaves a listing
// live, un-notified, and without a dashboard login. Those rows are exactly the approved
// research_outreach listings with no owner_user_id.
// Run: npx --yes tsx scripts/backfill-outreach-notices.ts [--send]
// Defaults to a dry run — pass --send to actually email people.
import { loadEnvFile } from "node:process";
import { createClient } from "@supabase/supabase-js";

loadEnvFile(".env.local");
import { sendListingAddedNoticeEmail, sendDashboardInviteEmail } from "../src/lib/email";
import type { Database } from "../src/lib/database.types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");

const supabase = createClient<Database>(url, key, { auth: { persistSession: false } });

const EMAILS_PER_LISTING = 2; // listing-added notice + dashboard invite

async function remainingQuota(): Promise<number | null> {
  try {
    const res = await fetch("https://api.mailersend.com/v1/api-quota", {
      headers: { Authorization: `Bearer ${process.env.MAILERSEND_API_TOKEN}`, Accept: "application/json" },
    });
    if (!res.ok) return null;
    const { remaining } = (await res.json()) as { remaining: number };
    return remaining;
  } catch {
    return null;
  }
}

/** Same as the admin action's version, but tolerates an auth user that already exists —
 * a half-finished earlier run may have created one before failing to link it. */
async function provisionDashboardLogin(listingId: string, email: string, businessName: string) {
  const { data: created, error } = await supabase.auth.admin.createUser({ email, email_confirm: true });

  let userId = created?.user?.id;
  if (error && !userId) {
    const { data: list } = await supabase.auth.admin.listUsers();
    userId = list?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())?.id;
    if (!userId) throw new Error(`could not create or find an auth user: ${error.message}`);
  }

  await supabase.from("listings").update({ owner_user_id: userId }).eq("id", listingId);

  const { data: link } = await supabase.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/set-password` },
  });
  if (!link?.properties) throw new Error("generateLink returned no properties");

  const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?token_hash=${link.properties.hashed_token}&type=recovery`;
  await sendDashboardInviteEmail(email, businessName, confirmUrl);
}

async function main() {
  const send = process.argv.includes("--send");

  const { data: pending, error } = await supabase
    .from("listings")
    .select("id, business_name, email, town, slug")
    .eq("status", "approved")
    .eq("source", "research_outreach")
    .is("owner_user_id", null)
    .not("email", "is", null)
    .order("approved_at", { ascending: true });
  if (error) throw new Error(error.message);

  const rows = pending ?? [];
  if (!rows.length) {
    console.log("Nothing to backfill — every approved research_outreach listing already has an owner.");
    return;
  }

  console.log(`${rows.length} listing(s) approved but never notified:`);
  for (const r of rows) console.log(`  - ${r.business_name} (${r.town}) → ${r.email}`);

  const needed = rows.length * EMAILS_PER_LISTING;
  const remaining = await remainingQuota();
  console.log(`\nEmails required: ${needed}. MailerSend remaining: ${remaining ?? "unknown"}.`);

  if (!send) {
    console.log("\n[dry run] Nothing sent. Re-run with --send to actually email these therapists.");
    return;
  }
  if (remaining !== null && remaining < needed) {
    console.error(`\nAborting: quota resets at 00:00 UTC and only ${remaining} send(s) remain — not enough for ${needed}.`);
    process.exitCode = 1;
    return;
  }

  let done = 0;
  for (const r of rows) {
    try {
      await sendListingAddedNoticeEmail(r.email!, r.business_name, r.slug!);
      await provisionDashboardLogin(r.id, r.email!, r.business_name);
      console.log(`  ✓ ${r.business_name}`);
      done++;
    } catch (e) {
      // Leave owner_user_id null so this listing is picked up again on the next run.
      console.error(`  ✗ ${r.business_name}: ${(e as Error).message}`);
    }
  }

  console.log(`\nBackfilled ${done} of ${rows.length}. Re-run to retry any that failed.`);
}

main();
