import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { manualPosts } from "@/lib/manual-posts";

/**
 * Machine-enforced half of docs/blog-standard.md. The Friday blog batch pushes
 * straight to master, so anything checkable here is checked here — a post that
 * misses the bar fails `npm test` and never reaches the push.
 */

const TREATMENT_SLUGS = [
  "sports-massage",
  "deep-tissue",
  "swedish-massage",
  "remedial-massage",
  "pregnancy-massage",
  "hot-stone-massage",
  "lymphatic-drainage",
  "osteopathy",
  "physiotherapy",
];

const STATIC_ROUTES = [
  "/",
  "/contact",
  "/faq",
  "/find-a-therapist",
  "/learn",
  "/list-your-practice",
  "/massage-tools",
  "/rooms",
  "/upgrade",
];

/** Phrases that make copy read as machine-written. See blog-standard.md. */
const BANNED = [
  "let's dive in",
  "let's explore",
  "let's break it down",
  "in conclusion",
  "at the end of the day",
  "the bottom line is",
  "it goes without saying",
  "needless to say",
  "in today's world",
  "in this article",
  "furthermore",
  "moreover",
  "it is worth noting",
  "that being said",
  "leverage",
  "utilise",
  "utilize",
  "delve",
  "embark on",
  "comprehensive",
  "crucial",
  "pivotal",
  "paramount",
  "unlock",
];

/**
 * The first seven posts predate the standard: they run ~700 words, state generous
 * reading times, and lean on em dashes. Everything published from this date is held
 * to the full bar. Rewriting the older seven to match is a separate job.
 */
const STANDARD_FROM = "2026-09-04";

const slugs = new Set(manualPosts.map((p) => p.slug));

function wordCount(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Internal hrefs a post links to, minus the trailing slash. */
function internalLinks(html: string) {
  return [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
}

describe("manual blog posts", () => {
  it("have unique, kebab-case slugs", () => {
    expect(new Set(manualPosts.map((p) => p.slug)).size).toBe(manualPosts.length);
    for (const p of manualPosts) expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  describe.each(manualPosts.map((p) => [p.slug, p] as const))("%s", (_slug, post) => {
    const legacy = post.publishedAt < STANDARD_FROM;

    it("has a title that fits a search result", () => {
      expect(post.title.length).toBeGreaterThanOrEqual(25);
      expect(post.title.length).toBeLessThanOrEqual(85);
    });

    it("has a meta description that will not be truncated", () => {
      expect(post.description.length).toBeGreaterThanOrEqual(110);
      expect(post.description.length).toBeLessThanOrEqual(165);
    });

    it("has a known category", () => {
      expect([
        "Pricing & Guides",
        "Treatment Guides",
        "Wellness Tips",
        "Getting Started",
        "For Therapists",
      ]).toContain(post.category);
    });

    it("has a real, non-future publish date", () => {
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.publishedAt <= new Date().toISOString().slice(0, 10)).toBe(true);
    });

    it("is long enough to be worth ranking", () => {
      expect(wordCount(post.html)).toBeGreaterThanOrEqual(legacy ? 600 : 1100);
    });

    it("states a reading time that matches the body", () => {
      const expected = Math.round(wordCount(post.html) / 200);
      if (legacy) return;
      expect(Math.abs(post.readingTime - expected)).toBeLessThanOrEqual(2);
    });

    it("has a header image that exists on disk", () => {
      expect(post.image).toBeTruthy();
      expect(post.image!.startsWith("/blog/")).toBe(true);
      expect(existsSync(`public${post.image}`)).toBe(true);
    });

    it("is structured with h2 sections and no competing h1", () => {
      expect(post.html).not.toContain("<h1");
      expect((post.html.match(/<h2>/g) ?? []).length).toBeGreaterThanOrEqual(4);
    });

    it("uses the site's prose styles, not inline ones", () => {
      expect(post.html).not.toMatch(/style="/);
    });

    it("links to at least four real internal pages", () => {
      const links = internalLinks(post.html);
      expect(links.length).toBeGreaterThanOrEqual(legacy ? 3 : 5);

      for (const href of links) {
        const path = href.replace(/\/$/, "") || "/";
        const known =
          STATIC_ROUTES.includes(path) ||
          TREATMENT_SLUGS.some((t) => path === `/massage/${t}`) ||
          (path.startsWith("/learn/") && slugs.has(path.slice("/learn/".length))) ||
          path.startsWith("/find-a-therapist/");
        expect(known, `${post.slug} links to unknown page ${href}`).toBe(true);
      }
    });

    it("opens external links safely and marks paid ones as sponsored", () => {
      for (const [tag, href] of [...post.html.matchAll(/<a ([^>]*href="(https?:[^"]+)"[^>]*)>/g)].map(
        (m) => [m[1], m[2]] as const,
      )) {
        expect(tag, `external link to ${href} is missing noopener`).toContain("noopener");
        if (/rehabmarket|partner/i.test(href)) expect(tag).toContain("sponsored");
      }
    });

    it("cross-links two or three sibling guides", () => {
      expect(post.related?.length ?? 0).toBeGreaterThanOrEqual(2);
      expect(post.related!.length).toBeLessThanOrEqual(3);
      for (const r of post.related!) {
        expect(r).not.toBe(post.slug);
        expect(slugs.has(r), `${post.slug} relates to missing post ${r}`).toBe(true);
      }
    });

    it("answers five or six questions in the FAQ", () => {
      expect(post.faqs?.length ?? 0).toBeGreaterThanOrEqual(5);
      expect(post.faqs!.length).toBeLessThanOrEqual(6);
      for (const faq of post.faqs!) {
        expect(faq.question.endsWith("?")).toBe(true);
        expect(faq.answer.length).toBeGreaterThanOrEqual(80);
      }
    });

    it("avoids the banned phrases", () => {
      const text = `${post.title} ${post.description} ${post.html}`.toLowerCase();
      for (const phrase of BANNED) {
        expect(text.includes(phrase), `${post.slug} uses "${phrase}"`).toBe(false);
      }
    });

    it("does not lean on em dashes", () => {
      if (legacy) return;
      const dashes = (post.html.match(/—/g) ?? []).length;
      expect(dashes).toBeLessThanOrEqual(Math.ceil(wordCount(post.html) / 500));
    });
  });
});
