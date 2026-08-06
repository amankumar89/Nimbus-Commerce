import { NextRequest, NextResponse } from "next/server";

const REFRESH_COOKIE_NAME = "refreshToken"; // must match whatever your backend names it

const PROTECTED_PREFIXES = ["/admin", "/profile", "/orders", "/wishlist", "/addresses"];
const AUTH_ONLY_PREFIXES = ["/login", "/register"]; // logged-in users shouldn't see these

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasRefreshCookie = request.cookies.has(REFRESH_COOKIE_NAME);

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthOnlyRoute = AUTH_ONLY_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // No cookie at all + trying to hit a protected route → bounce to login immediately
  if (isProtected && !hasRefreshCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Has a cookie (likely logged in) + trying to hit login/register
  // We CAN'T be 100% sure here (cookie could be expired/invalid) — so this is
  // just a fast-path optimization. AuthGate does the authoritative check client-side.
  if (isAuthOnlyRoute && hasRefreshCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/wishlist/:path*",
    "/addresses/:path*",
    "/login",
    "/register",
  ],
};