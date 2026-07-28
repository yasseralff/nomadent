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

// --- Expense -------------------------------------------------------------------

export const createExpenseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  amount: z.number().positive("Amount must be positive"),
  currencyId: z.string().min(1, "Currency ID is required"),
  /** Amount in the user's home currency at time of entry */
  convertedAmount: z.number().positive("Converted amount must be positive"),
  categoryId: z.string().min(1, "Category ID is required"),
  date: z.string().datetime({ message: "Invalid date" }),
  notes: z.string().max(500).optional(),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;

// --- Task ----------------------------------------------------------------------

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional(),
  priorityId: z.string().min(1, "Priority ID is required"),
  statusId: z.string().min(1, "Status ID is required"),
  dueDate: z.string().datetime().optional(),
});

export const updateTaskSchema = createTaskSchema
  .partial()
  .extend({ completed: z.boolean().optional() });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

// --- Goal ---------------------------------------------------------------------

export const createGoalSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional(),
  targetAmount: z.number().positive("Target amount must be positive"),
  currentAmount: z.number().min(0).default(0),
  currencyId: z.string().optional(),
  deadline: z.string().datetime().optional(),
});

export const updateGoalSchema = createGoalSchema.partial();

export type CreateGoalInput = z.infer<typeof createGoalSchema>;
export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;

// --- Deadline -----------------------------------------------------------------

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

// --- Auth ---------------------------------------------------------------------

/**
 * PASSWORD_RULES — named check functions for each password requirement.
 *
 * These are exported so PasswordStrengthMeter can import and reuse them
 * instead of duplicating the regex logic. Single source of truth for what
 * "a strong password" means in this app.
 */
export const PASSWORD_RULES = {
  minLength: (p: string) => p.length >= 8,
  hasUppercase: (p: string) => /[A-Z]/.test(p),
  hasLowercase: (p: string) => /[a-z]/.test(p),
  hasNumber: (p: string) => /[0-9]/.test(p),
  hasSpecialChar: (p: string) => /[^A-Za-z0-9]/.test(p),
} as const;

const strongPasswordSchema = z
  .string()
  .refine(PASSWORD_RULES.minLength, "Must be at least 8 characters")
  .refine(PASSWORD_RULES.hasUppercase, "Must include an uppercase letter (A-Z)")
  .refine(PASSWORD_RULES.hasLowercase, "Must include a lowercase letter (a-z)")
  .refine(PASSWORD_RULES.hasNumber, "Must include a number (0-9)")
  .refine(PASSWORD_RULES.hasSpecialChar, "Must include a special character (!@#$%...)");

/**
 * registerBaseSchema — the shared shape of the registration form.
 *
 * Kept as a plain z.object() with NO refinements so that:
 *  - .omit() can be called on it to produce registerSchema (server)
 *  - .superRefine() can be layered on top for registerFormSchema (client)
 *
 * Zod does not allow .omit() on a schema that already has refinements
 * (e.g. .superRefine()), so the base must stay refinement-free.
 */
const registerBaseSchema = z.object({
  name: z.string().min(2, "Must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  password: strongPasswordSchema,
  confirmPassword: z.string(),
});

/**
 * registerFormSchema — used by the client-side form only.
 *
 * Adds the confirmPassword-match check via superRefine.
 * This field is stripped before the payload is sent to the server.
 */
export const registerFormSchema = registerBaseSchema.superRefine(
  ({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  }
);

/**
 * registerSchema — used by the server API route.
 *
 * .omit() is called on the base schema (no refinements) — this is valid.
 * The server never sees confirmPassword; it only validates the fields it stores.
 */
export const registerSchema = registerBaseSchema.omit({ confirmPassword: true });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

/**
 * updateProfileSchema — used by PATCH /api/users/me.
 * All fields optional so the user can update only what they changed.
 */
export const updateProfileSchema = z.object({
  name: z.string().min(2, "Must be at least 2 characters").max(100).optional(),
  university: z.string().max(200).optional().nullable(),
  country: z.string().length(2, "Must be a 2-letter country code (e.g. US)").optional(),
  homeCurrencyId: z.string().optional().nullable(),
});

export type RegisterFormInput = z.infer<typeof registerFormSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
