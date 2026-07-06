import type { Metadata } from "next";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendAdminNotifyEmail } from "@/lib/email";

export const metadata: Metadata = { title: "Confirm Your Listing" };

async function verify(token: string) {
  const supabase = createAdminClient();
  const { data: listing } = await supabase
    .from("listings")
    .select("id, business_name, email, town")
    .eq("verification_token", token)
    .maybeSingle();

  if (!listing) return false;

  await supabase
    .from("listings")
    .update({ email_verified: true, status: "verified", verified_at: new Date().toISOString(), verification_token: null })
    .eq("id", listing.id);

  await sendAdminNotifyEmail(listing);
  return true;
}

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const success = token ? await verify(token) : false;

  return (
    <div className="site">
      <section className="section">
        <div className="container">
          <div className="form-success">
            {success ? (
              <>
                <h3>Email confirmed</h3>
                <p>
                  Thanks — your listing has been sent to us for review. We&apos;ll email you
                  once it&apos;s approved and live on the directory.
                </p>
              </>
            ) : (
              <>
                <h3>Link invalid or already used</h3>
                <p>
                  This confirmation link is invalid or has already been used. If you still
                  need to confirm a listing,{" "}
                  <Link href="/list-your-practice">submit it again</Link>.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
