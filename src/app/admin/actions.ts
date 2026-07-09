"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { uniqueSlug, slugify } from "@/lib/slug";
import { sendApprovedEmail, sendDashboardInviteEmail } from "@/lib/email";

/** Ensure a location page exists for this town so the listing is discoverable,
 * even if it's a new town nobody has seeded a page for yet. Matches the same
 * substring rule `getListingsForTown` uses, so "covered" here means the
 * listing would actually show up on that page. */
async function ensureLocationForTown(
  supabase: ReturnType<typeof createAdminClient>,
  town: string | null,
) {
  if (!town) return;
  const { data: locations } = await supabase.from("locations").select("town");
  const covered = (locations ?? []).some((l) =>
    town.toLowerCase().includes((l.town as string).toLowerCase()),
  );
  if (covered) return;

  await supabase
    .from("locations")
    .upsert({ town, slug: slugify(town) }, { onConflict: "slug", ignoreDuplicates: true });
}

/** First approval provisions a dashboard login: create the auth user, link it to the
 * listing, and email a one-time password-setup link. Re-approvals (owner_user_id already
 * set) skip this — the therapist already has an account. */
async function provisionDashboardLogin(
  supabase: ReturnType<typeof createAdminClient>,
  listingId: string,
  email: string,
  businessName: string,
) {
  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
  });
  if (createError || !created.user) return;

  await supabase.from("listings").update({ owner_user_id: created.user.id }).eq("id", listingId);

  const { data: link } = await supabase.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/set-password` },
  });
  if (!link?.properties) return;

  // Not link.properties.action_link — that points at Supabase's own /auth/v1/verify,
  // which redirects with an implicit-flow `#access_token=` fragment our PKCE-only
  // browser client can't consume (see src/app/auth/confirm/route.ts).
  const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?token_hash=${link.properties.hashed_token}&type=recovery`;
  await sendDashboardInviteEmail(email, businessName, confirmUrl);
}

export async function approveListing(id: string) {
  const supabase = createAdminClient();

  const { data: listing } = await supabase
    .from("listings")
    .select("business_name, email, town, owner_user_id")
    .eq("id", id)
    .single();
  if (!listing) return;

  const { data: existing } = await supabase.from("listings").select("slug").not("slug", "is", null);
  const taken = new Set((existing ?? []).map((row) => row.slug as string));
  const slug = uniqueSlug(listing.business_name, taken);

  await ensureLocationForTown(supabase, listing.town);

  await supabase
    .from("listings")
    .update({ status: "approved", slug, approved_at: new Date().toISOString() })
    .eq("id", id);

  if (listing.email) {
    await sendApprovedEmail(listing.email, listing.business_name, slug);

    if (!listing.owner_user_id) {
      await provisionDashboardLogin(supabase, id, listing.email, listing.business_name);
    }
  }

  revalidatePath("/", "layout");
}

export async function rejectListing(id: string) {
  const supabase = createAdminClient();
  await supabase.from("listings").update({ status: "rejected" }).eq("id", id);
  revalidatePath("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
