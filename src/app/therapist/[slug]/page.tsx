import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApprovedSlugs, getListingBySlug } from "@/lib/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getApprovedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return {};
  return {
    title: listing.business_name,
    description: listing.summary ?? `Massage therapy from ${listing.business_name}.`,
  };
}

export default async function TherapistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  // Paid feature: free listings link out nofollow; dofollow unlocks with the paid tier.
  const outboundRel = listing.dofollow ? "noopener" : "nofollow noopener";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: listing.business_name,
    ...(listing.website_url ? { url: listing.website_url } : {}),
    ...(listing.logo_url ? { image: listing.logo_url } : {}),
    ...(listing.town
      ? { address: { "@type": "PostalAddress", addressLocality: listing.town } }
      : {}),
  };

  const description = listing.description_long ?? listing.summary;

  return (
    <div className="site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <li style={{ color: "var(--ink)" }}>{listing.business_name}</li>
          </ol>

          <div className="profile-head">
            {listing.logo_url && (
              <Image
                className="profile-logo"
                src={listing.logo_url}
                alt={`${listing.business_name} logo`}
                width={104}
                height={104}
                unoptimized
              />
            )}
            <div>
              {listing.is_featured && <span className="profile-badge">Featured</span>}
              <h1>{listing.business_name}</h1>
              {listing.town && <p className="profile-loc">{listing.town}</p>}
              {listing.treatments.length > 0 && (
                <div className="profile-tags">
                  {listing.treatments.map((t) => (
                    <span className="tag" key={t.slug}>
                      {t.name}
                    </span>
                  ))}
                </div>
              )}
              {(listing.insured || listing.qualifications) && (
                <div className="profile-tags">
                  {listing.insured && (
                    <span className="tag">
                      Insured{listing.insurance_provider ? ` · ${listing.insurance_provider}` : ""}
                    </span>
                  )}
                  {listing.qualifications && <span className="tag">{listing.qualifications}</span>}
                </div>
              )}
              {(listing.google_rating != null || listing.google_review_count != null || listing.google_maps_url) && (
                <p className="profile-loc">
                  {listing.google_rating != null && <strong>★ {listing.google_rating.toFixed(1)}</strong>}
                  {listing.google_review_count != null &&
                    ` (${listing.google_review_count} Google review${listing.google_review_count === 1 ? "" : "s"})`}
                  {listing.google_maps_url && (
                    <>
                      {(listing.google_rating != null || listing.google_review_count != null) && " · "}
                      <a href={listing.google_maps_url} target="_blank" rel="noopener noreferrer">
                        See reviews on Google
                      </a>
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {description && (
            <div className="loc-prose" style={{ whiteSpace: "pre-line" }}>
              {description}
            </div>
          )}

          {listing.website_url && (
            <p style={{ marginTop: "2rem" }}>
              <a
                className="btn btn-primary"
                href={listing.website_url}
                target="_blank"
                rel={outboundRel}
              >
                Visit website
              </a>
            </p>
          )}

          <p style={{ marginTop: "2.5rem" }}>
            <Link className="link-arrow" href="/find-a-therapist">
              Browse more therapists
              <span className="arrow">
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
              </span>
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
