// Apply the researched per-town SEO content (scripts/location-content.ts) to the
// locations table: intro_copy, seo_body (4 paragraphs) and faqs.
// Run: npx --yes tsx scripts/generate-location-content.ts
import { loadEnvFile } from "node:process";
import { createClient } from "@supabase/supabase-js";
import { LOCATION_CONTENT } from "./location-content";
import type { Database } from "../src/lib/database.types";

loadEnvFile(".env.local");

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

async function main() {
  const { data, error } = await supabase.from("locations").select("id, slug, town");
  if (error) throw error;

  let updated = 0;
  for (const l of data) {
    const content = LOCATION_CONTENT[l.slug];
    if (!content) {
      console.warn(`  ⚠ no content for ${l.slug}`);
      continue;
    }
    const { error: upErr } = await supabase
      .from("locations")
      .update({
        intro_copy: content.intro,
        seo_body: content.body,
        faqs: content.faqs,
      })
      .eq("id", l.id);
    if (upErr) {
      console.error(`  ✗ ${l.town}: ${upErr.message}`);
      continue;
    }
    updated++;
    console.log(`  ✓ ${l.town}`);
  }
  console.log(`\nUpdated ${updated} locations.`);
}

main();
