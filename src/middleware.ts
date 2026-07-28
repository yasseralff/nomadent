import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * DEBUG BYPASS SWITCH
 *
 * Add to .env.local to skip ALL auth checks during development:
 *   NEXT_PUBLIC_AUTH_DEBUG=true
 *
 * Remove it (or set to false) to re-enable full protection.
 * NEVER set this in production.
 */
const IS_AUTH_DEBUG_BYPASS_ENABLED = process.env.NEXT_PUBLIC_AUTH_DEBUG === "true";

/** Routes requiring auth + email verification. Checked with startsWith. */
const PROTECTED_ROUTE_PREFIXES = [
  "/dashboard",
  "/expenses",
  "/tasks",
  "/goals",
  "/deadlines",
  "/settings",
];

/** Routes that redirect authenticated users away to /dashboard. */
const AUTH_ONLY_ROUTE_PREFIXES = ["/login", "/register"];

/**
 * Public routes — always accessible, no auth checks.
 *
 * IMPORTANT: "/" is in PUBLIC_EXACT_ROUTES (exact match only).
 * It must NOT be in a prefix list, because "/" is a prefix of every path —
 * that was the original bug that made all routes pass through as public.
 */
const PUBLIC_EXACT_ROUTES = new Set(["/"]);
const PUBLIC_PREFIX_ROUTES = ["/verify-email", "/api/", "/_next/", "/favicon.ico"];

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_EXACT_ROUTES.has(pathname)) return true;
  return PUBLIC_PREFIX_ROUTES.some((prefix) => pathname.startsWith(prefix));
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isAuthOnlyRoute(pathname: string): boolean {
  return AUTH_ONLY_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Next.js Middleware — runs before every matching page request.
 *
 * Decision tree (in order):
 *  1. Debug bypass active? → pass through (log warning)
 *  2. Public route? → pass through
 *  3. Read JWT (no DB call)
 *  4. Authenticated + verified on /login or /register → redirect to /dashboard
 *  5. Unauthenticated on protected route → redirect to /login?callbackUrl=...
 *  6. Authenticated but unverified on protected route → redirect to /verify-email
 *  7. Everything else → pass through
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Step 1 — Debug bypass
  if (IS_AUTH_DEBUG_BYPASS_ENABLED) {
    console.warn(`[middleware] AUTH DEBUG BYPASS ACTIVE — ${pathname} skipping auth`);
    return NextResponse.next();
  }

  // Step 2 — Public routes always pass (checked before any token read)
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Step 3 — Read JWT from session cookie (no DB call)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isEmailVerified = !!(token?.emailVerified);

  // Step 4 — Authenticated + verified visiting auth-only pages
  if (isAuthenticated && isEmailVerified && isAuthOnlyRoute(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Step 5 — Unauthenticated visiting protected pages
  if (!isAuthenticated && isProtectedRoute(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Step 6 — Authenticated but unverified visiting protected pages
  if (isAuthenticated && !isEmailVerified && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/verify-email", request.url));
  }

  return NextResponse.next();
}

/**
 * Matcher — which routes Next.js runs this middleware on.
 * Excludes: static assets, Next.js internals, /api/auth (Auth.js handles itself).
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
