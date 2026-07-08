import api from "@/lib/api";
import type { Task, ApiResponse, PaginatedResponse } from "@/types";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@/server/validation/schemas";

/**
 * Client-side HTTP fetchers for the /api/tasks endpoints.
 * Called exclusively from TanStack Query hooks — never from components directly.
 */
export const taskFetcher = {
  /**
   * Fetch a paginated list of the current user's tasks.
   */
  getAll: (page = 1, pageSize = 10): Promise<PaginatedResponse<Task>> =>
    api.get("/tasks", { params: { page, pageSize } }).then((r) => r.data),

  /**
   * Create a new task.
   */
  create: (data: CreateTaskInput): Promise<ApiResponse<Task>> =>
    api.post("/tasks", data).then((r) => r.data),

  /**
   * Update an existing task by ID (including toggling completion).
   */
  update: (id: string, data: UpdateTaskInput): Promise<ApiResponse<Task>> =>
    api.put(`/tasks/${id}`, data).then((r) => r.data),

  /**
   * Toggle the completed state of a task.
   * Convenience wrapper around update() for quick-complete toggles.
   */
  toggleComplete: (id: string, completed: boolean): Promise<ApiResponse<Task>> =>
    api.patch(`/tasks/${id}`, { completed }).then((r) => r.data),

  /**
   * Delete a task by ID.
   */
  delete: (id: string): Promise<ApiResponse<void>> =>
    api.delete(`/tasks/${id}`).then((r) => r.data),
};
