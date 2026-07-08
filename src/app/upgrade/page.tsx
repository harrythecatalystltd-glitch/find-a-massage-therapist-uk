import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Upgrade Your Listing",
  description:
    "Compare Free, Pro and VIP listing tiers on Find a Massage Therapist UK — dofollow links, featured placement, and a photo gallery.",
  alternates: { canonical: "/upgrade/" },
};

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m8.5 12.5 2.5 2.5 5-5.5" />
  </svg>
);

const TIERS = [
  {
    name: "Free",
    price: "£0",
    blurb: "What every listing gets by default.",
    features: ["Listed in the directory", "Nofollow outbound link to your website"],
  },
  {
    name: "Pro",
    price: "£7",
    badge: "Most popular",
    blurb: "Pass on more SEO value and capture better leads.",
    features: [
      "Everything in Free",
      "Dofollow outbound link to your website — helps you get found on Google",
      "Higher placement on your town's location page",
      "A star next to your listing",
      "Full profile unlock to capture better leads",
    ],
  },
  {
    name: "VIP",
    price: "£27",
    blurb: "Maximum visibility, done for you.",
    features: [
      "Everything in Pro",
      "Photo gallery on your profile to capture better leads",
      "Featured listing on the homepage, and top of your town's page with a Featured badge",
      "A full monthly report on traffic to your site",
      "One blog post a month about your business, to drive more traffic to your site",
      "One social media post a month promoting your business",
    ],
  },
];

export default function UpgradePage() {
  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container">
          <ol className="loc-breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li style={{ color: "var(--ink)" }}>Upgrade</li>
          </ol>
          <span className="eyebrow">For therapists</span>
          <h1>Upgrade Your Listing</h1>
          <p className="lead" style={{ maxWidth: "640px" }}>
            Stand out from the crowd with more visibility, a richer profile, and a dofollow
            backlink to your website.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pricing-grid">
            {TIERS.map((tier) => (
              <div
                className={tier.badge ? "pricing-card pricing-card-highlight" : "pricing-card"}
                key={tier.name}
              >
                {tier.badge && <span className="pricing-badge">{tier.badge}</span>}
                <div className="pricing-head">
                  <h3>{tier.name}</h3>
                  <p className="pricing-price">
                    {tier.price}
                    {tier.price !== "£0" && <span>/mo</span>}
                  </p>
                  <p className="pricing-blurb">{tier.blurb}</p>
                </div>
                <ul className="pricing-features">
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  className={tier.badge ? "btn btn-light" : "btn btn-ghost"}
                  href={tier.name === "Free" ? "/list-your-practice" : "/dashboard/login"}
                >
                  {tier.name === "Free" ? "List your practice" : `Upgrade to ${tier.name}`}
                </Link>
              </div>
            ))}
          </div>

          <div className="loc-cta" style={{ marginTop: "2.5rem" }}>
            <h3>Already listed with us?</h3>
            <p>Log in to your dashboard to upgrade to Pro or VIP in a couple of clicks.</p>
            <Link className="btn btn-primary" href="/dashboard/login">
              Log in to your dashboard to upgrade
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
