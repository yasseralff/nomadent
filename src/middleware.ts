import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Temporary NextAuth middleware bypass.
 * Next.js expects a default export or a named function export called 'middleware'.
 */
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Keeping matcher empty for now so this middleware doesn't trigger unnecessary work
  matcher: [],
};
