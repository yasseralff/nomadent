import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { TaskService } from "@/server/services/task";
import { createTaskSchema } from "@/server/validation/schemas";

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Fetches a list of tasks for the currently logged-in user, including their priority and status details.
 *     responses:
 *       200:
 *         description: A list of tasks.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task entry for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priorityId
 *               - statusId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priorityId:
 *                 type: string
 *               statusId:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Task created successfully.
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

    const tasks = await TaskService.getAll(session.user.id);
    return NextResponse.json({ data: tasks });
  } catch (error: any) {
    console.error("[Tasks GET API Error]:", error);
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
    const result = createTaskSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const task = await TaskService.create(session.user.id, {
      ...result.data,
      dueDate: result.data.dueDate ? new Date(result.data.dueDate) : undefined,
    });

    return NextResponse.json({ data: task }, { status: 201 });
  } catch (error: any) {
    console.error("[Tasks POST API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
