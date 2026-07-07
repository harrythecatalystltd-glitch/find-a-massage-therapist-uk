import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Upgrade Your Listing",
  description:
    "Get more visibility for your practice with a Featured, Premium or Boosted listing on Find a Massage Therapist UK.",
};

const TIERS = [
  {
    name: "Featured",
    blurb: "Your listing appears on the homepage and at the top of your town's page.",
  },
  {
    name: "Premium",
    blurb:
      "A longer profile with a photo gallery, booking button, and a dofollow backlink to your site.",
  },
  {
    name: "Boosted",
    blurb: "Priority placement in search and browse results across the directory.",
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
          <div className="treatment-grid">
            {TIERS.map((tier) => (
              <div className="treatment-card" key={tier.name}>
                <h3>{tier.name}</h3>
                <p>{tier.blurb}</p>
              </div>
            ))}
          </div>

          <div className="loc-cta" style={{ marginTop: "2.5rem" }}>
            <h3>Paid tiers are launching soon</h3>
            <p>
              In the meantime, get in touch and we&apos;ll set you up manually while we finish
              rolling out self-serve upgrades.
            </p>
            <Link className="btn btn-primary" href="/contact">
              Contact us to upgrade
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
