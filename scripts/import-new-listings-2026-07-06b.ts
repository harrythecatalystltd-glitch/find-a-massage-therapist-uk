// One-off import of listings found in the old Unicorn CMS "Items" collection
// that aren't in Supabase yet (no export/API available for that collection,
// so details were gathered manually from the dashboard).
// Run: npx --yes tsx scripts/import-new-listings-2026-07-06b.ts
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

const rows: {
  business_name: string;
  website_url?: string;
  instagram?: string;
  summary?: string;
  town: string;
}[] = [
  {
    business_name: "Balance with Reflexology",
    instagram: "https://www.instagram.com/balancewithreflexology/",
    town: "Caterham",
  },
  {
    business_name: "Riversdale Massage",
    website_url: "https://riversdalemassage.co.uk/",
    summary:
      "Raynor massage therapist and reflexologist providing therapeutic deep tissue massage to relieve stiffness, pain and tension.",
    town: "Liverpool",
  },
  {
    business_name: "Liverpool Massage",
    website_url: "https://liverpool-massage.com/",
    summary:
      "Professional massage therapist providing Swedish and deep tissue massages tailored to clients' needs.",
    town: "Liverpool",
  },
  {
    business_name: "Birmingham Sports Massage",
    website_url: "https://birminghamsportsmassage.co.uk",
    summary:
      "Clinic offering deep tissue sports massage alongside physiotherapy, movement screening, cupping and acupuncture.",
    town: "Birmingham",
  },
  {
    business_name: "JQ Sports Massage",
    website_url: "https://jqsportsmassage.com",
    summary:
      "Soft tissue specialists providing injury rehabilitation and sports massage; holistic assessments identify the root cause.",
    town: "Birmingham",
  },
  {
    business_name: "Live Well Health",
    website_url: "https://www.livewellhealth.co.uk/massage/sports-massage/sports-massage-birmingham/",
    summary:
      "Team of degree-qualified therapists delivering expert sports massage tailored to individual needs.",
    town: "Birmingham",
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
      website_url: r.website_url ?? null,
      instagram: r.instagram ?? null,
      summary: r.summary ?? null,
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
