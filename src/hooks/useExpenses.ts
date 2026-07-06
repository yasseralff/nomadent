"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { expenseService } from "@/services/expenseService";
import type { CreateExpenseInput } from "@/lib/validations";

// ─── Query Keys ───────────────────────────────────────────────────────────────
// Centralising query keys prevents typos and makes invalidation predictable.
export const expenseKeys = {
  all: ["expenses"] as const,
  list: (page: number, pageSize: number) =>
    ["expenses", "list", { page, pageSize }] as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetches the paginated list of expenses.
 *
 * Usage:
 *   const { data, isLoading, error } = useExpenses();
 */
export function useExpenses(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: expenseKeys.list(page, pageSize),
    queryFn: () => expenseService.getAll(page, pageSize),
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Creates a new expense and automatically refreshes the expense list.
 *
 * Usage:
 *   const { mutate, isPending } = useCreateExpense();
 *   mutate({ title: "Lunch", amount: 12, category: "Food", date: "..." });
 */
export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExpenseInput) => expenseService.create(data),
    onSuccess: () => {
      // Invalidate all expense queries so the list auto-refreshes
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}

/**
 * Deletes an expense by ID and automatically refreshes the expense list.
 *
 * Usage:
 *   const { mutate: deleteExpense } = useDeleteExpense();
 *   deleteExpense("expense-id-123");
 */
export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => expenseService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}
