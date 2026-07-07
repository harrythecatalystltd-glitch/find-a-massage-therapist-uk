import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TherapistFilter } from "@/components/therapist-filter";
import { FaqAccordion } from "@/components/faq-accordion";
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
    alternates: { canonical: `/find-a-therapist/${location.slug}/` },
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

  // Treatment chips, limited to treatments actually offered by this town's listings.
  const townTreatmentSlugs = new Set(
    listings.flatMap((l) => (l.treatments ?? []).map((t) => t.slug)),
  );
  const townTreatments = treatments
    .filter((t) => townTreatmentSlugs.has(t.slug))
    .map((t) => ({ name: t.name, slug: t.slug }));

  const faqs = parseFaqs(location.faqs);
  const seoParagraphs = (location.seo_body ?? "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // Nearest towns (n=6) computed from lat/lng over all locations.
  let nearest: typeof allLocations = [];
  if (location.lat != null && location.lng != null) {
    const origin: GeoPoint = { name: location.town, lat: location.lat, lng: location.lng };
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
    <div className="site">
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

      {/* Hero */}
      <section className="loc-hero">
        <div className="container">
          <ol className="loc-breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/find-a-therapist">Find a Therapist</Link>
            </li>
            <li aria-hidden>/</li>
            <li style={{ color: "var(--ink)" }}>{location.town}</li>
          </ol>
          <span className="eyebrow">UK massage directory</span>
          <h1>Massage Therapists in {location.town}</h1>
          {location.intro_copy && (
            <p className="lead" style={{ maxWidth: "640px" }}>
              {location.intro_copy}
            </p>
          )}
        </div>
      </section>

      {/* Listings */}
      <section className="section">
        <div className="container">
          <h2>Therapists in {location.town}</h2>
          {listings.length > 0 ? (
            <TherapistFilter
              listings={listings}
              treatments={townTreatments}
              showTownInput={false}
            />
          ) : (
            <div className="loc-cta">
              <h3>Be the first therapist listed in {location.town}</h3>
              <p>
                There are no therapists listed in {location.town} yet. Claim the spot
                and reach clients searching here.
              </p>
              <Link className="btn btn-primary" href="/list-your-practice">
                List your practice
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* SEO body — below the listings */}
      {seoParagraphs.length > 0 && (
        <section className="section loc-seo">
          <div className="container">
            <div className="loc-prose">
              <h2>Massage therapy in {location.town}</h2>
              {seoParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ — same accordion as the home page */}
      {faqs.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head centered">
              <span className="eyebrow">Good to know</span>
              <h2>Massage in {location.town}: your questions answered</h2>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}

      {/* Nearest + all locations */}
      <section className="section">
        <div className="container">
          {nearest.length > 0 && (
            <>
              <h2>Massage therapists near {location.town}</h2>
              <div className="town-links">
                {nearest.map((l) => (
                  <Link key={l.slug} href={`/find-a-therapist/${l.slug}/`}>
                    {l.town}
                  </Link>
                ))}
              </div>
            </>
          )}
          <h2 style={{ marginTop: nearest.length > 0 ? "2.5rem" : 0 }}>All locations</h2>
          <div className="town-links">
            {allLocations.map((l) => (
              <Link key={l.slug} href={`/find-a-therapist/${l.slug}/`}>
                {l.town}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
