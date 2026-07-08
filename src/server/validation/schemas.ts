/**
 * Zod schemas — single source of truth for validation.
 *
 * Imported by:
 *  - Client forms (React Hook Form + zodResolver)
 *  - Server route handlers (validate request body before Prisma)
 *
 * Never import Prisma or Next.js server APIs here — this file must be
 * importable from both environments.
 */
import { z } from "zod";

// ─── Expense ──────────────────────────────────────────────────────────────────

export const createExpenseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  amount: z.number().positive("Amount must be positive"),
  /** ISO 4217 currency code of the transaction */
  currency: z.string().length(3, "Currency must be a 3-letter ISO code"),
  /** Amount in the user's home currency at time of entry */
  convertedAmount: z.number().positive("Converted amount must be positive"),
  category: z.string().min(1, "Category is required"),
  date: z.string().datetime({ message: "Invalid date" }),
  notes: z.string().max(500).optional(),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;

// ─── Task ─────────────────────────────────────────────────────────────────────

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z.string().datetime().optional(),
});

export const updateTaskSchema = createTaskSchema
  .partial()
  .extend({ completed: z.boolean().optional() });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

// ─── Goal ─────────────────────────────────────────────────────────────────────

export const createGoalSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional(),
  targetAmount: z.number().positive("Target amount must be positive"),
  currentAmount: z.number().min(0).default(0),
  /** ISO 4217 currency code for this goal */
  currency: z.string().length(3, "Currency must be a 3-letter ISO code").optional(),
  deadline: z.string().datetime().optional(),
});

export const updateGoalSchema = createGoalSchema.partial();

export type CreateGoalInput = z.infer<typeof createGoalSchema>;
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;

// ─── Deadline ─────────────────────────────────────────────────────────────────

export const deadlineTypeSchema = z.enum([
  "VISA",
  "INSURANCE",
  "BIOMETRICS",
  "OPT_CPT",
  "DOCUMENT",
  "OTHER",
]);

export const createDeadlineSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  type: deadlineTypeSchema,
  dueDate: z.string().datetime({ message: "Invalid date" }),
  notes: z.string().max(1000).optional(),
  /** Weekly work-hour cap (only for VISA / OPT_CPT types) */
  workHourCap: z.number().int().positive().optional(),
});

export const updateDeadlineSchema = createDeadlineSchema.partial();

export const logWorkHoursSchema = z.object({
  hours: z
    .number()
    .positive("Hours must be positive")
    .max(168, "Cannot log more than 168 hours in a week"),
});

export type CreateDeadlineInput = z.infer<typeof createDeadlineSchema>;
export type UpdateDeadlineInput = z.infer<typeof updateDeadlineSchema>;
export type LogWorkHoursInput = z.infer<typeof logWorkHoursSchema>;

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
