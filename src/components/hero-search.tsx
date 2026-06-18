"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSearch() {
  const router = useRouter();
  const [treatment, setTreatment] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = [treatment.trim(), location.trim()].filter(Boolean).join(" ");
    router.push(q ? `/find-a-therapist?q=${encodeURIComponent(q)}` : "/find-a-therapist");
  }

  return (
    <form
      className="search-card"
      onSubmit={handleSubmit}
      aria-label="Search for a massage therapist"
    >
      <div className="search-field">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          placeholder="Deep tissue, sports, pregnancy…"
          aria-label="Treatment"
          autoComplete="off"
        />
      </div>
      <div className="search-field">
        <svg
          width="20"
          height="20"
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
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Town or postcode"
          aria-label="Location"
          autoComplete="off"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Search therapists
      </button>
    </form>
  );
}
