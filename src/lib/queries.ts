import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

type LocationRow = Database["public"]["Tables"]["locations"]["Row"];
type TreatmentTypeRow = Database["public"]["Tables"]["treatment_types"]["Row"];

/** The columns the card and listing pages actually render. */
export type ListingCardData = {
  slug: string;
  business_name: string;
  summary: string | null;
  town: string | null;
  logo_url: string | null;
  is_featured: boolean;
};

const CARD_COLUMNS = "slug, business_name, summary, town, logo_url, is_featured";

export type ListingDetail = ListingCardData & {
  description_long: string | null;
  website_url: string | null;
  dofollow: boolean;
  region: string | null;
  treatments: { name: string; slug: string }[];
};

export async function getFeaturedListings(): Promise<ListingCardData[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("listings")
    .select(CARD_COLUMNS)
    .eq("status", "approved")
    .eq("is_featured", true)
    .order("business_name");
  return (data ?? []) as ListingCardData[];
}

export async function getApprovedListings(): Promise<ListingCardData[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("listings")
    .select(CARD_COLUMNS)
    .eq("status", "approved")
    .order("is_featured", { ascending: false })
    .order("business_name");
  return (data ?? []) as ListingCardData[];
}

export async function getListingsForTown(townName: string): Promise<ListingCardData[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("listings")
    .select(CARD_COLUMNS)
    .eq("status", "approved")
    .ilike("town", `%${townName}%`)
    .order("is_featured", { ascending: false })
    .order("business_name");
  return (data ?? []) as ListingCardData[];
}

export async function getListingBySlug(slug: string): Promise<ListingDetail | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("listings")
    .select(
      `slug, business_name, summary, town, logo_url, is_featured,
       description_long, website_url, dofollow, region,
       listing_treatment_types ( treatment_types ( name, slug ) )`,
    )
    .eq("status", "approved")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;

  const treatments = (data.listing_treatment_types ?? [])
    .map((row) => row.treatment_types)
    .filter((t): t is { name: string; slug: string } => t != null);

  return {
    slug: data.slug as string,
    business_name: data.business_name,
    summary: data.summary,
    town: data.town,
    logo_url: data.logo_url,
    is_featured: data.is_featured,
    description_long: data.description_long,
    website_url: data.website_url,
    dofollow: data.dofollow,
    region: data.region,
    treatments,
  };
}

export async function getApprovedSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("listings")
    .select("slug")
    .eq("status", "approved")
    .not("slug", "is", null);
  return (data ?? []).map((r) => r.slug as string);
}

export async function getAllLocations(): Promise<LocationRow[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("locations").select("*").order("town");
  return data ?? [];
}

export async function getLocationBySlug(slug: string): Promise<LocationRow | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("locations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export async function getTreatmentTypes(): Promise<TreatmentTypeRow[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("treatment_types").select("*").order("name");
  return data ?? [];
}
