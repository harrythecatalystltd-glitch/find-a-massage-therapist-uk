import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// @supabase/ssr's browser client is PKCE-only, so it can't consume the implicit-flow
// `#access_token=...` fragment that Supabase's own /auth/v1/verify redirect produces —
// it silently never fires PASSWORD_RECOVERY. This route verifies the OTP server-side
// (setting the session via cookies) so the client never has to parse the URL at all.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (token_hash && type) {
    const supabase = await createClient();
    await supabase.auth.verifyOtp({ type, token_hash });
  }

  // On success this lands with a session cookie set; on failure, without one — either
  // way, /dashboard/set-password's own getUser() check decides ready vs expired.
  return NextResponse.redirect(new URL("/dashboard/set-password", request.url));
}
