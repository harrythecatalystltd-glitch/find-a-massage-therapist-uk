// Populate locations.intro_copy / seo_body / faqs with locally-relevant SEO content,
// weaving in real neighbourhoods + a landmark per town for genuine local relevance.
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
type Place = { county: string; areas: [string, string, string]; landmark: string };

// Curated local detail per town (keyed by slug).
const PLACES: Record<string, Place> = {
  lancaster: { county: "Lancashire", areas: ["the city centre", "Bowerham", "Galgate"], landmark: "Williamson Park" },
  bury: { county: "Greater Manchester", areas: ["Ramsbottom", "Prestwich", "Whitefield"], landmark: "Bury Market" },
  rotherham: { county: "South Yorkshire", areas: ["Wickersley", "Maltby", "Wath-upon-Dearne"], landmark: "Clifton Park" },
  lincoln: { county: "Lincolnshire", areas: ["the Bailgate area", "Uphill", "North Hykeham"], landmark: "Lincoln Cathedral" },
  "south-cheshire": { county: "Cheshire", areas: ["Crewe", "Nantwich", "Sandbach"], landmark: "Nantwich's historic town centre" },
  bristol: { county: "the South West", areas: ["Clifton", "Bedminster", "the Harbourside"], landmark: "the Clifton Suspension Bridge" },
  birmingham: { county: "the West Midlands", areas: ["Moseley", "the Jewellery Quarter", "Edgbaston"], landmark: "the Bullring" },
  cardiff: { county: "South Wales", areas: ["Cardiff Bay", "Pontcanna", "Roath"], landmark: "Cardiff Castle" },
  edinburgh: { county: "Scotland", areas: ["Leith", "Stockbridge", "Morningside"], landmark: "Arthur's Seat" },
  uddington: { county: "South Lanarkshire", areas: ["Bothwell", "Tannochside", "Birkenshaw"], landmark: "Bothwell Castle" },
  glasgow: { county: "Scotland", areas: ["the West End", "Shawlands", "Clydebank"], landmark: "Kelvingrove Park" },
  bath: { county: "Somerset", areas: ["the city centre", "Widcombe", "Oldfield Park"], landmark: "the Royal Crescent" },
  caterham: { county: "Surrey", areas: ["Caterham on the Hill", "Caterham Valley", "Whyteleafe"], landmark: "the North Downs" },
  leicester: { county: "the East Midlands", areas: ["Clarendon Park", "Stoneygate", "Oadby"], landmark: "the King Richard III centre" },
  sheffield: { county: "South Yorkshire", areas: ["Ecclesall Road", "Kelham Island", "Hillsborough"], landmark: "the edge of the Peak District" },
  flintshire: { county: "North Wales", areas: ["Mold", "Buckley", "Connah's Quay"], landmark: "the Clwydian Range" },
  sutton: { county: "south London", areas: ["Cheam", "Carshalton", "Wallington"], landmark: "Nonsuch Park" },
  bolton: { county: "Greater Manchester", areas: ["Horwich", "Westhoughton", "Bromley Cross"], landmark: "the West Pennine Moors" },
  wigan: { county: "Greater Manchester", areas: ["Standish", "Ashton-in-Makerfield", "Orrell"], landmark: "Haigh Hall" },
  newcastle: { county: "Tyne and Wear", areas: ["Jesmond", "Gosforth", "the Quayside"], landmark: "the Tyne Bridge" },
  liverpool: { county: "Merseyside", areas: ["the Baltic Triangle", "Allerton", "Woolton"], landmark: "the Royal Albert Dock" },
  wirral: { county: "Merseyside", areas: ["West Kirby", "Heswall", "Birkenhead"], landmark: "the Wirral peninsula" },
  penrith: { county: "Cumbria", areas: ["the town centre", "Eamont Bridge", "the Ullswater area"], landmark: "the gateway to the Lake District" },
  manchester: { county: "Greater Manchester", areas: ["the Northern Quarter", "Didsbury", "Chorlton"], landmark: "Deansgate" },
};

const seed = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);
const pick = <T,>(arr: T[], s: string) => arr[seed(s) % arr.length];

function introCopy(town: string, p?: Place): string {
  if (!p) {
    return `Looking for a massage therapist in ${town}? Browse qualified practitioners across ${town} and the surrounding area, covering sports, deep tissue, relaxation and more.`;
  }
  return `Looking for a massage therapist in ${town}? Browse qualified practitioners across ${town} and ${p.county} — from ${p.areas[0]} to ${p.areas[2]} — covering sports, deep tissue, relaxation, pregnancy and remedial massage.`;
}

function seoBody(town: string, p: Place | undefined, nearby: string): string {
  const [a0, a1, a2] = p?.areas ?? ["the town centre", "the surrounding suburbs", "nearby villages"];
  const county = p?.county ?? "the surrounding area";
  const landmark = p?.landmark ?? "the town centre";

  const p1 = pick(
    [
      `${town} sits in ${county}, and demand for good massage therapy here runs from ${a0} and ${a1} through to ${a2}. Whether you're recovering from training, easing desk-bound neck and shoulder tension, or simply winding down after a walk near ${landmark}, there are practitioners across the area to match.`,
      `Across ${town} and the wider ${county} area — ${a0}, ${a1} and ${a2} included — massage therapists offer everything from firm clinical work to gentle, relaxing treatments. Many are within easy reach of ${landmark} and the main routes through town.`,
    ],
    town,
  );
  const p2 = `Therapists listed in ${town} cover sports and deep tissue massage, Swedish and remedial work, plus treatments like pregnancy massage, hot stone and lymphatic drainage. Some work from dedicated clinics around ${a0}, while others offer mobile appointments to homes and workplaces across ${town}.`;
  const p3 = nearby
    ? `Can't find the right fit in ${town} itself? Therapists in nearby ${nearby} often cover the area too. Every listing links straight to the therapist so you can check their treatments, qualifications and how to book.`
    : `Every listing links straight to the therapist so you can check their treatments, qualifications and how to book.`;
  return [p1, p2, p3].join("\n\n");
}

function faqs(town: string, p?: Place) {
  const area = p?.areas[0] ?? `central ${town}`;
  return [
    {
      question: `How much does a massage cost in ${town}?`,
      answer: `Prices in ${town} typically range from around £35–£70 for a 60-minute session, depending on the therapist's experience, the treatment type and whether it's a clinic or mobile visit. Check each listing for the practitioner's own pricing.`,
    },
    {
      question: `Can I book a mobile massage therapist in ${town}?`,
      answer: `Yes — several therapists listed in ${town} offer mobile appointments, travelling to your home, hotel or workplace around ${area} and beyond. Look for "mobile" in a therapist's description or contact them directly to confirm they cover your postcode.`,
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

  const points = locs
    .filter((l) => l.lat != null && l.lng != null)
    .map((l) => ({ name: l.town, slug: l.slug, lat: l.lat!, lng: l.lng! }));

  for (const l of locs) {
    const place = PLACES[l.slug];
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
        intro_copy: introCopy(l.town, place),
        seo_body: seoBody(l.town, place, nearby),
        faqs: faqs(l.town, place),
      })
      .eq("id", l.id);
    if (upErr) {
      console.error(`  ✗ ${l.town}: ${upErr.message}`);
      continue;
    }
    console.log(`  ✓ ${l.town}${place ? "" : " (no curated detail)"}`);
  }
  console.log(`\nUpdated ${locs.length} locations.`);
}

main();
