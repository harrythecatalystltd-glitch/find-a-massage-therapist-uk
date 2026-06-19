"use client";

import { useEffect, useRef } from "react";

type Faq = { question: string; answer: string };

export function FaqAccordion({
  items,
  reveal = false,
}: {
  items: Faq[];
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Close other panels when one opens (matches the design-reference behaviour).
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const all = Array.from(root.querySelectorAll<HTMLDetailsElement>("details"));
    const handlers = all.map((details) => {
      const onToggle = () => {
        if (details.open) {
          all.forEach((other) => {
            if (other !== details) other.removeAttribute("open");
          });
        }
      };
      details.addEventListener("toggle", onToggle);
      return { details, onToggle };
    });
    return () =>
      handlers.forEach(({ details, onToggle }) =>
        details.removeEventListener("toggle", onToggle),
      );
  }, []);

  return (
    <div className={reveal ? "faq reveal" : "faq"} ref={ref}>
      {items.map((item, i) => (
        <details key={item.question} open={i === 0}>
          <summary>
            {item.question}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="faq-answer">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
