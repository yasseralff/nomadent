import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { DeadlineService } from "@/server/services/deadline";
import { createDeadlineSchema } from "@/server/validation/schemas";

/**
 * @swagger
 * /api/deadlines:
 *   get:
 *     summary: Retrieve all deadlines
 *     description: Fetches a paginated list of deadlines for the currently logged-in user, sorted by urgency (dueDate ascending).
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number (1-indexed).
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: A paginated list of deadlines.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 *   post:
 *     summary: Create a new deadline
 *     description: Creates a new deadline entry for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [VISA, INSURANCE, BIOMETRICS, OPT_CPT, DOCUMENT, OTHER]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *               workHourCap:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Deadline created successfully.
 *       400:
 *         description: Invalid input fields.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const pageSize = Math.max(1, Number(searchParams.get("pageSize")) || 20);

    const deadlines = await DeadlineService.getAll(session.user.id, page, pageSize);
    return NextResponse.json(deadlines);
  } catch (error) {
    console.error("[Deadlines GET API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = createDeadlineSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const deadline = await DeadlineService.create(session.user.id, {
      ...result.data,
      dueDate: new Date(result.data.dueDate),
    });

    return NextResponse.json({ data: deadline }, { status: 201 });
  } catch (error) {
    console.error("[Deadlines POST API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
