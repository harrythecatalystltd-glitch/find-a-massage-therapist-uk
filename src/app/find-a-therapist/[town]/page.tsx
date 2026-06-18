import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TherapistCard } from "@/components/therapist-card";
import { nearestTowns, type GeoPoint } from "@/lib/geo";
import {
  getAllLocations,
  getListingsForTown,
  getLocationBySlug,
  getTreatmentTypes,
} from "@/lib/queries";

export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://findamassagetherapist.co.uk";

type Faq = { question: string; answer: string };

function parseFaqs(raw: unknown): Faq[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (f): f is Faq =>
      f != null &&
      typeof f === "object" &&
      typeof (f as Faq).question === "string" &&
      typeof (f as Faq).answer === "string",
  );
}

export async function generateStaticParams() {
  const locations = await getAllLocations();
  return locations.map((l) => ({ town: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town } = await params;
  const location = await getLocationBySlug(town);
  if (!location) return {};
  return {
    title: `Massage Therapists in ${location.town}`,
    description:
      location.intro_copy ??
      `Find qualified, insured massage therapists in ${location.town} and nearby areas.`,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ town: string }>;
}) {
  const { town } = await params;
  const location = await getLocationBySlug(town);
  if (!location) notFound();

  const [listings, treatments, allLocations] = await Promise.all([
    getListingsForTown(location.town),
    getTreatmentTypes(),
    getAllLocations(),
  ]);

  const faqs = parseFaqs(location.faqs);

  // Nearest towns (n=6) computed from lat/lng over all locations.
  let nearest: typeof allLocations = [];
  if (location.lat != null && location.lng != null) {
    const origin: GeoPoint = {
      name: location.town,
      lat: location.lat,
      lng: location.lng,
    };
    const points = allLocations
      .filter((l) => l.slug !== location.slug && l.lat != null && l.lng != null)
      .map((l) => ({ ...l, name: l.town, lat: l.lat as number, lng: l.lng as number }));
    nearest = nearestTowns(origin, points, 6);
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Find a Therapist",
        item: SITE_URL + "/find-a-therapist/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.town,
        item: `${SITE_URL}/find-a-therapist/${location.slug}/`,
      },
    ],
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-16 md:px-margin-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* 1. Breadcrumb + H1 */}
      <nav aria-label="Breadcrumb" className="text-sm text-on-surface-variant">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/find-a-therapist" className="hover:text-primary">
              Find a Therapist
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-on-surface">{location.town}</li>
        </ol>
      </nav>

      <h1 className="mt-6 font-display text-4xl font-bold text-on-surface md:text-5xl">
        Massage Therapists in {location.town}
      </h1>

      {/* 2. Local SEO body (only if present) */}
      {(location.intro_copy || location.seo_body) && (
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-on-surface-variant">
          {location.intro_copy && (
            <p className="whitespace-pre-line">{location.intro_copy}</p>
          )}
          {location.seo_body && (
            <div className="whitespace-pre-line">{location.seo_body}</div>
          )}
        </div>
      )}

      {/* 3. Treatment-type chips */}
      {treatments.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-on-surface">
            Browse by treatment
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {treatments.map((t) => (
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

      {/* 4. Therapists for the town */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-on-surface">
          Therapists in {location.town}
        </h2>
        {listings.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {listings.map((listing) => (
              <TherapistCard key={listing.slug} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-10 text-center">
            <p className="text-on-surface-variant">
              Be the first therapist listed in {location.town}.
            </p>
            <Link
              href="/list-your-practice"
              className="mt-6 inline-block rounded-full bg-primary-container px-8 py-3 font-bold text-on-primary-container shadow-md transition-all hover:bg-primary active:scale-95"
            >
              List your practice
            </Link>
          </div>
        )}
      </section>

      {/* 5. Area FAQs (only if present) */}
      {faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-on-surface">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6">
            {faqs.map((f, i) => (
              <div key={i}>
                <dt className="font-semibold text-on-surface">{f.question}</dt>
                <dd className="mt-2 whitespace-pre-line text-on-surface-variant">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* 6. Nearest towns + full A–Z list */}
      {nearest.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-on-surface">
            Massage therapists near {location.town}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {nearest.map((l) => (
              <Link
                key={l.slug}
                href={`/find-a-therapist/${l.slug}/`}
                className="rounded-full bg-secondary-container/50 px-4 py-2 text-sm font-medium text-on-secondary-container transition-colors hover:bg-secondary-container"
              >
                {l.town}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 border-t border-outline-variant/30 pt-10">
        <h2 className="font-display text-2xl font-semibold text-on-surface">
          All locations
        </h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {allLocations.map((l) => (
            <Link
              key={l.slug}
              href={`/find-a-therapist/${l.slug}/`}
              className="text-on-surface-variant hover:text-primary"
            >
              {l.town}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
