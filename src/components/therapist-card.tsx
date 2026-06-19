import Image from "next/image";
import Link from "next/link";
import type { ListingCardData } from "@/lib/queries";

/**
 * Premium therapist card (design-reference `.therapist-card`), adapted to real
 * listing data: the photo area shows the business logo (object-fit: contain on a
 * lilac wash, since listings supply logos not full-bleed portraits). Reused by the
 * home page, browse, location and treatment pages.
 */
export function TherapistCard({
  listing,
  reveal = false,
}: {
  listing: ListingCardData;
  reveal?: boolean;
}) {
  const tags = (listing.treatments ?? []).slice(0, 2);

  return (
    <article className={reveal ? "therapist-card reveal" : "therapist-card"}>
      <div className="therapist-photo">
        {listing.logo_url ? (
          <Image
            src={listing.logo_url}
            alt={`${listing.business_name} logo`}
            width={400}
            height={300}
            unoptimized
          />
        ) : (
          <span className="photo-fallback" aria-hidden="true">
            {listing.business_name.charAt(0)}
          </span>
        )}
        {listing.is_featured && <span className="badge-tier">Featured</span>}
      </div>

      <div className="therapist-body">
        <h3>{listing.business_name}</h3>
        {listing.town && (
          <p className="therapist-loc">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {listing.town}
          </p>
        )}

        {tags.length > 0 && (
          <div className="tag-row">
            {tags.map((t) => (
              <span className="tag" key={t.slug}>
                {t.name}
              </span>
            ))}
          </div>
        )}

        <Link className="btn btn-ghost" href={`/therapist/${listing.slug}/`}>
          View profile
        </Link>
      </div>
    </article>
  );
}
