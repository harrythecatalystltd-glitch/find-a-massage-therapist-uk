import Image from "next/image";
import Link from "next/link";
import type { ListingCardData } from "@/lib/queries";

export function TherapistCard({ listing }: { listing: ListingCardData }) {
  return (
    <Link
      href={`/therapist/${listing.slug}`}
      className="group block rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 spa-shadow transition-all duration-500 hover:border-primary-container/40"
    >
      <div className="flex items-start gap-4">
        {listing.logo_url ? (
          <Image
            src={listing.logo_url}
            alt={`${listing.business_name} logo`}
            width={64}
            height={64}
            className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-surface-container text-on-surface-variant">
            <span className="text-xl font-bold">
              {listing.business_name.charAt(0)}
            </span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-2xl font-semibold text-on-surface">
              {listing.business_name}
            </h3>
            {listing.is_featured && (
              <span className="flex-shrink-0 rounded-full bg-primary-container/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-primary-container">
                Featured
              </span>
            )}
          </div>
          {listing.town && (
            <p className="mt-1 text-xs text-secondary">{listing.town}</p>
          )}
          {listing.summary && (
            <p className="mt-3 line-clamp-2 text-on-surface-variant">
              {listing.summary}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
