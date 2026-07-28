import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UserService } from "@/server/services/user";
import { sendVerificationEmail } from "@/lib/email";

/**
 * POST /api/auth/send-verification
 *
 * Generates a fresh verification token and re-sends the verification email.
 * The user must be authenticated (i.e., logged in but unverified).
 *
 * Rate-limiting: limited to 3 resends per 10 minutes via a simple
 * in-memory counter. In production, use Upstash Rate Limit or similar.
 */

// In-memory resend rate limiter: { userId -> [timestamps] }
// This resets on server restart — sufficient for portfolio scope.
const resendAttempts = new Map<string, number[]>();

const MAX_RESENDS_PER_WINDOW = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const attempts = (resendAttempts.get(userId) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  resendAttempts.set(userId, attempts);

  if (attempts.length >= MAX_RESENDS_PER_WINDOW) return true;

  resendAttempts.set(userId, [...attempts, now]);
  return false;
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.emailVerified) {
      return NextResponse.json(
        { error: "Your email is already verified" },
        { status: 400 }
      );
    }

    if (isRateLimited(session.user.id)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const user = await UserService.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = await UserService.refreshVerificationToken(session.user.id);

    await sendVerificationEmail({
      to: user.email,
      name: user.name ?? "there",
      token,
    });

    return NextResponse.json({ message: "Verification email sent. Check your inbox." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[POST /api/auth/send-verification]:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
