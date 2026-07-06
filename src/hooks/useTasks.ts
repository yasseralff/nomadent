"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/taskService";
import type { CreateTaskInput } from "@/lib/validations";

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
    queryFn: () => taskService.getAll(page, pageSize),
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
    mutationFn: (data: CreateTaskInput) => taskService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

/**
 * Toggles the completed state of a task.
 *
 * Usage:
 *   const { mutate: toggle } = useToggleTask();
 *   toggle({ id: "task-id", completed: true });
 */
export function useToggleTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      taskService.toggleComplete(id, completed),
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
    mutationFn: (id: string) => taskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}
