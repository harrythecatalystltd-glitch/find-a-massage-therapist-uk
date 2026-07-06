// One-off import of the last listings found in the old Unicorn CMS "Items" collection.
// Run: npx --yes tsx scripts/import-new-listings-2026-07-06e.ts
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
    business_name: "Wellness Centre",
    website_url: "https://www.wellnesscentrenewcastle.co.uk",
    summary:
      "Remedial massage therapists combine Swedish, deep tissue and aromatherapy massage to release toxins and increase wellbeing.",
    town: "Newcastle",
  },
  {
    business_name: "Roks Therapy",
    website_url: "https://www.rokstherapy.com",
    summary:
      "Sports and holistic therapist providing sports, deep tissue, relaxation, cupping, taping, manual and pregnancy massage.",
    town: "Liverpool",
  },
  {
    business_name: "Physio Art",
    website_url: "https://physioart.co.uk/our-services/sports-massage-birmingham-and-harborne/",
    summary:
      "Edgbaston & Harborne clinic where clinically trained physiotherapists provide sports massage with myofascial release.",
    town: "Birmingham",
  },
  {
    business_name: "The Therapy Room",
    website_url: "https://www.thetherapyroomsnewcastle.co.uk/",
    summary:
      "Experienced massage therapist providing hands-on treatments to lessen pain, increase range of movement and ease muscle tension.",
    town: "Newcastle",
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
