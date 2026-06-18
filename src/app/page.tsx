import type { Metadata } from "next";
import Link from "next/link";
import { HeroSearch } from "@/components/hero-search";
import { FaqAccordion } from "@/components/faq-accordion";
import { TherapistCard } from "@/components/therapist-card";
import { getFeaturedListings, getAllLocations } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Find a Massage Therapist UK | Qualified, Insured Therapists Near You",
  description:
    "The UK's premier wellness directory. Search qualified, insured massage therapists by treatment, town and availability — and book the right hands for the job.",
};

const STEPS = [
  {
    icon: "search",
    title: "Search",
    body: "Tell us the treatment you need and where you are. Browse therapists by speciality and town.",
  },
  {
    icon: "verified",
    title: "Compare",
    body: "Every listing is qualified and insured. Read summaries and specialities to find the right fit.",
  },
  {
    icon: "spa",
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
      "A listing puts your practice in front of thousands of clients actively searching for massage therapy across the UK. You get a dedicated profile, exposure in local and treatment-based searches, and a trusted, verified place in the directory.",
  },
  {
    question: "Are the therapists qualified and insured?",
    answer:
      "Yes. Every therapist in the directory has their qualifications and insurance checked before their listing is approved, so you can book with confidence.",
  },
];

export default async function Home() {
  const [featured, locations] = await Promise.all([
    getFeaturedListings(),
    getAllLocations(),
  ]);

  return (
    <>
      {/* ===================== Hero ===================== */}
      <section className="relative overflow-hidden bg-primary">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 10%, #bfa6d9 0%, transparent 60%), radial-gradient(50% 50% at 10% 90%, #7549a3 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-container-max px-margin-mobile py-24 md:px-margin-desktop md:py-32">
          <div className="max-w-3xl">
            <span className="mb-4 block font-label-md text-label-md uppercase tracking-[0.2em] text-on-primary-container">
              The UK&apos;s verified massage directory
            </span>
            <h1 className="font-display text-[44px] font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
              Every knot has{" "}
              <i className="font-normal italic text-on-primary-container">
                its therapist.
              </i>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80">
              Search qualified, insured massage therapists across the UK — by
              treatment, town and availability — and book the right hands for the
              job.
            </p>
          </div>
          <div className="mt-10 max-w-2xl">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* ===================== Featured Therapists ===================== */}
      <section className="mx-auto max-w-container-max px-margin-mobile py-section-gap md:px-margin-desktop">
        <div className="mb-12 text-center">
          <span className="mb-4 block font-label-md text-label-md uppercase tracking-[0.2em] text-secondary">
            Featured Therapists
          </span>
          <h2 className="font-display text-3xl font-semibold text-on-surface md:text-4xl">
            Elite hands, hand-picked
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
            A selection of our most highly regarded therapists from across the
            directory.
          </p>
        </div>

        {featured.length > 0 ? (
          <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <TherapistCard key={listing.slug} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-center text-on-surface-variant">
            Featured therapists coming soon.
          </p>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/find-a-therapist"
            className="inline-block rounded-full bg-primary-container px-8 py-3 font-bold text-label-md text-on-primary-container transition-all hover:bg-primary hover:text-white active:scale-95"
          >
            Browse all therapists
          </Link>
        </div>
      </section>

      {/* ===================== How It Works ===================== */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-container-max px-margin-mobile py-section-gap md:px-margin-desktop">
          <div className="mb-12 text-center">
            <span className="mb-4 block font-label-md text-label-md uppercase tracking-[0.2em] text-secondary">
              How It Works
            </span>
            <h2 className="font-display text-3xl font-semibold text-on-surface md:text-4xl">
              From sore to sorted in three steps
            </h2>
          </div>
          <div className="grid gap-gutter md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.title} className="text-center">
                <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container/50 text-primary">
                  <span
                    className="material-symbols-outlined text-[32px]"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </span>
                </span>
                <h3 className="font-display text-2xl font-semibold text-on-surface">
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-on-surface-variant">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== Grow Your Practice CTA ===================== */}
      <section className="mx-auto max-w-container-max px-margin-mobile py-section-gap md:px-margin-desktop">
        <div className="overflow-hidden rounded-[2rem] bg-primary">
          <div className="grid items-center gap-8 px-8 py-14 md:grid-cols-2 md:px-16 md:py-20">
            <div>
              <span className="mb-4 block font-label-md text-label-md uppercase tracking-[0.2em] text-on-primary-container">
                For Therapists
              </span>
              <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
                Grow your practice with a verified listing
              </h2>
              <p className="mt-4 max-w-md text-white/80">
                Reach thousands of clients searching for massage therapy every
                day. Get a dedicated profile and a trusted place in the UK&apos;s
                premier directory.
              </p>
            </div>
            <div className="md:text-right">
              <Link
                href="/list-your-practice"
                className="inline-block rounded-full bg-surface-container-lowest px-10 py-4 text-lg font-bold text-primary shadow-xl transition-all hover:bg-brand-accent active:scale-95"
              >
                List your practice
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Locations ===================== */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-container-max px-margin-mobile py-section-gap md:px-margin-desktop">
          <div className="mb-12 text-center">
            <span className="mb-4 block font-label-md text-label-md uppercase tracking-[0.2em] text-secondary">
              Locations
            </span>
            <h2 className="font-display text-3xl font-semibold text-on-surface md:text-4xl">
              Find a therapist near you
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
              Browse massage therapists by town and city across the UK.
            </p>
          </div>
          {locations.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/find-a-therapist/${loc.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest px-5 py-4 spa-shadow transition-all duration-300 hover:border-primary-container/40"
                >
                  <span className="font-medium text-on-surface">{loc.town}</span>
                  <span className="material-symbols-outlined text-outline transition-transform group-hover:translate-x-1 group-hover:text-primary">
                    arrow_forward
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="mx-auto max-w-3xl px-margin-mobile py-section-gap md:px-margin-desktop">
        <div className="mb-12 text-center">
          <span className="mb-4 block font-label-md text-label-md uppercase tracking-[0.2em] text-secondary">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-semibold text-on-surface md:text-4xl">
            Questions, answered
          </h2>
        </div>
        <FaqAccordion items={FAQS} />
      </section>
    </>
  );
}
