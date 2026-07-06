// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Expenses", href: "/expenses", icon: "Wallet" },
  { label: "Tasks", href: "/tasks", icon: "CheckSquare" },
  { label: "Goals", href: "/goals", icon: "Target" },
  { label: "Settings", href: "/settings", icon: "Settings" },
] as const;

// ─── Expense Categories ───────────────────────────────────────────────────────

export const EXPENSE_CATEGORIES = [
  "Food & Drinks",
  "Transport",
  "Housing",
  "Education",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Travel",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

// ─── Task Priorities ──────────────────────────────────────────────────────────

export const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;

export const TASK_PRIORITY_LABELS: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

// ─── Pagination ───────────────────────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 10;

// ─── App Metadata ─────────────────────────────────────────────────────────────

export const APP_NAME = "Nomadent";
export const APP_DESCRIPTION =
  "Manage your academic life, finances, goals, and daily activities — all in one place.";
