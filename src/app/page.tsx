import type { Metadata } from "next";
import Link from "next/link";
import { HeroSearch } from "@/components/hero-search";
import { FaqAccordion } from "@/components/faq-accordion";
import { TherapistCard } from "@/components/therapist-card";
import { TensionLine } from "@/components/tension-line";
import { Reveal } from "@/components/reveal";
import { getFeaturedListings, getAllLocations, getTreatmentTypes } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Find a Massage Therapist UK | Qualified, Insured Therapists Near You",
  description:
    "The UK's premier wellness directory. Search qualified, insured massage therapists by treatment, town and availability — and book the right hands for the job.",
};

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m8.5 12.5 2.5 2.5 5-5.5" />
  </svg>
);

// Honest one-line descriptions for the treatment tiles, keyed by slug.
const TREATMENT_BLURBS: Record<string, string> = {
  "sports-massage": "Training load, recovery and injury prevention for active bodies.",
  "deep-tissue": "Slow, firm work for stubborn knots and long-held tension.",
  "swedish-massage": "The classic full-body reset — light to medium pressure.",
  "remedial-massage": "Targeted treatment for specific aches, strains and restrictions.",
  "pregnancy-massage": "Gentle, position-adapted care for changing bodies.",
  "hot-stone-massage": "Heat-assisted release for deep, slow-melting tension.",
  "lymphatic-drainage": "Light, rhythmic strokes to ease swelling and aid recovery.",
  osteopathy: "Hands-on assessment and treatment of the joints and muscles.",
  physiotherapy: "Rehabilitation and movement support from qualified practitioners.",
};

const STEPS = [
  {
    num: "1",
    title: "Search",
    body: "Filter by treatment and town to find therapists who fit around your week.",
  },
  {
    num: "2",
    title: "Compare",
    body: "Every listing is qualified and insured. Read summaries and specialities to find the right fit.",
  },
  {
    num: "3",
    title: "Book",
    body: "Head straight to the therapist's profile and get in touch to book your treatment.",
  },
];

const FAQS = [
  {
    question: "How do I list my practice?",
    answer:
      "Head to the List Your Practice page and submit your details. Once we've verified your qualifications and insurance, your listing goes live in the directory and starts reaching clients searching in your area.",
  },
  {
    question: "What are the benefits of a listing?",
    answer:
      "A listing puts your practice in front of clients actively searching for massage therapy across the UK. You get a dedicated profile, exposure in local and treatment-based searches, and a trusted, verified place in the directory.",
  },
  {
    question: "Are the therapists qualified and insured?",
    answer:
      "Yes. Every therapist in the directory has their qualifications and insurance checked before their listing is approved, so you can book with confidence.",
  },
];

const FEATURED_TOWNS = ["Manchester", "Liverpool", "Glasgow", "Edinburgh"];

export default async function Home() {
  const [featured, locations, treatments] = await Promise.all([
    getFeaturedListings(),
    getAllLocations(),
    getTreatmentTypes(),
  ]);

  const townLinkSlugs = locations.slice(0, 8);

  return (
    <div className="site -mt-20">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <div id="main">
        {/* ===================== Hero ===================== */}
        <section className="hero">
          <TensionLine />
          <div className="hero-inner container">
            <div className="hero-copy">
              <span className="eyebrow">The UK&apos;s verified massage directory</span>
              <h1>
                Every knot has
                <br />
                its <span className="loose">therapist.</span>
              </h1>
              <p className="lead">
                Search qualified, insured massage therapists across the UK — by
                treatment, town and availability — and book the right hands for the
                job.
              </p>
            </div>

            <HeroSearch />

            <ul className="hero-trust">
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Qualifications checked
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Insurance verified
              </li>
            </ul>
          </div>
        </section>

        {/* ===================== Treatments ===================== */}
        <section className="treatments section" id="treatments">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Browse by treatment</span>
              <h2>What does your body need?</h2>
              <p className="lead">
                The most-booked treatments on the directory. Pick one to see
                therapists who specialise in it.
              </p>
            </div>
            <div className="treatment-grid reveal">
              {treatments.map((t) => (
                <Link className="treatment-card" key={t.slug} href={`/massage/${t.slug}/`}>
                  <h3>{t.name}</h3>
                  <p>
                    {TREATMENT_BLURBS[t.slug] ??
                      `Find therapists offering ${t.name.toLowerCase()} near you.`}
                  </p>
                  <span className="arrow">
                    Find therapists <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== Featured therapists ===================== */}
        <section className="section" id="featured">
          <div className="container">
            <div className="featured-head reveal">
              <div className="section-head">
                <span className="eyebrow">Hand-picked practitioners</span>
                <h2>Featured therapists</h2>
                <p className="lead">
                  Qualified, insured and highly regarded — selected from across the
                  directory.
                </p>
              </div>
              <Link className="link-arrow" href="/find-a-therapist">
                View all therapists{" "}
                <span className="arrow">
                  <ArrowIcon />
                </span>
              </Link>
            </div>

            {featured.length > 0 ? (
              <div className="therapist-grid">
                {featured.map((listing) => (
                  <TherapistCard key={listing.slug} listing={listing} reveal />
                ))}
              </div>
            ) : (
              <p className="lead">Featured therapists coming soon.</p>
            )}
          </div>
        </section>

        {/* ===================== How it works ===================== */}
        <section className="steps section">
          <div className="container">
            <div className="section-head centered reveal">
              <span className="eyebrow">How it works</span>
              <h2>From sore to sorted in three steps</h2>
            </div>
            <div className="steps-grid reveal">
              {STEPS.map((step) => (
                <div className="step" key={step.num}>
                  <span className="step-num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== Grow your practice ===================== */}
        <section className="section" id="for-therapists">
          <div className="container">
            <div className="grow-panel reveal">
              <div className="grow-copy">
                <span className="eyebrow">For therapists</span>
                <h2>Grow your practice.</h2>
                <p className="lead">
                  Join a trusted directory of qualified massage therapists. Reach new
                  clients searching in your area and build your reputation.
                </p>
                <ul className="grow-list">
                  <li>
                    <CheckIcon /> Reach clients searching for massage therapy every day
                  </li>
                  <li>
                    <CheckIcon /> A professional, verified profile in the directory
                  </li>
                  <li>
                    <CheckIcon /> Exposure in local and treatment-based searches
                  </li>
                </ul>
                <Link className="btn btn-light" href="/list-your-practice">
                  List your practice
                </Link>
              </div>
              <div className="grow-decor" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ===================== Locations ===================== */}
        <section className="section">
          <div className="container">
            <div className="section-head centered reveal">
              <span className="eyebrow">Across the UK</span>
              <h2>Find a massage therapist near you</h2>
              <p className="lead">
                From city centres to market towns — wherever the tension lives,
                there&apos;s a therapist nearby.
              </p>
            </div>

            <div className="location-grid reveal">
              {FEATURED_TOWNS.map((town) => {
                const match = locations.find(
                  (l) => l.town.toLowerCase() === town.toLowerCase(),
                );
                const href = match ? `/find-a-therapist/${match.slug}/` : "/find-a-therapist";
                return (
                  <Link className="location-tile" key={town} href={href}>
                    <span className="loc-name">{town}</span>
                  </Link>
                );
              })}
            </div>

            <div className="town-links reveal">
              {townLinkSlugs.map((l) => (
                <Link key={l.slug} href={`/find-a-therapist/${l.slug}/`}>
                  {l.town}
                </Link>
              ))}
              <Link className="link-arrow" href="/find-a-therapist">
                All locations{" "}
                <span className="arrow">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section className="section">
          <div className="container">
            <div className="section-head centered reveal">
              <span className="eyebrow">Good to know</span>
              <h2>Frequently asked questions</h2>
            </div>
            <FaqAccordion items={FAQS} reveal />
          </div>
        </section>
      </div>

      <Reveal />
    </div>
  );
}
