import api from "@/lib/api";
import type { Task, ApiResponse, PaginatedResponse } from "@/types";
import type { CreateTaskInput } from "@/lib/validations";

export const taskService = {
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
   * Toggle the completed state of a task.
   */
  toggleComplete: (id: string, completed: boolean): Promise<ApiResponse<Task>> =>
    api.patch(`/tasks/${id}`, { completed }).then((r) => r.data),

  /**
   * Delete a task by ID.
   */
  delete: (id: string): Promise<ApiResponse<void>> =>
    api.delete(`/tasks/${id}`).then((r) => r.data),
};
