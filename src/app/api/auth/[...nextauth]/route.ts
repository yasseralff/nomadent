import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth route handler.
 *
 * Handles all /api/auth/* requests:
 *  - GET  /api/auth/session       — read current session
 *  - GET  /api/auth/providers     — list configured providers
 *  - GET  /api/auth/csrf          — CSRF token
 *  - POST /api/auth/signin/...    — sign in
 *  - POST /api/auth/signout       — sign out
 *  - GET  /api/auth/callback/...  — OAuth callbacks (Google, etc.)
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
