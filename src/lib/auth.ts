import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/server/validation/schemas";

/**
 * Auth.js v4 configuration.
 *
 * Providers:
 *  - Credentials (email + bcrypt password) — for users who registered manually
 *  - Google OAuth — most international students already have a Google account
 *
 * Strategy: JWT (no server-side session storage required for MVP).
 * The session callback extends the JWT token with the user's database ID so
 * route handlers can call `getServerSession(authOptions)` and read `session.user.id`.
 *
 * Environment variables required:
 *  NEXTAUTH_SECRET       — random secret for JWT signing (use: openssl rand -base64 32)
 *  NEXTAUTH_URL          — canonical app URL (e.g. http://localhost:3000)
 *  GOOGLE_CLIENT_ID      — from Google Cloud Console OAuth 2.0 credentials
 *  GOOGLE_CLIENT_SECRET  — from Google Cloud Console OAuth 2.0 credentials
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],

  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate shape first — never trust raw request data
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    /**
     * Attach the database user ID and emailVerified status to the JWT token
     * on sign-in. Both are needed so middleware can gate access without a DB
     * call on every request.
     *
     * Google OAuth users: emailVerified is set to the current date because
     * Google already verified their email — they skip the verification gate.
     */
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        // Persist emailVerified from DB into JWT so session picks it up
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { emailVerified: true },
        });
        token.emailVerified = dbUser?.emailVerified ?? null;
      }
      // Google users are always considered verified
      if (account?.provider === "google") {
        token.emailVerified = new Date();
      }
      return token;
    },

    /**
     * Expose user ID and emailVerified on the session object so:
     *  - Client components can read it via useSession()
     *  - Server route handlers can read it via getServerSession(authOptions)
     *  - middleware.ts can read it to gate unverified users
     */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.emailVerified = (token.emailVerified as Date | null) ?? null;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};
