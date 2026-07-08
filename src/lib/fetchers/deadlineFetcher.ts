import api from "@/lib/api";
import type { Deadline, ApiResponse, PaginatedResponse } from "@/types";
import type {
  CreateDeadlineInput,
  UpdateDeadlineInput,
  LogWorkHoursInput,
} from "@/server/validation/schemas";

/**
 * Client-side HTTP fetchers for the /api/deadlines endpoints.
 * Called exclusively from TanStack Query hooks — never from components directly.
 */
export const deadlineFetcher = {
  /**
   * Fetch all deadlines for the current user, sorted by urgency (dueDate ASC).
   */
  getAll: (page = 1, pageSize = 20): Promise<PaginatedResponse<Deadline>> =>
    api.get("/deadlines", { params: { page, pageSize } }).then((r) => r.data),

  /**
   * Create a new deadline entry.
   */
  create: (data: CreateDeadlineInput): Promise<ApiResponse<Deadline>> =>
    api.post("/deadlines", data).then((r) => r.data),

  /**
   * Update an existing deadline by ID.
   */
  update: (
    id: string,
    data: UpdateDeadlineInput
  ): Promise<ApiResponse<Deadline>> =>
    api.put(`/deadlines/${id}`, data).then((r) => r.data),

  /**
   * Delete a deadline by ID.
   */
  delete: (id: string): Promise<ApiResponse<void>> =>
    api.delete(`/deadlines/${id}`).then((r) => r.data),

  /**
   * Log work hours against a deadline's weekly cap.
   * POST /api/deadlines/:id/log-hours
   */
  logHours: (
    id: string,
    data: LogWorkHoursInput
  ): Promise<ApiResponse<Deadline>> =>
    api.post(`/deadlines/${id}/log-hours`, data).then((r) => r.data),
};
