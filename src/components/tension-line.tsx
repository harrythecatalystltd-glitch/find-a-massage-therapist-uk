"use client";

import { useEffect, useRef } from "react";

/**
 * Hero signature animation: a single rope drawn taut with a knot, that
 * works itself loose into a calm wave. Ported from design-reference/main.js.
 * Reduced-motion aware; replays when the hero re-enters the viewport.
 */
export function TensionLine() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const hero = (heroRef.current =
      path?.closest(".hero") as HTMLElement | null) ?? null;
    if (!path || !hero) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document.documentElement.classList.add(
      prefersReduced ? "reduced-motion" : "motion-ready",
    );

    const N = 26;
    const X0 = -60;
    const X1 = 1660;
    const xs: number[] = [];
    for (let i = 0; i < N; i++) xs.push(X0 + ((X1 - X0) * i) / (N - 1));

    const smoothstep = (u: number) => {
      u = Math.max(0, Math.min(1, u));
      return u * u * (3 - 2 * u);
    };

    function releasePoints(phase: number): [number, number][] {
      const pts: [number, number][] = [];
      for (let i = 0; i < N; i++) {
        const x = xs[i];
        const rise = smoothstep((x - 820) / 680);
        const base = 525 - 285 * rise;
        const amp = 18 + 42 * rise;
        pts.push([x, base + amp * Math.sin(i * 0.62 + phase)]);
      }
      return pts;
    }

    function tensePoints(): [number, number][] {
      const box = hero!.getBoundingClientRect();
      let f = (1600 * box.height) / (560 * Math.max(1, box.width));
      f = Math.max(1, Math.min(7, f));
      const narrow = f > 3;
      const cx = narrow ? 560 : 1140;
      const cy = narrow ? 515 : 345;
      const rs = narrow ? 0.55 : 1;

      const pts: [number, number][] = [];
      for (let i = 0; i < N; i++) {
        const x = xs[i];
        pts.push([x, 575 - (325 * (x + 60)) / 1720 + 5 * Math.sin(i * 2.3)]);
      }
      const step = (X1 - X0) / (N - 1);
      const ci = Math.round((cx - X0) / step);
      for (let k = 0; k < 8; k++) {
        const a = -0.8 + k * 2.45;
        const r = (46 + 26 * Math.sin(k * 1.9 + 1)) * rs;
        pts[ci - 4 + k] = [cx + r * Math.cos(a) * f + k * 4, cy + r * Math.sin(a) * 0.85];
      }
      return pts;
    }

    const lerpPoints = (
      a: [number, number][],
      b: [number, number][],
      t: number,
    ): [number, number][] =>
      a.map((p, i) => [p[0] + (b[i][0] - p[0]) * t, p[1] + (b[i][1] - p[1]) * t]);

    function toPath(pts: [number, number][]) {
      let d = "M " + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(pts.length - 1, i + 2)];
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d +=
          " C " + c1x.toFixed(1) + " " + c1y.toFixed(1) +
          ", " + c2x.toFixed(1) + " " + c2y.toFixed(1) +
          ", " + p2[0].toFixed(1) + " " + p2[1].toFixed(1);
      }
      return d;
    }

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    if (prefersReduced) {
      path.setAttribute("d", toPath(releasePoints(0)));
      return;
    }

    const DRAW_MS = 1600;
    const HOLD_MS = 400;
    const MORPH_MS = 3000;
    const DRIFT_SPEED = 0.00045;

    let rafId: number | null = null;
    let startTime: number | null = null;
    let knot: [number, number][] = [];

    function frame(now: number) {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;

      if (elapsed < DRAW_MS) {
        const L = path!.getTotalLength();
        path!.style.strokeDasharray = String(L);
        path!.style.strokeDashoffset = String(L * (1 - easeInOutCubic(elapsed / DRAW_MS)));
      } else if (elapsed < DRAW_MS + HOLD_MS) {
        path!.style.strokeDasharray = "none";
        path!.style.strokeDashoffset = "0";
      } else {
        const m = Math.min(1, (elapsed - DRAW_MS - HOLD_MS) / MORPH_MS);
        const t = easeInOutCubic(m);
        const phase = elapsed * DRIFT_SPEED * t;
        path!.setAttribute("d", toPath(lerpPoints(knot, releasePoints(phase), t)));
      }
      rafId = requestAnimationFrame(frame);
    }

    function play() {
      if (rafId) cancelAnimationFrame(rafId);
      startTime = null;
      knot = tensePoints();
      path!.setAttribute("d", toPath(knot));
      rafId = requestAnimationFrame(frame);
    }

    play();

    let left = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          left = true;
        } else if (left) {
          left = false;
          play();
        }
      });
    });
    io.observe(hero);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, []);

  return (
    <svg
      className="tension-svg"
      viewBox="0 0 1600 560"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="tensionGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#34005f" />
          <stop offset="0.55" stopColor="#7549a3" />
          <stop offset="1" stopColor="#bfa6d9" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        id="tensionLine"
        fill="none"
        stroke="url(#tensionGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        d="M -60 525 C 300 545, 600 505, 900 430 C 1050 390, 1050 250, 1200 240 C 1330 232, 1450 260, 1660 235"
      />
    </svg>
  );
}
