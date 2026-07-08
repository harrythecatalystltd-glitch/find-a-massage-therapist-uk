"use server";

import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slug";
import { stripeClient } from "@/lib/stripe";
import type { Database } from "@/lib/database.types";

type ListingUpdate = Database["public"]["Tables"]["listings"]["Update"];

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/dashboard/login");
}

export async function openBillingPortal() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dashboard/login");

  const admin = createAdminClient();
  const { data: listing } = await admin
    .from("listings")
    .select("stripe_customer_id")
    .eq("owner_user_id", user.id)
    .maybeSingle();
  if (!listing?.stripe_customer_id) redirect("/dashboard");

  const session = await stripeClient().billingPortal.sessions.create({
    customer: listing.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
  });
  redirect(session.url);
}

export type UpdateListingState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string> }
  | { status: "success" };

const asOptional = (value: FormDataEntryValue | null) =>
  typeof value === "string" && value.trim() !== "" ? value : undefined;

const editListingSchema = z.object({
  business_name: z.string().trim().min(2, "Enter your business name"),
  summary: z.string().trim().min(10, "Enter a short summary").max(280),
  phone: z.string().trim().optional(),
  email: z.email("Enter a valid email").optional(),
  instagram: z.url().optional(),
  facebook: z.url().optional(),
  booking_url: z.url().optional(),
  website_url: z.url("Enter a valid website URL").optional(),
  description_long: z.string().trim().optional(),
  treatment_type_ids: z.array(z.string()).min(1, "Select at least one treatment"),
});

export async function updateOwnListing(
  _prevState: UpdateListingState,
  formData: FormData,
): Promise<UpdateListingState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { status: "error", errors: { form: "Your session expired — sign in again." } };
  }

  const admin = createAdminClient();
  const { data: listing } = await admin
    .from("listings")
    .select("id, tier, logo_url, gallery_urls")
    .eq("owner_user_id", user.id)
    .maybeSingle();
  if (!listing) {
    return { status: "error", errors: { form: "No listing found for this account." } };
  }

  const parsed = editListingSchema.safeParse({
    business_name: asOptional(formData.get("business_name")),
    summary: asOptional(formData.get("summary")),
    phone: asOptional(formData.get("phone")),
    email: asOptional(formData.get("email")),
    instagram: asOptional(formData.get("instagram")),
    facebook: asOptional(formData.get("facebook")),
    booking_url: asOptional(formData.get("booking_url")),
    website_url: asOptional(formData.get("website_url")),
    description_long: asOptional(formData.get("description_long")),
    treatment_type_ids: formData.getAll("treatment_type_ids").map(String),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors };
  }

  const data = parsed.data;

  let logo_url = listing.logo_url;
  const logo = formData.get("logo");
  if (logo instanceof File && logo.size > 0) {
    const path = `${randomBytes(8).toString("hex")}-${slugify(logo.name)}`;
    const { error: uploadError } = await admin.storage
      .from("listing-logos")
      .upload(path, logo, { contentType: logo.type });
    if (!uploadError) {
      logo_url = admin.storage.from("listing-logos").getPublicUrl(path).data.publicUrl;
    }
  }

  const update: ListingUpdate = {
    business_name: data.business_name,
    summary: data.summary,
    phone: data.phone ?? null,
    email: data.email ?? null,
    instagram: data.instagram ?? null,
    facebook: data.facebook ?? null,
    booking_url: data.booking_url ?? null,
    website_url: data.website_url ?? null,
    logo_url,
  };
  if (listing.tier === "vip") {
    update.description_long = data.description_long ?? null;

    const removed = new Set(formData.getAll("gallery_remove").map(String));
    const kept = listing.gallery_urls.filter((url) => !removed.has(url));
    const newFiles = formData.getAll("gallery_files").filter(
      (file): file is File => file instanceof File && file.size > 0,
    );

    const uploaded: string[] = [];
    for (const file of newFiles) {
      const path = `${listing.id}/${randomBytes(8).toString("hex")}-${slugify(file.name)}`;
      const { error: uploadError } = await admin.storage
        .from("listing-gallery")
        .upload(path, file, { contentType: file.type });
      if (!uploadError) {
        uploaded.push(admin.storage.from("listing-gallery").getPublicUrl(path).data.publicUrl);
      }
    }

    const gallery_urls = [...kept, ...uploaded];
    if (gallery_urls.length > 6) {
      return {
        status: "error",
        errors: { gallery: "You can have at most 6 gallery images — remove some first." },
      };
    }
    update.gallery_urls = gallery_urls;
  }

  const { error } = await admin.from("listings").update(update).eq("id", listing.id);
  if (error) {
    return {
      status: "error",
      errors: { form: "Something went wrong saving your changes. Please try again." },
    };
  }

  await admin.from("listing_treatment_types").delete().eq("listing_id", listing.id);
  await admin.from("listing_treatment_types").insert(
    data.treatment_type_ids.map((treatment_type_id) => ({
      listing_id: listing.id,
      treatment_type_id,
    })),
  );

  revalidatePath("/", "layout");
  return { status: "success" };
}
