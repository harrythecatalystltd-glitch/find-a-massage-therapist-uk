// One-off import of the 2 new listings added to the CRM spreadsheet since the last import.
// Run: npx --yes tsx scripts/import-new-listings-2026-07-06.ts
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

const rows: Raw[] = [
  {
    FNAME: "Regen Sports Therapy",
    email: "regensportstherapy@gmail.com",
    website:
      "https://www.regensportstherapy.co.uk/",
    FILE:
      "https://unicorn-client-cdn.b-cdn.net/file-type-image__7ac79339-c81f-4c44-ba7c-1fac5a5becdf__Regen%20logo%20charcoalbkg.png",
    OTHER:
      "Delivering bespoke elite-level recovery sessions directly to your doorstep in Washington, Chester-le-Street, Gateshead, Sunderland, Newcastle, and surrounding areas within a 7-mile radius of NE38. Bespoke soft-tissue treatments designed to accelerate your recovery, improve mobility, and get you back to peak physical condition.",
    OTHER2: "https://www.instagram.com/regensportstherapyuk/",
    OTHER3: "Washington, Tyne and Wear",
    OTHER4: "Google",
  },
  {
    FNAME: "Tarli Massage & Bodywork",
    email: "contact@tarli.uk",
    website: "https://tarli.uk/",
    FILE:
      "https://unicorn-client-cdn.b-cdn.net/file-type-image__3bd5f523-51a5-4eb0-a770-e1218f4eab17__T%EF%80%92%EF%80%8DlI%20copy%202.png",
    OTHER:
      "Tarli offers holistic massage and somatic bodywork from a calm treatment space in Totnes, with a mobile service across South Devon. Working slowly and with depth, their sessions blend therapeutic massage, deep tissue, joint mobilisation and breath awareness to support the nervous system and release tension held in the body. Whether you're carrying chronic pain, stress or simply need a space to unwind, each session is tailored to what you need on the day.",
    OTHER2: "https://tarli.uk/",
    OTHER3: "Totnes",
    OTHER4: "Online",
  },
];

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
  const { data: existing } = await supabase.from("listings").select("slug").not("slug", "is", null);
  const taken = new Set((existing ?? []).map((r) => r.slug as string));
  let imported = 0;

  for (const r of rows) {
    const name = clean(r.FNAME);
    if (!name) continue;

    const slug = uniqueSlug(name, taken);
    taken.add(slug);
    const logo_url = await rehostLogo(r.FILE, slug);

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
      is_featured: false,
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
    console.log(`  ✓ ${name}${logo_url ? "" : " (no logo)"}`);
  }

  console.log(`\nImported ${imported} listings.`);
}

main();
