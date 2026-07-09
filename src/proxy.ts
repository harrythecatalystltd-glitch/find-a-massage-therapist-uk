import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_PREFIXES = ["/admin/login", "/dashboard/login", "/dashboard/set-password"];
const PROTECTED_PREFIXES = ["/admin", "/dashboard"];

// Replaces Next's built-in `trailingSlash: true` redirect (disabled via
// `skipTrailingSlashRedirect` in next.config.ts) so we can exempt /api routes from
// it — Route Handlers don't get a trailing-slash alias, so the built-in redirect
// sent every /api request to a URL that 404s, and Stripe doesn't follow redirects.
// The matcher below already excludes /api, static files and _next assets, so this
// only ever runs for page paths.
function withTrailingSlash(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === "/" || pathname.endsWith("/")) return null;
  // Plain `URL`, not `request.nextUrl.clone()` — NextURL's clone().toString() silently
  // drops a trailing slash set via the `.pathname` setter, even though the property
  // itself holds the right value (confirmed by logging it — a real NextURL quirk).
  const url = new URL(`${pathname}/${search}`, request.url);
  return NextResponse.redirect(url, 308);
}

export async function proxy(request: NextRequest) {
  const slashRedirect = withTrailingSlash(request);
  if (slashRedirect) return slashRedirect;

  const { pathname } = request.nextUrl;
  if (!PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  if (PUBLIC_PREFIXES.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginPath = request.nextUrl.pathname.startsWith("/dashboard")
      ? "/dashboard/login"
      : "/admin/login";
    const loginUrl = new URL(loginPath, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // auth/confirm is exempted for the same reason api/ is: it's a Route Handler, which
  // doesn't get a trailing-slash alias, so redirecting it to a slash-suffixed URL 404s.
  matcher: ["/((?!api/|auth/confirm|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
