// Generic importer for research-outreach batches — replaces the one-off
// import-new-listings-*/enrich-new-listings-* scripts with a reusable version.
// Run: npx --yes tsx scripts/import-researched-listings.ts scripts/data/research-batch-2026-07-14.json [--dry-run]
import { readFileSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { createClient } from "@supabase/supabase-js";

loadEnvFile(".env.local");
import { uniqueSlug } from "../src/lib/slug";
import type { Database } from "../src/lib/database.types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");

const supabase = createClient<Database>(url, key, { auth: { persistSession: false } });

type ListingInsert = Database["public"]["Tables"]["listings"]["Insert"];

type Candidate = {
  business_name: string;
  website_url: string;
  email: string;
  town: string;
  listing_type: "clinic" | "mobile";
  address?: string;
  service_area?: string;
  summary: string;
  qualifications: string;
  insured: true; // research criteria: only include candidates whose site states this
  insurance_provider: string;
  phone?: string;
  treatments: string[]; // treatment_types.slug values only
};

const domain = (u: string) => u.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "").split("/")[0];

// A bare "Mozilla/5.0" UA gets 403'd by Cloudflare/WAF bot protection on a fair few
// small business sites — a fuller, realistic browser header set gets through.
const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-GB,en;q=0.9",
};

async function findLogoUrl(pageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(pageUrl, { headers: BROWSER_HEADERS });
    if (!res.ok) return null;
    const html = await res.text();
    // Resolve relative logo/icon URLs against <base href> when the page sets one —
    // otherwise `new URL(relative, pageUrl)` silently resolves against the wrong path.
    const baseMatch = html.match(/<base[^>]+href=["']([^"']+)["']/i);
    const resolveBase = baseMatch ? new URL(baseMatch[1], pageUrl).toString() : pageUrl;
    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<link[^>]+rel=["']apple-touch-icon["'][^>]+href=["']([^"']+)["']/i,
      /<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i,
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m) return new URL(m[1], resolveBase).toString();
    }

    // Fallback for sites with no og:image/icon meta at all, just a plain <img> whose
    // filename says what it is (e.g. src="./siteimages/logo.png") — the gap that missed
    // Sarah Dawn Massage Therapy's listing on the first London batch.
    const imgMatch = html.match(/<img[^>]+src=["']([^"']*logo[^"']*)["']/i);
    if (imgMatch) return new URL(imgMatch[1], resolveBase).toString();

    return null;
  } catch (e) {
    console.warn(`  logo lookup failed for ${pageUrl}: ${(e as Error).message}`);
    return null;
  }
}

async function rehostLogo(imageUrl: string, slug: string): Promise<string | null> {
  try {
    const res = await fetch(imageUrl, { headers: BROWSER_HEADERS });
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
  const [, , jsonPath, flag] = process.argv;
  const dryRun = flag === "--dry-run";
  if (!jsonPath) throw new Error("Usage: tsx scripts/import-researched-listings.ts <path.json> [--dry-run]");

  const candidates: Candidate[] = JSON.parse(readFileSync(jsonPath, "utf8"));

  const { data: existing } = await supabase
    .from("listings")
    .select("slug, business_name, town, website_url");
  const takenSlugs = new Set((existing ?? []).map((r) => r.slug).filter((s): s is string => !!s));
  const takenDomains = new Set((existing ?? []).map((r) => r.website_url).filter((u): u is string => !!u).map(domain));
  const takenNameTown = new Set(
    (existing ?? []).map((r) => `${(r.business_name ?? "").toLowerCase()}|${(r.town ?? "").toLowerCase()}`),
  );

  const { data: treatmentTypes } = await supabase.from("treatment_types").select("id, slug");
  const treatmentIdBySlug = new Map((treatmentTypes ?? []).map((t) => [t.slug, t.id as string]));

  let imported = 0;
  let skipped = 0;

  for (const c of candidates) {
    const nameTownKey = `${c.business_name.toLowerCase()}|${c.town.toLowerCase()}`;
    if (takenDomains.has(domain(c.website_url)) || takenNameTown.has(nameTownKey)) {
      console.log(`  ⏭ skip (duplicate): ${c.business_name}`);
      skipped++;
      continue;
    }

    const unknownTreatments = c.treatments.filter((s) => !treatmentIdBySlug.has(s));
    if (unknownTreatments.length) {
      console.warn(`  ✗ unknown treatment slug(s) for ${c.business_name}: ${unknownTreatments.join(", ")} — fix the vocabulary, skipping`);
      skipped++;
      continue;
    }

    const slug = uniqueSlug(c.business_name, takenSlugs);
    takenSlugs.add(slug);

    if (dryRun) {
      console.log(`  ✓ [dry-run] ${c.business_name} → /${slug} (${c.town}), treatments: ${c.treatments.join(", ") || "none"}`);
      imported++;
      continue;
    }

    const logoSourceUrl = await findLogoUrl(c.website_url);
    const logo_url = logoSourceUrl ? await rehostLogo(logoSourceUrl, slug) : null;

    const row: ListingInsert = {
      slug,
      business_name: c.business_name,
      website_url: c.website_url,
      email: c.email,
      town: c.town,
      listing_type: c.listing_type,
      address: c.address,
      service_area: c.service_area,
      summary: c.summary,
      qualifications: c.qualifications,
      insured: c.insured,
      insurance_provider: c.insurance_provider,
      phone: c.phone,
      logo_url,
      source: "research_outreach",
      status: "verified",
      email_verified: false,
      verified_at: new Date().toISOString(),
    };

    const { data: inserted, error } = await supabase.from("listings").insert(row).select("id").single();
    if (error || !inserted) {
      console.error(`  ✗ insert failed (${c.business_name}): ${error?.message}`);
      skipped++;
      continue;
    }

    if (c.treatments.length) {
      const rows = c.treatments.map((s) => ({ listing_id: inserted.id, treatment_type_id: treatmentIdBySlug.get(s)! }));
      const { error: treatmentError } = await supabase
        .from("listing_treatment_types")
        .upsert(rows, { onConflict: "listing_id,treatment_type_id", ignoreDuplicates: true });
      if (treatmentError) console.error(`  treatments failed (${c.business_name}): ${treatmentError.message}`);
    }

    console.log(`  ✓ ${c.business_name} → /${slug}${logo_url ? "" : " (no logo found)"}`);
    imported++;
  }

  console.log(`\n${dryRun ? "[dry-run] " : ""}Imported ${imported}, skipped ${skipped}.`);
}

main();
