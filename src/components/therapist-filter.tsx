"use client";

import { useMemo, useState } from "react";
import { TherapistCard } from "@/components/therapist-card";
import type { ListingCardData } from "@/lib/queries";

type TreatmentMap = Record<string, string[]>; // slug -> treatment names

export function TherapistFilter({
  listings,
  treatments,
  treatmentsByListing,
  initialSearch = "",
}: {
  listings: ListingCardData[];
  treatments: { name: string; slug: string }[];
  treatmentsByListing: TreatmentMap;
  initialSearch?: string;
}) {
  const [activeTreatment, setActiveTreatment] = useState<string | null>(null);
  const [town, setTown] = useState("");
  const [search, setSearch] = useState(initialSearch);

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
      <div className="filter-bar">
        <input
          type="text"
          className="filter-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search therapists"
          aria-label="Search therapists"
        />
        <input
          type="text"
          className="filter-input"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          placeholder="Town or postcode"
          aria-label="Filter by town"
        />
      </div>

      {treatments.length > 0 && (
        <div className="filter-chips">
          <button
            type="button"
            onClick={() => setActiveTreatment(null)}
            className={activeTreatment === null ? "filter-chip is-active" : "filter-chip"}
          >
            All
          </button>
          {treatments.map((t) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => setActiveTreatment(t.slug)}
              className={
                activeTreatment === t.slug ? "filter-chip is-active" : "filter-chip"
              }
            >
              {t.name}
            </button>
          ))}
        </div>
      )}

      <p className="filter-count">
        Showing {filtered.length} of {listings.length} therapists
      </p>

      {filtered.length > 0 ? (
        <div className="therapist-grid">
          {filtered.map((l) => (
            <TherapistCard key={l.slug} listing={l} />
          ))}
        </div>
      ) : (
        <p className="lead">No therapists match your filters.</p>
      )}
    </div>
  );
}
