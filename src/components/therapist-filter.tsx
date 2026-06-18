"use client";

import { useMemo, useState } from "react";
import { TherapistCard } from "@/components/therapist-card";
import type { ListingCardData } from "@/lib/queries";

type TreatmentMap = Record<string, string[]>; // slug -> treatment names

export function TherapistFilter({
  listings,
  treatments,
  treatmentsByListing,
}: {
  listings: ListingCardData[];
  treatments: { name: string; slug: string }[];
  treatmentsByListing: TreatmentMap;
}) {
  const [activeTreatment, setActiveTreatment] = useState<string | null>(null);
  const [town, setTown] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const t = town.trim().toLowerCase();
    return listings.filter((l) => {
      if (t && !(l.town ?? "").toLowerCase().includes(t)) return false;
      if (q) {
        const haystack = `${l.business_name} ${l.summary ?? ""} ${l.town ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (activeTreatment) {
        const names = treatmentsByListing[l.slug] ?? [];
        const match = treatments.find((tr) => tr.slug === activeTreatment)?.name;
        if (!match || !names.includes(match)) return false;
      }
      return true;
    });
  }, [listings, search, town, activeTreatment, treatments, treatmentsByListing]);

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search therapists"
            className="flex-1 rounded-xl border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 outline-none focus:border-primary-container"
          />
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            placeholder="Town or postcode"
            className="flex-1 rounded-xl border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 outline-none focus:border-primary-container"
          />
        </div>
        {treatments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTreatment(null)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeTreatment === null
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-secondary-container/50 text-on-secondary-container"
              }`}
            >
              All
            </button>
            {treatments.map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => setActiveTreatment(t.slug)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeTreatment === t.slug
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-secondary-container/50 text-on-secondary-container"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mb-6 text-sm text-on-surface-variant">
        Showing {filtered.length} of {listings.length} therapists
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <TherapistCard key={l.slug} listing={l} />
          ))}
        </div>
      ) : (
        <p className="text-on-surface-variant">No therapists match your filters.</p>
      )}
    </div>
  );
}
