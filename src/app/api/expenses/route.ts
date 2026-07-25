import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ExpenseService } from "@/server/services/expense";
import { createExpenseSchema } from "@/server/validation/schemas";

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Retrieve all expenses
 *     description: Fetches a list of expenses for the currently logged-in user, including their related currency and category details.
 *     responses:
 *       200:
 *         description: A list of expenses.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 *   post:
 *     summary: Create a new expense
 *     description: Creates a new expense entry for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - currencyId
 *               - convertedAmount
 *               - categoryId
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               currencyId:
 *                 type: string
 *               convertedAmount:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Expense created successfully.
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

    const expenses = await ExpenseService.getAll(session.user.id);
    return NextResponse.json({ data: expenses });
  } catch (error: any) {
    console.error("[Expenses GET API Error]:", error);
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
    const result = createExpenseSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const expense = await ExpenseService.create(session.user.id, {
      ...result.data,
      date: new Date(result.data.date),
    });

    return NextResponse.json({ data: expense }, { status: 201 });
  } catch (error: any) {
    console.error("[Expenses POST API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
