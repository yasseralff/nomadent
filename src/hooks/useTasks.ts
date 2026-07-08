"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskFetcher } from "@/lib/fetchers/taskFetcher";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@/server/validation/schemas";

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const taskKeys = {
  all: ["tasks"] as const,
  list: (page: number, pageSize: number) =>
    ["tasks", "list", { page, pageSize }] as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetches the paginated list of tasks.
 *
 * Usage:
 *   const { data, isLoading, error } = useTasks();
 */
export function useTasks(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: taskKeys.list(page, pageSize),
    queryFn: () => taskFetcher.getAll(page, pageSize),
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Creates a new task and refreshes the task list.
 *
 * Usage:
 *   const { mutate, isPending } = useCreateTask();
 *   mutate({ title: "Study", priority: "HIGH" });
 */
export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTaskInput) => taskFetcher.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

/**
 * Updates a task by ID (title, description, priority, dueDate, or completed).
 *
 * Usage:
 *   const { mutate: updateTask } = useUpdateTask();
 *   updateTask({ id: "task-id", data: { priority: "HIGH" } });
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskInput }) =>
      taskFetcher.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

/**
 * Toggles the completed state of a task.
 * Convenience wrapper — prefer useUpdateTask for full edits.
 *
 * Usage:
 *   const { mutate: toggle } = useToggleTask();
 *   toggle({ id: "task-id", completed: true });
 */
export function useToggleTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      taskFetcher.toggleComplete(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

/**
 * Deletes a task by ID and refreshes the task list.
 *
 * Usage:
 *   const { mutate: deleteTask } = useDeleteTask();
 *   deleteTask("task-id-123");
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskFetcher.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

