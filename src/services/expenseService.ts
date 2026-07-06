import api from "@/lib/api";
import type { Expense, ApiResponse, PaginatedResponse } from "@/types";
import type { CreateExpenseInput } from "@/lib/validations";

export const expenseService = {
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
   * Delete an expense by ID.
   */
  delete: (id: string): Promise<ApiResponse<void>> =>
    api.delete(`/expenses/${id}`).then((r) => r.data),
};
