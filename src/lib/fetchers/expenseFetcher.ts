import api from "@/lib/api";
import type { Expense, ApiResponse, PaginatedResponse } from "@/types";
import type {
  CreateExpenseInput,
  UpdateExpenseInput,
} from "@/server/validation/schemas";

/**
 * Client-side HTTP fetchers for the /api/expenses endpoints.
 * Called exclusively from TanStack Query hooks — never from components directly.
 */
export const expenseFetcher = {
  /**
   * Fetch a paginated list of the current user's expenses.
   */
  getAll: (page = 1, pageSize = 10): Promise<PaginatedResponse<Expense>> =>
    api.get("/expenses", { params: { page, pageSize } }).then((r) => r.data),

  /**
   * Create a new expense.
   */
  create: (data: CreateExpenseInput): Promise<ApiResponse<Expense>> =>
    api.post("/expenses", data).then((r) => r.data),

  /**
   * Update an existing expense by ID.
   */
  update: (id: string, data: UpdateExpenseInput): Promise<ApiResponse<Expense>> =>
    api.put(`/expenses/${id}`, data).then((r) => r.data),

  /**
   * Delete an expense by ID.
   */
  delete: (id: string): Promise<ApiResponse<void>> =>
    api.delete(`/expenses/${id}`).then((r) => r.data),
};
