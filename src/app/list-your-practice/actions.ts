"use server";

import { randomBytes } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendVerificationEmail } from "@/lib/email";
import { listingFormSchema } from "@/lib/listing-form";
import { slugify } from "@/lib/slug";

export type SubmitListingState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string> }
  | { status: "success" };

const asOptional = (value: FormDataEntryValue | null) =>
  typeof value === "string" && value.trim() !== "" ? value : undefined;

export async function submitListing(
  _prevState: SubmitListingState,
  formData: FormData,
): Promise<SubmitListingState> {
  const raw = {
    business_name: asOptional(formData.get("business_name")),
    email: asOptional(formData.get("email")),
    website_url: asOptional(formData.get("website_url")),
    listing_type: asOptional(formData.get("listing_type")),
    address: asOptional(formData.get("address")),
    service_area: asOptional(formData.get("service_area")),
    town: asOptional(formData.get("town")),
    summary: asOptional(formData.get("summary")),
    phone: asOptional(formData.get("phone")),
    instagram: asOptional(formData.get("instagram")),
    facebook: asOptional(formData.get("facebook")),
    booking_url: asOptional(formData.get("booking_url")),
    google_maps_url: asOptional(formData.get("google_maps_url")),
    google_review_count: asOptional(formData.get("google_review_count")),
    google_rating: asOptional(formData.get("google_rating")),
    qualifications: asOptional(formData.get("qualifications")),
    insured: formData.get("insured") === "on",
    insurance_provider: asOptional(formData.get("insurance_provider")),
    treatment_type_ids: formData.getAll("treatment_type_ids").map(String),
    source: asOptional(formData.get("source")),
    utm_source: asOptional(formData.get("utm_source")),
    utm_medium: asOptional(formData.get("utm_medium")),
    utm_content: asOptional(formData.get("utm_content")),
    fbclid: asOptional(formData.get("fbclid")),
  };

  const parsed = listingFormSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors };
  }

  const data = parsed.data;
  const supabase = createAdminClient();

  let logo_url: string | null = null;
  const logo = formData.get("logo");
  if (logo instanceof File && logo.size > 0) {
    const path = `${randomBytes(8).toString("hex")}-${slugify(logo.name)}`;
    const { error: uploadError } = await supabase.storage
      .from("listing-logos")
      .upload(path, logo, { contentType: logo.type });
    if (!uploadError) {
      logo_url = supabase.storage.from("listing-logos").getPublicUrl(path).data.publicUrl;
    }
  }

  const verification_token = randomBytes(32).toString("hex");

  const { data: inserted, error } = await supabase
    .from("listings")
    .insert({
      business_name: data.business_name,
      email: data.email,
      website_url: data.website_url,
      listing_type: data.listing_type,
      address: data.address ?? null,
      service_area: data.service_area ?? null,
      town: data.town,
      summary: data.summary ?? null,
      phone: data.phone ?? null,
      instagram: data.instagram || null,
      facebook: data.facebook || null,
      booking_url: data.booking_url || null,
      google_maps_url: data.google_maps_url || null,
      google_review_count: data.google_review_count ?? null,
      google_rating: data.google_rating ?? null,
      qualifications: data.qualifications ?? null,
      insured: data.insured,
      insurance_provider: data.insurance_provider ?? null,
      logo_url,
      verification_token,
      source: data.source ?? null,
      utm_source: data.utm_source ?? null,
      utm_medium: data.utm_medium ?? null,
      utm_content: data.utm_content ?? null,
      fbclid: data.fbclid ?? null,
    })
    .select("id")
    .single();

  if (error || !inserted) {
    return {
      status: "error",
      errors: { form: "Something went wrong saving your listing. Please try again." },
    };
  }

  await supabase.from("listing_treatment_types").insert(
    data.treatment_type_ids.map((treatment_type_id) => ({
      listing_id: inserted.id,
      treatment_type_id,
    })),
  );

  await sendVerificationEmail(data.email, verification_token);

  return { status: "success" };
}
