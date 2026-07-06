// One-off import of more listings found in the old Unicorn CMS "Items" collection.
// Run: npx --yes tsx scripts/import-new-listings-2026-07-06c.ts
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
    business_name: "On Point",
    website_url: "https://www.onpoint-massage.co.uk/sports-massage-birmingham",
    summary:
      "Sports massage practice applying deep manipulative strokes with thumbs, hands and elbows to target injuries.",
    town: "Birmingham",
  },
  {
    business_name: "Bloom Wellbeing",
    website_url: "https://www.bloom-well-being.co.uk",
    summary:
      "Massage therapist offering bespoke treatments combining therapeutic techniques and intuitive touch to relieve stress.",
    town: "Newcastle",
  },
  {
    business_name: "Essential Thyme",
    website_url: "https://essential-thyme.co.uk/",
    summary:
      "Massage therapist providing pain-targeting treatments that blend different techniques to address underlying causes.",
    town: "Newcastle",
  },
  {
    business_name: "Namaste Wellbeing",
    website_url: "https://namastewell.co.uk",
    summary:
      "Level 4 sports massage and lymphatic drainage specialist who blends advanced technologies with traditional healing.",
    town: "Wigan",
  },
  {
    business_name: "Embodied Therapies",
    website_url: "https://www.embodiedtherapies.co.uk",
    summary:
      "Therapist offering transformative therapies such as hands-free massage and somatic coaching.",
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
