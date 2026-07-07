import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find a Massage Therapy Room to Rent",
  description:
    "Find a massage therapy room to rent, build your business and get links to room rental options for massage therapists.",
};

const PARTNERS = [
  {
    name: "Practice Place Co",
    summary: "Room rental listings for therapists across the UK.",
    url: "https://www.practiceplace.co/",
  },
  {
    name: "Minsony",
    summary: "Room rental listings for therapists in London.",
    url: "https://minsony.com/",
  },
];

export default function RoomsPage() {
  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container">
          <ol className="loc-breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li style={{ color: "var(--ink)" }}>Rooms</li>
          </ol>
          <span className="eyebrow">For therapists</span>
          <h1>Find a Massage Therapy Room</h1>
          <p className="lead" style={{ maxWidth: "640px" }}>
            Links and listings for room rentals for massage therapists in the UK.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Room rental partners</h2>
          <div className="therapist-grid">
            {PARTNERS.map((partner) => (
              <article className="therapist-card" key={partner.name}>
                <div className="therapist-photo">
                  <span className="photo-fallback" aria-hidden="true">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <div className="therapist-body">
                  <h3>{partner.name}</h3>
                  <p className="therapist-loc">{partner.summary}</p>
                  <a
                    className="btn btn-ghost"
                    href={partner.url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                  >
                    View listings
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
