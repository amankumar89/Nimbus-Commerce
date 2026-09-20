import { NextRequest, NextResponse } from "next/server";

const REFRESH_COOKIE_NAME = "refreshToken"; // must match whatever your backend names it

const PROTECTED_PREFIXES = ["/admin", "/profile", "/orders", "/wishlist", "/addresses"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasRefreshCookie = request.cookies.has(REFRESH_COOKIE_NAME);

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // No cookie at all + trying to hit a protected route → bounce to login immediately
  if (isProtected && !hasRefreshCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
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