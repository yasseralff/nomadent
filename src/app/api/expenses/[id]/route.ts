import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ExpenseService } from "@/server/services/expense";
import { updateExpenseSchema } from "@/server/validation/schemas";

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     description: Updates an existing expense entry for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The expense ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Expense updated successfully.
 *       400:
 *         description: Invalid input fields.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Delete an expense
 *     description: Deletes an expense entry for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The expense ID.
 *     responses:
 *       200:
 *         description: Expense deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const result = updateExpenseSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updatedData = { ...result.data };
    if (updatedData.date) {
      updatedData.date = new Date(updatedData.date) as any;
    }

    const expense = await ExpenseService.update(id, session.user.id, updatedData as any);
    return NextResponse.json({ data: expense });
  } catch (error: any) {
    console.error("[Expense PUT API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await ExpenseService.delete(id, session.user.id);
    return NextResponse.json({ message: "Expense deleted successfully" });
  } catch (error: any) {
    console.error("[Expense DELETE API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
