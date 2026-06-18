// One-off import of existing listings from scripts/data/listings.json into Supabase.
// Run: npx --yes tsx scripts/import-listings.ts
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

type Raw = Record<string, string>;
type ListingInsert = Database["public"]["Tables"]["listings"]["Insert"];

const EXCLUDE = ["the catalyst method"];
// Businesses that were featured on the live homepage (matched by keyword).
const FEATURED = ["aspire", "flexion", "oliwia", "tn massage", "camilleri", "rejuvenate", "feel better", "e8"];

const clean = (s?: string) => (s ?? "").trim() || null;

function cleanUrl(u?: string): string | null {
  const s = clean(u);
  if (!s) return null;
  return s.replace(/^Https:/, "https:").replace(/www\.\./g, "www.");
}

function instagram(v?: string): string | null {
  const s = clean(v);
  if (!s || s.toLowerCase().includes("facebook")) return null;
  return s;
}
function facebook(v?: string): string | null {
  const s = clean(v);
  return s && s.toLowerCase().includes("facebook") ? s : null;
}

async function rehostLogo(fileUrl: string | undefined, slug: string): Promise<string | null> {
  const src = clean(fileUrl);
  if (!src) return null;
  try {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = (src.split("?")[0].split(".").pop() || "png").slice(0, 5);
    const path = `${slug}.${ext}`;
    const { error } = await supabase.storage
      .from("listing-logos")
      .upload(path, buf, { contentType: res.headers.get("content-type") || undefined, upsert: true });
    if (error) throw error;
    return supabase.storage.from("listing-logos").getPublicUrl(path).data.publicUrl;
  } catch (e) {
    console.warn(`  logo failed (${slug}): ${(e as Error).message}`);
    return null;
  }
}

async function main() {
  const rows: Raw[] = JSON.parse(readFileSync("scripts/data/listings.json", "utf8"));
  const taken = new Set<string>();
  let imported = 0;

  for (const r of rows) {
    const name = clean(r.FNAME);
    if (!name || EXCLUDE.includes(name.toLowerCase())) continue;

    const slug = uniqueSlug(name, taken);
    taken.add(slug);
    const logo_url = await rehostLogo(r.FILE, slug);
    const lname = name.toLowerCase();

    const row: ListingInsert = {
      slug,
      business_name: name,
      summary: clean(r.OTHER),
      website_url: cleanUrl(r.website),
      logo_url,
      town: clean(r.Location) ?? clean(r.OTHER3),
      email: clean(r.email),
      instagram: instagram(r.OTHER2),
      facebook: facebook(r.OTHER2),
      source: clean(r.OTHER4),
      is_featured: FEATURED.some((f) => lname.includes(f)),
      status: "approved",
      email_verified: true,
      verified_at: new Date().toISOString(),
      approved_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("listings").upsert(row, { onConflict: "slug" });
    if (error) {
      console.error(`  insert failed (${name}): ${error.message}`);
      continue;
    }
    imported++;
    console.log(`  ✓ ${name}${row.is_featured ? " [featured]" : ""}${logo_url ? "" : " (no logo)"}`);
  }

  console.log(`\nImported ${imported} listings.`);
}

main();
