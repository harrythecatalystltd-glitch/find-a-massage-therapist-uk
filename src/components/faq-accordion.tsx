"use client";

import { useState } from "react";

type Faq = { question: string; answer: string };

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest spa-shadow"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-xl font-semibold text-on-surface">
                {item.question}
              </span>
              <span
                className={`material-symbols-outlined flex-shrink-0 text-primary transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                expand_more
              </span>
            </button>
            {isOpen && (
              <p className="px-6 pb-6 text-on-surface-variant">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
