import { prisma } from "@/lib/prisma";

export class TaskService {
  static async getAll(userId: string) {
    return prisma.task.findMany({
      where: { userId },
      include: {
        priority: true,
        status: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async create(userId: string, data: {
    title: string;
    description?: string;
    priorityId: string;
    statusId: string;
    dueDate?: Date;
    completed?: boolean;
  }) {
    return prisma.task.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        priorityId: data.priorityId,
        statusId: data.statusId,
        dueDate: data.dueDate,
        completed: data.completed ?? false,
      },
      include: {
        priority: true,
        status: true,
      },
    });
  }

  static async update(id: string, userId: string, data: {
    title?: string;
    description?: string;
    priorityId?: string;
    statusId?: string;
    dueDate?: Date;
    completed?: boolean;
  }) {
    return prisma.task.update({
      where: { id, userId },
      data,
      include: {
        priority: true,
        status: true,
      },
    });
  }

  static async delete(id: string, userId: string) {
    return prisma.task.delete({
      where: { id, userId },
    });
  }
}
