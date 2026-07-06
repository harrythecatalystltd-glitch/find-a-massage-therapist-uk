"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { uniqueSlug, slugify } from "@/lib/slug";
import { sendApprovedEmail } from "@/lib/email";

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

export async function approveListing(id: string) {
  const supabase = createAdminClient();

  const { data: listing } = await supabase
    .from("listings")
    .select("business_name, email, town")
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
