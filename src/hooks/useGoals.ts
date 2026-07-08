"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { goalFetcher } from "@/lib/fetchers/goalFetcher";
import type {
  CreateGoalInput,
  UpdateGoalInput,
} from "@/server/validation/schemas";

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const goalKeys = {
  all: ["goals"] as const,
  list: (page: number, pageSize: number) =>
    ["goals", "list", { page, pageSize }] as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetches the paginated list of goals.
 *
 * Usage:
 *   const { data, isLoading, error } = useGoals();
 */
export function useGoals(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: goalKeys.list(page, pageSize),
    queryFn: () => goalFetcher.getAll(page, pageSize),
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Creates a new goal and refreshes the goal list.
 *
 * Usage:
 *   const { mutate, isPending } = useCreateGoal();
 *   mutate({ title: "New Laptop", targetAmount: 1500, currentAmount: 0 });
 */
export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateGoalInput) => goalFetcher.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

/**
 * Updates an existing goal by ID.
 *
 * Usage:
 *   const { mutate: updateGoal } = useUpdateGoal();
 *   updateGoal({ id: "goal-id", data: { title: "Updated Goal" } });
 */
export function useUpdateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGoalInput }) =>
      goalFetcher.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

/**
 * Adds a contribution to a goal's progress.
 *
 * Usage:
 *   const { mutate: contribute } = useContributeGoal();
 *   contribute({ id: "goal-id", amount: 200 });
 */
export function useContributeGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      goalFetcher.contribute(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

/**
 * Deletes a goal by ID and refreshes the goal list.
 *
 * Usage:
 *   const { mutate: deleteGoal } = useDeleteGoal();
 *   deleteGoal("goal-id-123");
 */
export function useDeleteGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => goalFetcher.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.all });
    },
  });
}

