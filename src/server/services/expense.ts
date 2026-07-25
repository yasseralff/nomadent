import { prisma } from "@/lib/prisma";

export class ExpenseService {
  static async getAll(userId: string) {
    return prisma.expense.findMany({
      where: { userId },
      include: {
        currency: true,
        category: true,
      },
      orderBy: { date: "desc" },
    });
  }

  static async create(userId: string, data: {
    title: string;
    amount: number;
    currencyId: string;
    categoryId: string;
    date: Date;
    notes?: string;
    convertedAmount: number;
  }) {
    return prisma.expense.create({
      data: {
        userId,
        title: data.title,
        amount: data.amount,
        currencyId: data.currencyId,
        categoryId: data.categoryId,
        date: data.date,
        notes: data.notes,
        convertedAmount: data.convertedAmount,
      },
      include: {
        currency: true,
        category: true,
      },
    });
  }

  static async update(id: string, userId: string, data: {
    title?: string;
    amount?: number;
    currencyId?: string;
    categoryId?: string;
    date?: Date;
    notes?: string;
    convertedAmount?: number;
  }) {
    return prisma.expense.update({
      where: { id, userId },
      data,
      include: {
        currency: true,
        category: true,
      },
    });
  }

  static async delete(id: string, userId: string) {
    return prisma.expense.delete({
      where: { id, userId },
    });
  }
}
