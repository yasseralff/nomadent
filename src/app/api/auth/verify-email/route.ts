import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserService } from "@/server/services/user";

/**
 * GET /api/auth/verify-email?token=<token>
 *
 * Validates an email verification token and marks the user's account as verified.
 *
 * Flow:
 *  1. Extract token from query string
 *  2. Look up the token in the DB (UserService.verifyEmailToken)
 *  3. If valid: mark emailVerified, clear the token, redirect to /dashboard
 *  4. If invalid/expired: redirect to /verify-email?error=invalid
 *
 * This is a GET route because it is accessed by clicking a link in an email.
 * Browsers follow redirects from links with GET, not POST.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/verify-email?error=missing-token", req.url));
  }

  try {
    const user = await UserService.verifyEmailToken(token);

    if (!user) {
      // Token not found, already used, or expired
      return NextResponse.redirect(new URL("/verify-email?error=invalid-token", req.url));
    }

    // Redirect to the dashboard. The JWT will be refreshed on the next
    // session read — the middleware will see emailVerified = true.
    return NextResponse.redirect(new URL("/dashboard?verified=true", req.url));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[GET /api/auth/verify-email]:", message);
    return NextResponse.redirect(new URL("/verify-email?error=server-error", req.url));
  }
}
