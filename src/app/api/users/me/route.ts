import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UserService } from "@/server/services/user";
import { updateProfileSchema } from "@/server/validation/schemas";

/**
 * GET /api/users/me
 *
 * Returns the full profile of the currently authenticated user, excluding
 * sensitive fields (password hash, verification token).
 *
 * Used by:
 *  - The profile page (full user data display)
 *  - The useCurrentUser() TanStack Query hook
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await UserService.getUserProfile(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[GET /api/users/me]:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/users/me
 *
 * Partially updates the current user's profile.
 * Only the fields present in the request body are updated.
 *
 * Fields that can be updated: name, university, country, homeCurrencyId.
 * Fields that cannot be updated here: email, password, image (each gets
 * its own dedicated flow for security reasons).
 */
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = updateProfileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updatedUser = await UserService.updateUserProfile(session.user.id, result.data);
    return NextResponse.json({ data: updatedUser });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[PATCH /api/users/me]:", message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
