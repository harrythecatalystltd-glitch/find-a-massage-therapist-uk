"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSearch() {
  const router = useRouter();
  const [term, setTerm] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = term.trim();
    router.push(q ? `/find-a-therapist?q=${encodeURIComponent(q)}` : "/find-a-therapist");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-2 spa-shadow sm:flex-row sm:items-center"
      aria-label="Search for a massage therapist"
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <span className="material-symbols-outlined text-outline" aria-hidden="true">
          search
        </span>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Deep tissue, sports, pregnancy, town…"
          aria-label="Search treatments, therapists or towns"
          className="w-full bg-transparent py-3 text-on-surface outline-none placeholder:text-outline"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary-container px-8 py-3 font-bold text-label-md text-on-primary-container transition-all hover:bg-primary hover:text-white active:scale-95"
      >
        Search therapists
      </button>
    </form>
  );
}
