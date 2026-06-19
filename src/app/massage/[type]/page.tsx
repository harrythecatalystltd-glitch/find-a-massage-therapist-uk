import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TherapistFilter } from "@/components/therapist-filter";
import {
  getAllLocations,
  getListingsForTreatment,
  getTreatmentTypes,
} from "@/lib/queries";

export const revalidate = 3600;

const BLURB: Record<string, string> = {
  "sports-massage":
    "Targeted work for training load, recovery and injury prevention, ideal for active bodies and anyone in regular pain.",
  "deep-tissue":
    "Slow, firm pressure that reaches stubborn knots and long-held tension in the deeper muscle layers.",
  "swedish-massage":
    "The classic full-body reset with light to medium pressure to ease stress and aid relaxation.",
  "remedial-massage":
    "Treatment-focused massage to rehabilitate injury, ease chronic pain and restore movement.",
  "pregnancy-massage":
    "Gentle, position-adapted care that supports changing bodies through every trimester.",
  "hot-stone-massage":
    "Heat-assisted release using warmed stones for deep, slow-melting tension relief.",
  "lymphatic-drainage":
    "Light, rhythmic strokes that ease swelling, support the immune system and aid recovery.",
  osteopathy:
    "Hands-on assessment and treatment of muscles, joints and posture to relieve pain and improve movement.",
  physiotherapy:
    "Clinical rehabilitation for injury, pain and mobility, tailored to getting you moving again.",
};

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
    description:
      BLURB[treatment.slug] ??
      `Find qualified ${treatment.name.toLowerCase()} therapists across the UK.`,
  };
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const [treatments, allLocations] = await Promise.all([
    getTreatmentTypes(),
    getAllLocations(),
  ]);
  const treatment = treatments.find((t) => t.slug === type);
  if (!treatment) notFound();

  const listings = await getListingsForTreatment(treatment.slug);
  const others = treatments.filter((t) => t.slug !== treatment.slug);
  const name = treatment.name;

  return (
    <div className="site">
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
            <li style={{ color: "var(--ink)" }}>{name}</li>
          </ol>
          <span className="eyebrow">Massage treatment</span>
          <h1>{name} Therapists in the UK</h1>
          <p className="lead" style={{ maxWidth: "640px" }}>
            {BLURB[treatment.slug] ??
              `Browse qualified ${name.toLowerCase()} therapists across the UK.`}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{name} therapists</h2>
          {listings.length > 0 ? (
            <TherapistFilter listings={listings} showTreatmentChips={false} />
          ) : (
            <div className="loc-cta">
              <h3>No {name.toLowerCase()} listings yet</h3>
              <p>Are you a {name.toLowerCase()} therapist? Claim your spot in the directory.</p>
              <Link className="btn btn-primary" href="/list-your-practice">
                List your practice
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section loc-seo">
        <div className="container">
          <h2>Find {name.toLowerCase()} near you</h2>
          <div className="town-links">
            {allLocations.map((l) => (
              <Link key={l.slug} href={`/find-a-therapist/${l.slug}/`}>
                {l.town}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section">
          <div className="container">
            <h2>Other treatments</h2>
            <div className="town-links">
              {others.map((t) => (
                <Link key={t.slug} href={`/massage/${t.slug}/`}>
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
