import { describe, expect, it } from "vitest";
import { nearestTowns, type GeoPoint } from "@/lib/geo";

// Approximate UK city coordinates.
const manchester: GeoPoint = { name: "Manchester", lat: 53.4808, lng: -2.2426 };
const liverpool: GeoPoint = { name: "Liverpool", lat: 53.4084, lng: -2.9916 };
const leeds: GeoPoint = { name: "Leeds", lat: 53.8008, lng: -1.5491 };
const london: GeoPoint = { name: "London", lat: 51.5072, lng: -0.1276 };

const all = [manchester, liverpool, leeds, london];

describe("nearestTowns", () => {
  it("returns the n closest OTHER towns sorted by distance", () => {
    const result = nearestTowns(manchester, all, 2);
    expect(result.map((t) => t.name)).toEqual(["Liverpool", "Leeds"]);
  });

  it("excludes the origin itself", () => {
    const result = nearestTowns(manchester, all, 4);
    expect(result.map((t) => t.name)).not.toContain("Manchester");
  });

  it("orders all others by ascending distance", () => {
    const result = nearestTowns(london, all, 3);
    // London's nearest of the northern trio is Manchester, then Leeds, then Liverpool.
    expect(result.map((t) => t.name)).toEqual(["Manchester", "Leeds", "Liverpool"]);
  });
});
