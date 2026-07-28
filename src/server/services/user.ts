import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import type { RegisterInput, UpdateProfileInput } from "@/server/validation/schemas";

/** How long (in hours) a verification token is valid before it expires. */
const VERIFICATION_TOKEN_EXPIRY_HOURS = 24;

export class UserService {
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Creates a new user with a bcrypt-hashed password and generates an
   * email verification token. The token and its expiry are stored on
   * the User record and must be consumed via the verify-email API route.
   *
   * Returns both the created user and the raw token (so the register route
   * can pass it to the email sender without another DB read).
   */
  static async createUser(
    data: RegisterInput
  ): Promise<{ user: Awaited<ReturnType<typeof prisma.user.create>>; verificationToken: string }> {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpiry = new Date(
      Date.now() + VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
    );

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword,
        emailVerificationToken: verificationToken,
        emailVerificationExpiry: verificationExpiry,
        // Defaults: country = "US" (set in schema), homeCurrencyId = null
      },
    });

    return { user, verificationToken };
  }

  /**
   * Returns the full user profile, excluding the password hash and
   * internal verification token. Used by GET /api/users/me.
   */
  static async getUserProfile(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        university: true,
        country: true,
        homeCurrencyId: true,
        homeCurrency: {
          select: { id: true, name: true, symbol: true, details: true },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Updates mutable profile fields for a given user.
   * Only fields present in `data` are updated (partial update pattern).
   */
  static async updateUserProfile(id: string, data: UpdateProfileInput) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        university: true,
        country: true,
        homeCurrencyId: true,
        homeCurrency: {
          select: { id: true, name: true, symbol: true, details: true },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Generates a fresh verification token and stores it on the user record.
   * Call this when the user requests a resend of the verification email.
   * Returns the raw token so the caller can pass it to the email sender.
   */
  static async refreshVerificationToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerificationToken: token,
        emailVerificationExpiry: expiry,
      },
    });

    return token;
  }

  /**
   * Validates and consumes an email verification token.
   *
   * Returns the user if the token is valid, not expired, and not yet used.
   * Returns null if the token is invalid or expired.
   *
   * On success, marks emailVerified and clears the token from the DB so it
   * cannot be reused (single-use tokens).
   */
  static async verifyEmailToken(token: string) {
    const user = await prisma.user.findUnique({
      where: { emailVerificationToken: token },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        emailVerificationExpiry: true,
      },
    });

    if (!user) return null;
    if (user.emailVerified) return null; // already verified
    if (!user.emailVerificationExpiry || user.emailVerificationExpiry < new Date()) {
      return null; // token expired
    }

    // Mark email as verified and clear the token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
        emailVerificationExpiry: null,
      },
    });

    return user;
  }
}
