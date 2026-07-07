// Uploads the 2 logos the user manually saved to images/, and retries
// Birmingham Sports Massage's logo from its new domain (colmorehealth.com).
// Run: npx --yes tsx scripts/finish-logos-2026-07-07.ts
import { loadEnvFile } from "node:process";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

loadEnvFile(".env.local");
import type { Database } from "../src/lib/database.types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");

const supabase = createClient<Database>(url, key, { auth: { persistSession: false } });

async function uploadLocalLogo(localPath: string, slug: string, contentType: string) {
  const buf = readFileSync(localPath);
  const ext = localPath.split(".").pop()!;
  const path = `${slug}.${ext}`;
  const { error } = await supabase.storage
    .from("listing-logos")
    .upload(path, buf, { contentType, upsert: true });
  if (error) throw error;
  const logo_url = supabase.storage.from("listing-logos").getPublicUrl(path).data.publicUrl;
  await supabase.from("listings").update({ logo_url }).eq("slug", slug);
  console.log(`  ✓ ${slug} -> ${logo_url}`);
}

async function findLogoUrl(pageUrl: string): Promise<string | null> {
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
}

async function rehostLogo(imageUrl: string, slug: string): Promise<string | null> {
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
}

async function main() {
  await uploadLocalLogo("images/liverpool massage.png", "liverpool-massage", "image/png");
  await uploadLocalLogo("images/jqmassage.webp", "jq-sports-massage", "image/webp");

  const imageUrl = await findLogoUrl("https://colmorehealth.com/");
  if (imageUrl) {
    const logo_url = await rehostLogo(imageUrl, "birmingham-sports-massage");
    if (logo_url) {
      await supabase.from("listings").update({ logo_url }).eq("slug", "birmingham-sports-massage");
      console.log(`  ✓ birmingham-sports-massage -> ${logo_url}`);
    }
  } else {
    console.log("  ✗ still no logo found for colmorehealth.com");
  }
}

main();
