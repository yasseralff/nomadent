"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deadlineFetcher } from "@/lib/fetchers/deadlineFetcher";
import type {
  CreateDeadlineInput,
  UpdateDeadlineInput,
  LogWorkHoursInput,
} from "@/server/validation/schemas";

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const deadlineKeys = {
  all: ["deadlines"] as const,
  list: (page: number, pageSize: number) =>
    ["deadlines", "list", { page, pageSize }] as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetches the list of deadlines, sorted by urgency (dueDate ASC).
 *
 * Usage:
 *   const { data, isLoading, error } = useDeadlines();
 */
export function useDeadlines(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: deadlineKeys.list(page, pageSize),
    queryFn: () => deadlineFetcher.getAll(page, pageSize),
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Creates a new deadline entry and refreshes the list.
 *
 * Usage:
 *   const { mutate, isPending } = useCreateDeadline();
 *   mutate({ title: "Visa Renewal", type: "VISA", dueDate: "2026-12-01T00:00:00Z" });
 */
export function useCreateDeadline() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDeadlineInput) => deadlineFetcher.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deadlineKeys.all });
    },
  });
}

/**
 * Updates an existing deadline by ID.
 *
 * Usage:
 *   const { mutate: updateDeadline } = useUpdateDeadline();
 *   updateDeadline({ id: "deadline-id", data: { notes: "Appointment confirmed" } });
 */
export function useUpdateDeadline() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDeadlineInput }) =>
      deadlineFetcher.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deadlineKeys.all });
    },
  });
}

/**
 * Deletes a deadline by ID and refreshes the list.
 *
 * Usage:
 *   const { mutate: deleteDeadline } = useDeleteDeadline();
 *   deleteDeadline("deadline-id-123");
 */
export function useDeleteDeadline() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deadlineFetcher.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deadlineKeys.all });
    },
  });
}

/**
 * Logs work hours against a deadline's weekly cap.
 *
 * Usage:
 *   const { mutate: logHours } = useLogWorkHours();
 *   logHours({ id: "deadline-id", data: { hours: 8 } });
 */
export function useLogWorkHours() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LogWorkHoursInput }) =>
      deadlineFetcher.logHours(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deadlineKeys.all });
    },
  });
}
