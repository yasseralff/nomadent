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

export interface Currency {
  id: string;
  name: string; // The currency code, e.g., "USD", "IDR"
  symbol: string;
  details: string; // Full name, e.g., "US Dollar"
}

export interface Category {
  id: string;
  name: string;
  color?: string;
  userId?: string;
}

export interface Priority {
  id: string;
  name: string; // "LOW", "MEDIUM", "HIGH"
  level: number;
  color: string;
}

export interface Status {
  id: string;
  name: string; // "TODO", "IN_PROGRESS", "DONE"
  order: number;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image?: string | null;
  /** University name — null until set in Settings/onboarding */
  university?: string | null;
  /** ISO 2-letter country code, e.g. "US", "AU". Defaults to "US". */
  country: string;
  homeCurrencyId?: string;
  homeCurrency?: Currency;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  userId: string;
  title: string;
  /** Amount in the original transaction currency */
  amount: number;
  currencyId: string;
  currency?: Currency;
  /** Amount converted to the user's home currency at time of entry */
  convertedAmount: number;
  categoryId: string;
  category?: Category;
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
  priorityId: string;
  priority?: Priority;
  statusId: string;
  status?: Status;
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
  currencyId?: string;
  currency?: Currency;
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
