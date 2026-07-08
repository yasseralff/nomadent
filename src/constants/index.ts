/**
 * Application-wide constants for Nomadent.
 * Put magic strings and configuration values here — never scatter them across components.
 */

// ─── App Metadata ─────────────────────────────────────────────────────────────

export const APP_NAME = "Nomadent";
export const APP_DESCRIPTION =
  "Manage your academic life, finances, goals, and daily activities — all in one place.";

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Expenses", href: "/expenses", icon: "Receipt" },
  { label: "Tasks", href: "/tasks", icon: "CheckSquare" },
  { label: "Deadlines", href: "/deadlines", icon: "CalendarClock" },
  { label: "Goals", href: "/goals", icon: "Target" },
  { label: "Settings", href: "/settings", icon: "Settings" },
] as const;

// ─── Expenses ─────────────────────────────────────────────────────────────────

export const EXPENSE_CATEGORIES = [
  "Food & Groceries",
  "Rent & Housing",
  "Transport",
  "Utilities",
  "Healthcare",
  "Education",
  "Entertainment",
  "Clothing",
  "Insurance",
  "Travel",
  "Personal Care",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

// ─── Currencies ───────────────────────────────────────────────────────────────

export const SUPPORTED_CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number]["code"];

// ─── Deadlines ────────────────────────────────────────────────────────────────

export const DEADLINE_TYPES = [
  { value: "VISA", label: "Visa" },
  { value: "INSURANCE", label: "Insurance" },
  { value: "BIOMETRICS", label: "Biometrics" },
  { value: "OPT_CPT", label: "OPT / CPT" },
  { value: "DOCUMENT", label: "Document Renewal" },
  { value: "OTHER", label: "Other" },
] as const;

/**
 * Days before dueDate at which reminder emails are sent (§4.6).
 */
export const DEADLINE_REMINDER_DAYS = [30, 14, 7] as const;

/**
 * Urgency thresholds for visual treatment (§10.8 signature element).
 *  <= CRITICAL → error color, full gradient ring + motion
 *  <= WARNING  → warning color, partial ring
 *  >  WARNING  → calm baseline
 */
export const DEADLINE_URGENCY = {
  CRITICAL: 7,
  WARNING: 14,
} as const;

// ─── Work Hours ───────────────────────────────────────────────────────────────

/**
 * Weekly work-hour caps by visa type.
 * International students are legally bound by these limits.
 */
export const WORK_HOUR_CAPS = {
  F1_TERM: 20,       // F-1 (US) — on-campus during term
  F1_OPT: 40,        // F-1 (US) — OPT (full-time)
  TIER4_TERM: 20,    // Student Route (UK) — during term
  TIER4_HOLIDAY: 40, // Student Route (UK) — vacation periods
  DEFAULT: 20,       // Safe fallback
} as const;

// ─── Tasks ────────────────────────────────────────────────────────────────────

export const TASK_PRIORITIES = [
  { value: "LOW", label: "Low", color: "var(--success)" },
  { value: "MEDIUM", label: "Medium", color: "var(--warning)" },
  { value: "HIGH", label: "High", color: "var(--error)" },
] as const;

export const TASK_STATUSES = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
] as const;

// ─── Pagination ───────────────────────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 10;
export const DEADLINES_PAGE_SIZE = 20;

