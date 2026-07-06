import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { approveListing, rejectListing, signOut } from "./actions";

export const metadata: Metadata = { title: "Admin — Review Queue" };
export const dynamic = "force-dynamic";

async function getVerifiedListings() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("listings")
    .select(
      "id, business_name, email, town, listing_type, address, service_area, website_url, verified_at, listing_treatment_types ( treatment_types ( name ) )",
    )
    .eq("status", "verified")
    .order("verified_at", { ascending: true });
  return data ?? [];
}

export default async function AdminPage() {
  const listings = await getVerifiedListings();

  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span className="eyebrow">Admin</span>
            <h1>Review Queue</h1>
          </div>
          <form action={signOut}>
            <button type="submit" className="btn btn-ghost">
              Sign out
            </button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {listings.length === 0 ? (
            <p className="lead">No listings waiting for review.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {listings.map((listing) => {
                const treatments = (listing.listing_treatment_types ?? [])
                  .map((r) => r.treatment_types?.name)
                  .filter(Boolean)
                  .join(", ");
                return (
                  <article className="loc-cta" key={listing.id} style={{ textAlign: "left" }}>
                    <h3>{listing.business_name}</h3>
                    <p>
                      {listing.town} &middot; {listing.listing_type}
                      {listing.listing_type === "clinic" ? ` · ${listing.address ?? ""}` : ` · ${listing.service_area ?? ""}`}
                    </p>
                    <p>
                      <a href={listing.website_url ?? "#"} target="_blank" rel="noopener noreferrer">
                        {listing.website_url}
                      </a>{" "}
                      &middot; {listing.email}
                    </p>
                    {treatments && <p className="tag-row">{treatments}</p>}
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                      <form action={approveListing.bind(null, listing.id)}>
                        <button type="submit" className="btn btn-primary">
                          Approve
                        </button>
                      </form>
                      <form action={rejectListing.bind(null, listing.id)}>
                        <button type="submit" className="btn btn-ghost">
                          Reject
                        </button>
                      </form>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
