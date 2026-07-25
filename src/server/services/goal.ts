import { prisma } from "@/lib/prisma";

export class GoalService {
  static async getAll(userId: string) {
    return prisma.goal.findMany({
      where: { userId },
      include: {
        currency: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async create(userId: string, data: {
    title: string;
    description?: string;
    targetAmount: number;
    currentAmount?: number;
    currencyId?: string;
    deadline?: Date;
  }) {
    return prisma.goal.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        targetAmount: data.targetAmount,
        currentAmount: data.currentAmount ?? 0,
        currencyId: data.currencyId,
        deadline: data.deadline,
      },
      include: {
        currency: true,
      },
    });
  }

  static async update(id: string, userId: string, data: {
    title?: string;
    description?: string;
    targetAmount?: number;
    currentAmount?: number;
    currencyId?: string;
    deadline?: Date;
  }) {
    return prisma.goal.update({
      where: { id, userId },
      data,
      include: {
        currency: true,
      },
    });
  }

  static async delete(id: string, userId: string) {
    return prisma.goal.delete({
      where: { id, userId },
    });
  }
}
