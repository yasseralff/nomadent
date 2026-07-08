// ─── Enums & Unions ───────────────────────────────────────────────────────────

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type DeadlineType =
  | "VISA"
  | "INSURANCE"
  | "BIOMETRICS"
  | "OPT_CPT"
  | "DOCUMENT"
  | "OTHER";

// ─── Core Entity Types ────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  /** ISO 4217 code for the user's home currency (used for converted amounts) */
  homeCurrency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  userId: string;
  title: string;
  /** Amount in the original transaction currency */
  amount: number;
  /** ISO 4217 currency code of the original transaction (e.g. "USD", "EUR") */
  currency: string;
  /** Amount converted to the user's home currency at time of entry */
  convertedAmount: number;
  category: string;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  /** ISO 4217 currency code for this goal (e.g. saving in home vs local currency) */
  currency?: string;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * A time-sensitive entry with immigration/legal consequences.
 * Modeled as a distinct entity from generic Tasks — urgency treatment differs.
 */
export interface Deadline {
  id: string;
  userId: string;
  title: string;
  type: DeadlineType;
  dueDate: Date;
  notes?: string;
  /** Weekly work-hour cap imposed by visa (only relevant for work-authorisation deadlines) */
  workHourCap?: number;
  /** Total work hours logged this week against the cap */
  workHoursLogged?: number;
  /** Days at which reminders have already fired (e.g. [30, 14]) */
  remindersSent: number[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
