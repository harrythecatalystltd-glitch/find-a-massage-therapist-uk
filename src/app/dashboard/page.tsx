import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { signOut, openBillingPortal } from "./actions";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

const TIER_LABEL: Record<string, string> = { free: "Free", pro: "Pro", vip: "VIP" };

function paymentLink(base: string, listingId: string, email: string | null) {
  const params = new URLSearchParams({ client_reference_id: listingId });
  if (email) params.set("prefilled_email", email);
  return `${base}?${params.toString()}`;
}

async function getOwnListing(userId: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("listings")
    .select(
      "id, business_name, town, phone, email, website_url, summary, tier, stripe_customer_id, stripe_subscription_id",
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
                  <strong>Town:</strong> {listing.town ?? "Not set"}
                  <br />
                  <strong>Phone:</strong> {listing.phone ?? "Not set"}
                  <br />
                  <strong>Email:</strong> {listing.email ?? "Not set"}
                  <br />
                  <strong>Website:</strong> {listing.website_url ?? "Not set"}
                  <br />
                  <strong>Summary:</strong> {listing.summary ?? "Not set"}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                <Link className="btn btn-primary" href="/dashboard/edit">
                  Edit listing
                </Link>
                {listing.tier === "free" && (
                  <a
                    className="btn btn-ghost"
                    href={paymentLink(
                      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PRO!,
                      listing.id,
                      listing.email,
                    )}
                  >
                    Upgrade to Pro (£7/mo)
                  </a>
                )}
                {listing.tier !== "vip" && (
                  <a
                    className="btn btn-ghost"
                    href={paymentLink(
                      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_VIP!,
                      listing.id,
                      listing.email,
                    )}
                  >
                    Upgrade to VIP (£27/mo)
                  </a>
                )}
                {listing.stripe_customer_id && (
                  <form action={openBillingPortal}>
                    <button type="submit" className="btn btn-ghost">
                      Manage billing
                    </button>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
