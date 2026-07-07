// Backfill logos + treatment tags for the listings imported from the old
// Unicorn CMS (no FILE/CDN url was available for those, unlike the CRM import).
// Run: npx --yes tsx scripts/enrich-new-listings-2026-07-06.ts
import { loadEnvFile } from "node:process";
import { createClient } from "@supabase/supabase-js";

loadEnvFile(".env.local");
import type { Database } from "../src/lib/database.types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");

const supabase = createClient<Database>(url, key, { auth: { persistSession: false } });

const SLUGS = [
  "balance-with-reflexology", "birmingham-sports-massage", "bloom-wellbeing", "embodied-therapies",
  "energize-sports-injury-clinic", "essential-thyme", "jq-sports-massage", "live-well-health",
  "liverpool-massage", "namaste-wellbeing", "on-point", "physio-art", "riversdale-massage",
  "roks-therapy", "sk-holistic-health", "the-therapy-room", "walee-sports-massage", "wellness-centre",
];

// Treatment slugs mentioned explicitly in each business's own summary text.
// Left blank where the summary doesn't name a matching category (no guessing).
const TREATMENTS: Record<string, string[]> = {
  "birmingham-sports-massage": ["sports-massage", "deep-tissue", "physiotherapy"],
  "energize-sports-injury-clinic": ["sports-massage", "physiotherapy"],
  "essential-thyme": ["remedial-massage"],
  "jq-sports-massage": ["sports-massage", "remedial-massage"],
  "live-well-health": ["sports-massage"],
  "liverpool-massage": ["swedish-massage", "deep-tissue"],
  "namaste-wellbeing": ["sports-massage", "lymphatic-drainage"],
  "on-point": ["sports-massage"],
  "physio-art": ["physiotherapy", "sports-massage"],
  "riversdale-massage": ["deep-tissue"],
  "roks-therapy": ["sports-massage", "deep-tissue", "swedish-massage", "pregnancy-massage"],
  "the-therapy-room": ["remedial-massage"],
  "walee-sports-massage": ["sports-massage"],
  "wellness-centre": ["swedish-massage", "deep-tissue"],
};

async function findLogoUrl(pageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(pageUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) return null;
    const html = await res.text();
    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<link[^>]+rel=["']apple-touch-icon["'][^>]+href=["']([^"']+)["']/i,
      /<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i,
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m) return new URL(m[1], pageUrl).toString();
    }
    return null;
  } catch (e) {
    console.warn(`  logo lookup failed for ${pageUrl}: ${(e as Error).message}`);
    return null;
  }
}

async function rehostLogo(imageUrl: string, slug: string): Promise<string | null> {
  try {
    const res = await fetch(imageUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = (imageUrl.split("?")[0].split(".").pop() || "png").slice(0, 5);
    const path = `${slug}.${ext}`;
    const { error } = await supabase.storage
      .from("listing-logos")
      .upload(path, buf, { contentType: res.headers.get("content-type") || undefined, upsert: true });
    if (error) throw error;
    return supabase.storage.from("listing-logos").getPublicUrl(path).data.publicUrl;
  } catch (e) {
    console.warn(`  logo upload failed (${slug}): ${(e as Error).message}`);
    return null;
  }
}

async function main() {
  const { data: treatmentTypes } = await supabase.from("treatment_types").select("id, slug");
  const treatmentIdBySlug = new Map((treatmentTypes ?? []).map((t) => [t.slug, t.id as string]));

  const { data: listings } = await supabase
    .from("listings")
    .select("id, slug, business_name, website_url, summary")
    .in("slug", SLUGS);

  for (const listing of listings ?? []) {
    // Logo
    if (listing.website_url) {
      const imageUrl = await findLogoUrl(listing.website_url);
      if (imageUrl) {
        const logo_url = await rehostLogo(imageUrl, listing.slug!);
        if (logo_url) {
          await supabase.from("listings").update({ logo_url }).eq("id", listing.id);
          console.log(`  ✓ logo: ${listing.business_name}`);
        }
      } else {
        console.log(`  ✗ no logo found: ${listing.business_name}`);
      }
    }

    // Missing summary
    if (!listing.summary && listing.slug === "balance-with-reflexology") {
      await supabase
        .from("listings")
        .update({ summary: "Reflexology therapist based in Caterham, offering treatments to ease tension and support wellbeing." })
        .eq("id", listing.id);
      console.log(`  ✓ summary: ${listing.business_name}`);
    }

    // Treatments
    const slugs = TREATMENTS[listing.slug!];
    if (slugs?.length) {
      const rows = slugs
        .map((s) => treatmentIdBySlug.get(s))
        .filter((id): id is string => !!id)
        .map((treatment_type_id) => ({ listing_id: listing.id, treatment_type_id }));
      if (rows.length) {
        const { error } = await supabase.from("listing_treatment_types").upsert(rows, {
          onConflict: "listing_id,treatment_type_id",
          ignoreDuplicates: true,
        });
        if (error) console.error(`  treatments failed (${listing.business_name}): ${error.message}`);
        else console.log(`  ✓ treatments: ${listing.business_name} → ${slugs.join(", ")}`);
      }
    }
  }
}

main();
