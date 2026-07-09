import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

// Public directory reads use a cookieless anon client: RLS already restricts
// anon access to approved listings + published locations, and this works inside
// `generateStaticParams` (which runs at build time, without an HTTP request).
function createClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

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
  is_boosted: boolean;
  treatments?: { name: string; slug: string }[];
};

const CARD_COLUMNS =
  "slug, business_name, summary, town, logo_url, is_featured, is_boosted, listing_treatment_types ( treatment_types ( name, slug ) )";

/** Flatten the nested treatment join the card query selects into a tidy array. */
type RawCardRow = Omit<ListingCardData, "treatments"> & {
  listing_treatment_types?: { treatment_types: { name: string; slug: string } | null }[] | null;
};

function toCardData(rows: unknown): ListingCardData[] {
  return ((rows ?? []) as RawCardRow[]).map((row) => {
    const { listing_treatment_types, ...rest } = row;
    const treatments = (listing_treatment_types ?? [])
      .map((r) => r.treatment_types)
      .filter((t): t is { name: string; slug: string } => t != null);
    return { ...rest, treatments };
  });
}

export type ListingDetail = ListingCardData & {
  description_long: string | null;
  website_url: string | null;
  dofollow: boolean;
  region: string | null;
  treatments: { name: string; slug: string }[];
  google_maps_url: string | null;
  google_review_count: number | null;
  google_rating: number | null;
  qualifications: string | null;
  insured: boolean;
  insurance_provider: string | null;
  tier: Database["public"]["Enums"]["listing_tier"];
  gallery_urls: string[];
};

export async function getFeaturedListings(): Promise<ListingCardData[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("listings")
    .select(CARD_COLUMNS)
    .eq("status", "approved")
    .eq("is_featured", true)
    .order("business_name");
  return toCardData(data);
}

export async function getApprovedListings(): Promise<ListingCardData[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("listings")
    .select(CARD_COLUMNS)
    .eq("status", "approved")
    .order("is_boosted", { ascending: false })
    .order("business_name");
  return toCardData(data);
}

export async function getListingsForTown(townName: string): Promise<ListingCardData[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("listings")
    .select(CARD_COLUMNS)
    .eq("status", "approved")
    .ilike("town", `%${townName}%`)
    .order("is_boosted", { ascending: false })
    .order("business_name");
  return toCardData(data);
}

/** Approved listings linked to a given treatment-type slug (via listing_treatment_types). */
export async function getListingsForTreatment(
  treatmentSlug: string,
): Promise<ListingCardData[]> {
  const supabase = createClient();
  // Filter via an inner join, then read the full treatment set with the card embed.
  const { data } = await supabase
    .from("listings")
    .select(`${CARD_COLUMNS}, _filter:listing_treatment_types!inner ( treatment_types!inner ( slug ) )`)
    .eq("status", "approved")
    .eq("_filter.treatment_types.slug", treatmentSlug)
    .order("is_boosted", { ascending: false })
    .order("business_name");
  return toCardData(data);
}

export async function getListingBySlug(slug: string): Promise<ListingDetail | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("listings")
    .select(
      `slug, business_name, summary, town, logo_url, is_featured, is_boosted,
       description_long, website_url, dofollow, region,
       google_maps_url, google_review_count, google_rating,
       qualifications, insured, insurance_provider, tier, gallery_urls,
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
    is_boosted: data.is_boosted,
    description_long: data.description_long,
    website_url: data.website_url,
    dofollow: data.dofollow,
    region: data.region,
    treatments,
    google_maps_url: data.google_maps_url,
    google_review_count: data.google_review_count,
    // numeric(2,1) comes back from postgrest as a string (e.g. "5.0").
    google_rating: data.google_rating != null ? Number(data.google_rating) : null,
    qualifications: data.qualifications,
    insured: data.insured,
    insurance_provider: data.insurance_provider,
    tier: data.tier,
    gallery_urls: data.gallery_urls,
  };
}

export async function getApprovedSlugs(): Promise<string[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("listings")
    .select("slug")
    .eq("status", "approved")
    .not("slug", "is", null);
  return (data ?? []).map((r) => r.slug as string);
}

export async function getAllLocations(): Promise<LocationRow[]> {
  const supabase = createClient();
  const { data } = await supabase.from("locations").select("*").order("town");
  return data ?? [];
}

export async function getLocationBySlug(slug: string): Promise<LocationRow | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("locations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export async function getTreatmentTypes(): Promise<TreatmentTypeRow[]> {
  const supabase = createClient();
  const { data } = await supabase.from("treatment_types").select("*").order("name");
  return data ?? [];
}

export type ToolRow = Database["public"]["Tables"]["massage_tools"]["Row"];

/** Approved massage tools/equipment listings, featured first. */
export async function getMassageTools(): Promise<ToolRow[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("massage_tools")
    .select("*")
    .eq("status", "approved")
    .order("is_featured", { ascending: false })
    .order("business_name");
  return data ?? [];
}
