import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTreatmentTypes } from "@/lib/queries";
import { EditListingForm } from "./edit-form";

export const metadata: Metadata = { title: "Edit Your Listing" };
export const dynamic = "force-dynamic";

async function getOwnListingForEdit(userId: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("listings")
    .select(
      `business_name, slug, summary, phone, email, instagram, facebook, booking_url,
       website_url, logo_url, tier, description_long, gallery_urls,
       listing_treatment_types ( treatment_type_id )`,
    )
    .eq("owner_user_id", userId)
    .maybeSingle();
  if (!data) return null;

  const { listing_treatment_types, ...rest } = data;
  return {
    ...rest,
    treatment_type_ids: (listing_treatment_types ?? []).map((row) => row.treatment_type_id),
  };
}

export default async function EditListingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) notFound();

  const [listing, treatmentTypes] = await Promise.all([
    getOwnListingForEdit(user.id),
    getTreatmentTypes(),
  ]);
  if (!listing) notFound();

  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container">
          <span className="eyebrow">Dashboard</span>
          <h1>Edit Your Listing</h1>
          {listing.slug && (
            <p className="lead">
              Your listing URL is <strong>/therapist/{listing.slug}/</strong>. This won&apos;t
              change even if you update your business name below.
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <EditListingForm
            listing={listing}
            treatments={treatmentTypes.map((t) => ({ id: t.id, name: t.name }))}
          />
        </div>
      </section>
    </div>
  );
}
