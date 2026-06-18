import type { Metadata } from "next";
import { Suspense } from "react";
import { TherapistFilter } from "@/components/therapist-filter";
import {
  getApprovedListings,
  getApprovedTreatmentsBySlug,
  getTreatmentTypes,
} from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Find a Massage Therapist",
  description:
    "Browse qualified, insured massage therapists across the UK by treatment, town and search.",
};

export default async function FindATherapistPage() {
  const [listings, treatmentTypes, treatmentsByListing] = await Promise.all([
    getApprovedListings(),
    getTreatmentTypes(),
    getApprovedTreatmentsBySlug(),
  ]);

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-16 md:px-margin-desktop">
      <header className="mb-10 text-center">
        <h1 className="font-display text-4xl font-bold text-on-surface md:text-5xl">
          Find a Massage Therapist
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
          Browse qualified, insured therapists across the UK. Filter by treatment,
          town or search by name.
        </p>
      </header>

      <Suspense>
        <TherapistFilter
          listings={listings}
          treatments={treatmentTypes.map((t) => ({ name: t.name, slug: t.slug }))}
          treatmentsByListing={treatmentsByListing}
        />
      </Suspense>
    </div>
  );
}
