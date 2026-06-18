import { describe, expect, it } from "vitest";
import { slugify, uniqueSlug } from "@/lib/slug";

describe("slugify", () => {
  it("lowercases, trims, and hyphenates", () => {
    expect(slugify("Feel Better Massage ")).toBe("feel-better-massage");
  });

  it("strips ampersands and punctuation", () => {
    expect(slugify("Flexion Sports Massage & Injury Rehabilitation Clinic ")).toBe(
      "flexion-sports-massage-injury-rehabilitation-clinic",
    );
  });
});

describe("uniqueSlug", () => {
  it("returns the base slug when unused", () => {
    expect(uniqueSlug("TN Massage", new Set())).toBe("tn-massage");
  });

  it("suffixes on collision", () => {
    expect(uniqueSlug("TN Massage", new Set(["tn-massage"]))).toBe("tn-massage-2");
    expect(uniqueSlug("TN Massage", new Set(["tn-massage", "tn-massage-2"]))).toBe(
      "tn-massage-3",
    );
  });
});
