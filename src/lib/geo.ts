export type GeoPoint = { name: string; lat: number; lng: number };

const EARTH_RADIUS_KM = 6371;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance in km between two points. */
export function haversine(a: GeoPoint, b: GeoPoint): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** The `n` closest OTHER towns to `origin`, sorted nearest-first. */
export function nearestTowns<T extends GeoPoint>(
  origin: GeoPoint,
  all: T[],
  n: number,
): T[] {
  return all
    .filter((t) => t.lat !== origin.lat || t.lng !== origin.lng)
    .map((t) => ({ t, d: haversine(origin, t) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n)
    .map(({ t }) => t);
}
