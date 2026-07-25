import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GoalService } from "@/server/services/goal";
import { createGoalSchema } from "@/server/validation/schemas";

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Retrieve all goals
 *     description: Fetches a list of goals for the currently logged-in user, including their related currency details.
 *     responses:
 *       200:
 *         description: A list of goals.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 *   post:
 *     summary: Create a new goal
 *     description: Creates a new savings goal for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - targetAmount
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               targetAmount:
 *                 type: number
 *               currentAmount:
 *                 type: number
 *               currencyId:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Goal created successfully.
 *       400:
 *         description: Invalid input fields.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const goals = await GoalService.getAll(session.user.id);
    return NextResponse.json({ data: goals });
  } catch (error: any) {
    console.error("[Goals GET API Error]:", error);
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
    const result = createGoalSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const goal = await GoalService.create(session.user.id, {
      ...result.data,
      deadline: result.data.deadline ? new Date(result.data.deadline) : undefined,
    });

    return NextResponse.json({ data: goal }, { status: 201 });
  } catch (error: any) {
    console.error("[Goals POST API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
