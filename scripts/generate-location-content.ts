// Populate locations.intro_copy / seo_body / faqs with locally-relevant SEO content.
// Run: npx --yes tsx scripts/generate-location-content.ts
import { loadEnvFile } from "node:process";
import { createClient } from "@supabase/supabase-js";
import { nearestTowns, type GeoPoint } from "../src/lib/geo";
import type { Database } from "../src/lib/database.types";

loadEnvFile(".env.local");

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

type Loc = { id: string; slug: string; town: string; lat: number | null; lng: number | null };

// Deterministic pick so each town keeps stable copy without being identical.
const seed = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);
const pick = <T,>(arr: T[], s: string) => arr[seed(s) % arr.length];

function introCopy(town: string): string {
  return pick(
    [
      `Looking for a massage therapist in ${town}? Browse professional practitioners covering ${town} and the surrounding area — from sports and deep tissue work to relaxation, pregnancy and remedial massage.`,
      `Find a massage therapist in ${town}. This page lists independent massage and bodywork practitioners working in ${town} and nearby, with a range of treatments and styles to suit what your body needs.`,
    ],
    town,
  );
}

function seoBody(town: string, nearby: string): string {
  const p1 = pick(
    [
      `Whether you're carrying tension in your neck and shoulders from work, managing training load as an athlete, or simply in need of an hour to switch off, ${town} has massage therapists to match. The practitioners listed here work across clinics, gyms and mobile home visits around ${town}.`,
      `${town} is home to skilled massage therapists offering everything from firm, clinical deep-tissue work to gentle, relaxing full-body treatments. Many also travel to clients across ${town} and the nearby area for home and workplace appointments.`,
    ],
    town,
  );
  const p2 = `Popular treatments booked in ${town} include sports massage, deep tissue, Swedish and remedial massage, with some therapists also offering pregnancy massage, hot stone and lymphatic drainage. Use the treatment links above to find a practitioner who specialises in what you're looking for.`;
  const p3 = nearby
    ? `Can't find the right fit in ${town}? Therapists in nearby ${nearby} may also cover your area. Every listing links straight through to the therapist so you can check their services and get in touch directly.`
    : `Every listing links straight through to the therapist so you can check their services and get in touch directly.`;
  return [p1, p2, p3].join("\n\n");
}

function faqs(town: string) {
  return [
    {
      question: `How much does a massage cost in ${town}?`,
      answer: `Prices in ${town} typically range from around £35–£70 for a 60-minute session, depending on the therapist's experience, the treatment type and whether it's a clinic or mobile visit. Check each listing for the practitioner's own pricing.`,
    },
    {
      question: `Can I book a mobile massage therapist in ${town}?`,
      answer: `Yes — several therapists listed in ${town} offer mobile appointments, travelling to your home, hotel or workplace. Look for "mobile" in a therapist's description or contact them directly to confirm they cover your postcode.`,
    },
    {
      question: `What types of massage are available in ${town}?`,
      answer: `Therapists in ${town} offer a broad mix, including sports massage, deep tissue, Swedish (relaxation), remedial, pregnancy, hot stone and lymphatic drainage. The right choice depends on whether you want pain relief, recovery or relaxation.`,
    },
    {
      question: `How do I choose a massage therapist in ${town}?`,
      answer: `Start with the treatment you need, then look at each therapist's specialisms and how to reach them. It's worth messaging a couple to ask about their experience with your specific issue before booking.`,
    },
  ];
}

async function main() {
  const { data, error } = await supabase
    .from("locations")
    .select("id, slug, town, lat, lng");
  if (error) throw error;
  const locs = data as Loc[];

  const points: (GeoPoint & { slug: string })[] = locs
    .filter((l) => l.lat != null && l.lng != null)
    .map((l) => ({ name: l.town, slug: l.slug, lat: l.lat!, lng: l.lng! }));

  for (const l of locs) {
    let nearby = "";
    if (l.lat != null && l.lng != null) {
      const origin: GeoPoint = { name: l.town, lat: l.lat, lng: l.lng };
      nearby = nearestTowns(origin, points.filter((p) => p.slug !== l.slug), 3)
        .map((p) => p.name)
        .join(", ");
    }
    const { error: upErr } = await supabase
      .from("locations")
      .update({
        intro_copy: introCopy(l.town),
        seo_body: seoBody(l.town, nearby),
        faqs: faqs(l.town),
      })
      .eq("id", l.id);
    if (upErr) {
      console.error(`  ✗ ${l.town}: ${upErr.message}`);
      continue;
    }
    console.log(`  ✓ ${l.town}`);
  }
  console.log(`\nUpdated ${locs.length} locations.`);
}

main();
