import type { Metadata } from "next";
import { TherapistFilter } from "@/components/therapist-filter";
import { getApprovedListings, getTreatmentTypes } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Find a Massage Therapist",
  description:
    "Browse qualified, insured massage therapists across the UK by treatment, town and search.",
};

export default async function FindATherapistPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [{ q }, listings, treatmentTypes] = await Promise.all([
    searchParams,
    getApprovedListings(),
    getTreatmentTypes(),
  ]);

  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container">
          <span className="eyebrow">UK massage directory</span>
          <h1>Find a Massage Therapist</h1>
          <p className="lead" style={{ maxWidth: "640px" }}>
            Browse qualified therapists across the UK. Filter by treatment, town, or
            search by name.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <TherapistFilter
            listings={listings}
            treatments={treatmentTypes.map((t) => ({ name: t.name, slug: t.slug }))}
            initialSearch={q ?? ""}
          />
        </div>
      </section>
    </div>
  );
}
