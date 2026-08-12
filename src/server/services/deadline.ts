import { prisma } from "@/lib/prisma";
import type { DeadlineType } from "@prisma/client";

export class DeadlineService {
  static async getAll(userId: string, page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.deadline.findMany({
        where: { userId },
        orderBy: { dueDate: "asc" },
        skip,
        take: pageSize,
      }),
      prisma.deadline.count({ where: { userId } }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async getById(id: string, userId: string) {
    return prisma.deadline.findFirst({
      where: { id, userId },
    });
  }

  static async create(userId: string, data: {
    title: string;
    type: DeadlineType;
    dueDate: Date;
    notes?: string;
    workHourCap?: number;
  }) {
    return prisma.deadline.create({
      data: {
        userId,
        title: data.title,
        type: data.type,
        dueDate: data.dueDate,
        notes: data.notes,
        workHourCap: data.workHourCap,
      },
    });
  }

  static async update(id: string, userId: string, data: {
    title?: string;
    type?: DeadlineType;
    dueDate?: Date;
    notes?: string;
    workHourCap?: number;
  }) {
    return prisma.deadline.update({
      where: { id, userId },
      data,
    });
  }

  static async delete(id: string, userId: string) {
    return prisma.deadline.delete({
      where: { id, userId },
    });
  }
}
