import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { signOut } from "./actions";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

const TIER_LABEL: Record<string, string> = { free: "Free", pro: "Pro", vip: "VIP" };

async function getOwnListing(userId: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("listings")
    .select(
      "business_name, town, phone, email, website_url, summary, tier, stripe_subscription_id",
    )
    .eq("owner_user_id", userId)
    .maybeSingle();
  return data;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const listing = user ? await getOwnListing(user.id) : null;

  return (
    <div className="site">
      <section className="loc-hero">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1>Your listing</h1>
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
          {!listing ? (
            <p className="lead">
              We couldn&apos;t find a listing linked to this account. Contact support if this
              looks wrong.
            </p>
          ) : (
            <>
              <span className="profile-badge">{TIER_LABEL[listing.tier]}</span>
              <h2>{listing.business_name}</h2>
              <div className="loc-cta" style={{ marginTop: "1.5rem" }}>
                <p>
                  <strong>Town:</strong> {listing.town ?? "—"}
                  <br />
                  <strong>Phone:</strong> {listing.phone ?? "—"}
                  <br />
                  <strong>Email:</strong> {listing.email ?? "—"}
                  <br />
                  <strong>Website:</strong> {listing.website_url ?? "—"}
                  <br />
                  <strong>Summary:</strong> {listing.summary ?? "—"}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                <Link className="btn btn-primary" href="/dashboard/edit">
                  Edit listing
                </Link>
                {listing.tier !== "vip" && (
                  <Link className="btn btn-ghost" href="/upgrade">
                    Upgrade your listing
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
