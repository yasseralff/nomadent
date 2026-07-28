import { NextResponse } from "next/server";
import { UserService } from "@/server/services/user";
import { registerSchema } from "@/server/validation/schemas";
import { sendVerificationEmail } from "@/lib/email";

/**
 * POST /api/auth/register
 *
 * Creates a new user account.
 *
 * On success:
 *   1. Hashes the password with bcrypt (cost 12)
 *   2. Generates an email verification token
 *   3. Stores both on the User record
 *   4. Sends a verification email via Resend
 *   5. Returns 201 with the public user fields
 *
 * The user cannot access protected routes until they click the
 * verification link in their inbox (enforced by middleware.ts).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid fields", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const existingUser = await UserService.findByEmail(result.data.email);
    if (existingUser) {
      // 409 Conflict — the resource (user) already exists.
      // 400 Bad Request would be misleading here since the input itself is valid.
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const { user, verificationToken } = await UserService.createUser(result.data);

    // Send the verification email. Fire-and-forget — registration still
    // succeeds even if the email service is temporarily unavailable.
    // The user can request a resend from the verify-email page.
    try {
      await sendVerificationEmail({
        to: user.email,
        name: user.name ?? "there",
        token: verificationToken,
      });
    } catch (emailError: unknown) {
      const message = emailError instanceof Error ? emailError.message : "Unknown email error";
      console.error("[Register] Failed to send verification email:", message);
    }

    return NextResponse.json(
      {
        message: "Account created. Please check your inbox to verify your email.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Register API Error]:", message);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
