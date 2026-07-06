import api from "@/lib/api";
import type { Goal, ApiResponse, PaginatedResponse } from "@/types";
import type { CreateGoalInput } from "@/lib/validations";

export const goalService = {
  /**
   * Fetch a paginated list of the current user's goals.
   */
  getAll: (page = 1, pageSize = 10): Promise<PaginatedResponse<Goal>> =>
    api.get("/goals", { params: { page, pageSize } }).then((r) => r.data),

  /**
   * Create a new goal.
   */
  create: (data: CreateGoalInput): Promise<ApiResponse<Goal>> =>
    api.post("/goals", data).then((r) => r.data),

  /**
   * Add a contribution amount to a goal's current progress.
   */
  contribute: (id: string, amount: number): Promise<ApiResponse<Goal>> =>
    api.patch(`/goals/${id}/contribute`, { amount }).then((r) => r.data),

  /**
   * Delete a goal by ID.
   */
  delete: (id: string): Promise<ApiResponse<void>> =>
    api.delete(`/goals/${id}`).then((r) => r.data),
};
