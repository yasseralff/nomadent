import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { DeadlineService } from "@/server/services/deadline";
import { updateDeadlineSchema } from "@/server/validation/schemas";

/**
 * @swagger
 * /api/deadlines/{id}:
 *   get:
 *     summary: Retrieve a deadline
 *     description: Fetches a single deadline by ID for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The deadline ID.
 *     responses:
 *       200:
 *         description: The requested deadline.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Deadline not found.
 *       500:
 *         description: Internal server error.
 *   put:
 *     summary: Update a deadline
 *     description: Updates an existing deadline entry for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The deadline ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Deadline updated successfully.
 *       400:
 *         description: Invalid input fields.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Deadline not found.
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a deadline
 *     description: Deletes a deadline entry for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The deadline ID.
 *     responses:
 *       200:
 *         description: Deadline deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Deadline not found.
 *       500:
 *         description: Internal server error.
 */

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const deadline = await DeadlineService.getById(id, session.user.id);
    if (!deadline) {
      return NextResponse.json({ error: "Deadline not found" }, { status: 404 });
    }

    return NextResponse.json({ data: deadline });
  } catch (error) {
    console.error("[Deadline GET API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const result = updateDeadlineSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const deadline = await DeadlineService.update(id, session.user.id, {
      ...result.data,
      dueDate: result.data.dueDate ? new Date(result.data.dueDate) : undefined,
    });
    return NextResponse.json({ data: deadline });
  } catch (error) {
    console.error("[Deadline PUT API Error]:", error);
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
    await DeadlineService.delete(id, session.user.id);
    return NextResponse.json({ message: "Deadline deleted successfully" });
  } catch (error) {
    console.error("[Deadline DELETE API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
