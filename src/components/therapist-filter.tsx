"use client";

import { useMemo, useState } from "react";
import { TherapistCard } from "@/components/therapist-card";
import type { ListingCardData } from "@/lib/queries";

/**
 * Shared client filter for every listing grid (browse, location and treatment
 * pages). Treatments are read from each listing's own `treatments` array, so no
 * separate lookup map is needed. The town field and treatment chips can each be
 * hidden when the page already fixes that dimension:
 *   - browse:    both shown
 *   - location:  town fixed (hide town input), filter by treatment in place
 *   - treatment: treatment fixed (hide chips), filter by location
 */
export function TherapistFilter({
  listings,
  treatments = [],
  initialSearch = "",
  initialTown = "",
  showTownInput = true,
  showTreatmentChips = true,
}: {
  listings: ListingCardData[];
  treatments?: { name: string; slug: string }[];
  initialSearch?: string;
  initialTown?: string;
  showTownInput?: boolean;
  showTreatmentChips?: boolean;
}) {
  const [activeTreatment, setActiveTreatment] = useState<string | null>(null);
  const [town, setTown] = useState(initialTown);
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
      if (activeTreatment && !(l.treatments ?? []).some((tr) => tr.slug === activeTreatment))
        return false;
      return true;
    });
  }, [listings, search, town, activeTreatment]);

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
        {showTownInput && (
          <input
            type="text"
            className="filter-input"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            placeholder="Town or postcode"
            aria-label="Filter by town"
          />
        )}
      </div>

      {showTreatmentChips && treatments.length > 0 && (
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
