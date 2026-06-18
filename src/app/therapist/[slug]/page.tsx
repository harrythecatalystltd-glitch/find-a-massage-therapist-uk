import type { Metadata } from "next";
import Image from "next/image";
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

  return (
    <article className="mx-auto max-w-3xl px-margin-mobile py-16 md:px-margin-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="flex items-start gap-6">
        {listing.logo_url && (
          <Image
            src={listing.logo_url}
            alt={`${listing.business_name} logo`}
            width={96}
            height={96}
            className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover spa-shadow"
          />
        )}
        <div>
          {listing.is_featured && (
            <span className="mb-2 inline-block rounded-full bg-primary-container/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-primary-container">
              Featured
            </span>
          )}
          <h1 className="font-display text-4xl font-bold text-on-surface">
            {listing.business_name}
          </h1>
          {listing.town && (
            <p className="mt-2 text-secondary">{listing.town}</p>
          )}
        </div>
      </header>

      {listing.treatments.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {listing.treatments.map((t) => (
            <span
              key={t.slug}
              className="rounded-full bg-secondary-container/50 px-3 py-1 text-xs font-medium text-on-secondary-container"
            >
              {t.name}
            </span>
          ))}
        </div>
      )}

      {(listing.description_long ?? listing.summary) && (
        <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-on-surface-variant">
          {listing.description_long ?? listing.summary}
        </div>
      )}

      {listing.website_url && (
        <div className="mt-10">
          <a
            href={listing.website_url}
            target="_blank"
            rel={outboundRel}
            className="inline-block rounded-full bg-primary-container px-8 py-3 font-bold text-on-primary-container shadow-md transition-all hover:bg-primary active:scale-95"
          >
            Visit website
          </a>
        </div>
      )}
    </article>
  );
}
