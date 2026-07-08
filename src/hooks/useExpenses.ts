"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { expenseFetcher } from "@/lib/fetchers/expenseFetcher";
import type {
  CreateExpenseInput,
  UpdateExpenseInput,
} from "@/server/validation/schemas";

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
    queryFn: () => expenseFetcher.getAll(page, pageSize),
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Creates a new expense and automatically refreshes the expense list.
 *
 * Usage:
 *   const { mutate, isPending } = useCreateExpense();
 *   mutate({ title: "Lunch", amount: 12, currency: "GBP", convertedAmount: 15, category: "Food", date: "..." });
 */
export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExpenseInput) => expenseFetcher.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}

/**
 * Updates an existing expense by ID.
 *
 * Usage:
 *   const { mutate: updateExpense } = useUpdateExpense();
 *   updateExpense({ id: "expense-id", data: { title: "Updated" } });
 */
export function useUpdateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExpenseInput }) =>
      expenseFetcher.update(id, data),
    onSuccess: () => {
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
    mutationFn: (id: string) => expenseFetcher.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });
}


