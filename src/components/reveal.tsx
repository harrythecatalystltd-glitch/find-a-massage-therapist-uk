"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal + stagger, ported from design-reference/main.js.
 * Mount once on the home page; it observes every `.reveal` element and
 * applies per-item stagger delays to the known grid containers.
 */
export function Reveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function setStagger(
      container: Element | null,
      selector: string,
      step: number,
      maxDelay: number,
    ) {
      if (!container) return;
      container.classList.add("reveal-group");
      container.querySelectorAll<HTMLElement>(selector).forEach((item, index) => {
        item.style.setProperty(
          "--item-delay",
          Math.min(index * step, maxDelay) + "ms",
        );
      });
    }

    setStagger(document.querySelector(".treatment-grid"), ".treatment-card", 65, 420);
    setStagger(document.querySelector(".steps-grid"), ".step", 90, 270);
    setStagger(document.querySelector(".location-grid"), ".location-tile", 85, 340);
    setStagger(document.querySelector(".town-links"), "a", 45, 360);
    setStagger(document.querySelector(".faq"), "details", 70, 280);

    document
      .querySelectorAll<HTMLElement>(".therapist-grid .reveal")
      .forEach((card, index) => {
        card.style.setProperty("--reveal-delay", Math.min(index * 95, 260) + "ms");
      });

    if (prefersReduced || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
