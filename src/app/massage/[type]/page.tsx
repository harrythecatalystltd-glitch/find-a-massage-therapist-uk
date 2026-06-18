import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TherapistCard } from "@/components/therapist-card";
import { getListingsForTreatment, getTreatmentTypes } from "@/lib/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  const treatments = await getTreatmentTypes();
  return treatments.map((t) => ({ type: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const treatments = await getTreatmentTypes();
  const treatment = treatments.find((t) => t.slug === type);
  if (!treatment) return {};
  return {
    title: `${treatment.name} Therapists in the UK`,
    description: `Find qualified ${treatment.name.toLowerCase()} therapists across the UK.`,
  };
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const treatments = await getTreatmentTypes();
  const treatment = treatments.find((t) => t.slug === type);
  if (!treatment) notFound();

  const listings = await getListingsForTreatment(treatment.slug);
  const others = treatments.filter((t) => t.slug !== treatment.slug);

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-16 md:px-margin-desktop">
      <header className="mb-10 text-center">
        <h1 className="font-display text-4xl font-bold text-on-surface md:text-5xl">
          {treatment.name} Therapists in the UK
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
          Browse qualified, insured {treatment.name.toLowerCase()} therapists across the
          UK.
        </p>
      </header>

      {listings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {listings.map((listing) => (
            <TherapistCard key={listing.slug} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-10 text-center">
          <p className="text-on-surface-variant">
            No {treatment.name.toLowerCase()} listings yet.
          </p>
          <Link
            href="/list-your-practice"
            className="mt-6 inline-block rounded-full bg-primary-container px-8 py-3 font-bold text-on-primary-container shadow-md transition-all hover:bg-primary active:scale-95"
          >
            List your practice
          </Link>
        </div>
      )}

      {others.length > 0 && (
        <section className="mt-16 border-t border-outline-variant/30 pt-10">
          <h2 className="font-display text-2xl font-semibold text-on-surface">
            Other treatments
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((t) => (
              <Link
                key={t.slug}
                href={`/massage/${t.slug}`}
                className="rounded-full bg-secondary-container/50 px-4 py-2 text-sm font-medium text-on-secondary-container transition-colors hover:bg-secondary-container"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
