// One-off import of more listings found in the old Unicorn CMS "Items" collection.
// Run: npx --yes tsx scripts/import-new-listings-2026-07-06d.ts
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

const rows: { business_name: string; website_url: string; summary: string; town: string }[] = [
  {
    business_name: "SK Holistic Health",
    website_url: "https://www.skholistichealth.com",
    summary:
      "Provides tailored wellness services in a tranquil Wigan space, offering treatments from acupuncture to fire cupping.",
    town: "Wigan",
  },
  {
    business_name: "Walee Sports Massage",
    website_url: "https://www.waleesportmassage.co.uk",
    summary:
      "Wigan-based therapist specialising in Thai and sports massage to ease stress and strain.",
    town: "Wigan",
  },
  {
    business_name: "Energize Sports Injury Clinic",
    website_url: "https://www.energizesportsinjuryclinic.co.uk",
    summary:
      "Physiotherapist and sports injury specialist providing soft tissue sports massage to treat musculoskeletal injuries.",
    town: "Wigan",
  },
];

async function main() {
  const { data: existing } = await supabase.from("listings").select("slug").not("slug", "is", null);
  const taken = new Set((existing ?? []).map((r) => r.slug as string));
  let imported = 0;

  for (const r of rows) {
    const slug = uniqueSlug(r.business_name, taken);
    taken.add(slug);

    const row: ListingInsert = {
      slug,
      business_name: r.business_name,
      website_url: r.website_url,
      summary: r.summary,
      town: r.town,
      is_featured: false,
      status: "approved",
      email_verified: true,
      verified_at: new Date().toISOString(),
      approved_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("listings").upsert(row, { onConflict: "slug" });
    if (error) {
      console.error(`  insert failed (${r.business_name}): ${error.message}`);
      continue;
    }
    imported++;
    console.log(`  ✓ ${r.business_name} (${slug})`);
  }

  console.log(`\nImported ${imported} listings.`);
}

main();
