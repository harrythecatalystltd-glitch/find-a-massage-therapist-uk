"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { uniqueSlug } from "@/lib/slug";

export async function approveListing(id: string) {
  const supabase = createAdminClient();

  const { data: listing } = await supabase
    .from("listings")
    .select("business_name")
    .eq("id", id)
    .single();
  if (!listing) return;

  const { data: existing } = await supabase.from("listings").select("slug").not("slug", "is", null);
  const taken = new Set((existing ?? []).map((row) => row.slug as string));
  const slug = uniqueSlug(listing.business_name, taken);

  await supabase
    .from("listings")
    .update({ status: "approved", slug, approved_at: new Date().toISOString() })
    .eq("id", id);

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
