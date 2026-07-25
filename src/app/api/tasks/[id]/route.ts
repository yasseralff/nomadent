import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { TaskService } from "@/server/services/task";
import { updateTaskSchema } from "@/server/validation/schemas";

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Updates an existing task entry for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priorityId:
 *                 type: string
 *               statusId:
 *                 type: string
 *               completed:
 *                 type: boolean
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Invalid input fields.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task entry for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
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
    const result = updateTaskSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updatedData = { ...result.data };
    if (updatedData.dueDate) {
      updatedData.dueDate = new Date(updatedData.dueDate) as any;
    }

    const task = await TaskService.update(id, session.user.id, updatedData as any);
    return NextResponse.json({ data: task });
  } catch (error: any) {
    console.error("[Task PUT API Error]:", error);
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
    await TaskService.delete(id, session.user.id);
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("[Task DELETE API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
