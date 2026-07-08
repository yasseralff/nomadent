import { describe, it, expect } from "vitest";
import {
  createExpenseSchema,
  updateExpenseSchema,
  createTaskSchema,
  updateTaskSchema,
  createGoalSchema,
  updateGoalSchema,
  createDeadlineSchema,
  logWorkHoursSchema,
  registerSchema,
  loginSchema,
} from "@/server/validation/schemas";

// ─── createExpenseSchema ──────────────────────────────────────────────────────

describe("createExpenseSchema", () => {
  const validExpense = {
    title: "Grocery run",
    amount: 45.5,
    currency: "GBP",
    convertedAmount: 57.3,
    category: "Food & Groceries",
    date: new Date().toISOString(),
  };

  it("accepts valid input", () => {
    expect(createExpenseSchema.safeParse(validExpense).success).toBe(true);
  });

  it("rejects missing currency", () => {
    const { currency: _, ...rest } = validExpense;
    expect(createExpenseSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects negative amount", () => {
    expect(
      createExpenseSchema.safeParse({ ...validExpense, amount: -10 }).success
    ).toBe(false);
  });

  it("rejects currency that is not 3 characters", () => {
    expect(
      createExpenseSchema.safeParse({ ...validExpense, currency: "GBPX" }).success
    ).toBe(false);
  });

  it("accepts optional notes", () => {
    expect(
      createExpenseSchema.safeParse({ ...validExpense, notes: "Tesco run" }).success
    ).toBe(true);
  });
});

// ─── updateExpenseSchema ──────────────────────────────────────────────────────

describe("updateExpenseSchema", () => {
  it("accepts partial updates (title only)", () => {
    expect(updateExpenseSchema.safeParse({ title: "Updated" }).success).toBe(true);
  });

  it("accepts empty object (no-op update)", () => {
    expect(updateExpenseSchema.safeParse({}).success).toBe(true);
  });
});

// ─── createTaskSchema ─────────────────────────────────────────────────────────

describe("createTaskSchema", () => {
  const validTask = { title: "Finish assignment", priority: "HIGH" as const };

  it("accepts valid input", () => {
    expect(createTaskSchema.safeParse(validTask).success).toBe(true);
  });

  it("rejects empty title", () => {
    expect(createTaskSchema.safeParse({ ...validTask, title: "" }).success).toBe(false);
  });

  it("rejects invalid priority", () => {
    expect(
      createTaskSchema.safeParse({ ...validTask, priority: "URGENT" }).success
    ).toBe(false);
  });
});

// ─── createGoalSchema ─────────────────────────────────────────────────────────

describe("createGoalSchema", () => {
  const validGoal = {
    title: "Emergency fund",
    targetAmount: 5000,
    currentAmount: 0,
  };

  it("accepts valid input", () => {
    expect(createGoalSchema.safeParse(validGoal).success).toBe(true);
  });

  it("accepts optional currency", () => {
    expect(
      createGoalSchema.safeParse({ ...validGoal, currency: "USD" }).success
    ).toBe(true);
  });

  it("rejects negative targetAmount", () => {
    expect(
      createGoalSchema.safeParse({ ...validGoal, targetAmount: -100 }).success
    ).toBe(false);
  });

  it("rejects currentAmount below 0", () => {
    expect(
      createGoalSchema.safeParse({ ...validGoal, currentAmount: -1 }).success
    ).toBe(false);
  });
});

// ─── createDeadlineSchema ─────────────────────────────────────────────────────

describe("createDeadlineSchema", () => {
  const validDeadline = {
    title: "Visa renewal",
    type: "VISA" as const,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  it("accepts valid input", () => {
    expect(createDeadlineSchema.safeParse(validDeadline).success).toBe(true);
  });

  it("rejects invalid type", () => {
    expect(
      createDeadlineSchema.safeParse({ ...validDeadline, type: "PASSPORT" }).success
    ).toBe(false);
  });

  it("rejects non-datetime dueDate", () => {
    expect(
      createDeadlineSchema.safeParse({ ...validDeadline, dueDate: "not-a-date" }).success
    ).toBe(false);
  });

  it("accepts optional workHourCap", () => {
    expect(
      createDeadlineSchema.safeParse({ ...validDeadline, workHourCap: 20 }).success
    ).toBe(true);
  });
});

// ─── logWorkHoursSchema ───────────────────────────────────────────────────────

describe("logWorkHoursSchema", () => {
  it("accepts valid hours", () => {
    expect(logWorkHoursSchema.safeParse({ hours: 8 }).success).toBe(true);
  });

  it("rejects negative hours", () => {
    expect(logWorkHoursSchema.safeParse({ hours: -1 }).success).toBe(false);
  });

  it("rejects more than 168 hours", () => {
    expect(logWorkHoursSchema.safeParse({ hours: 200 }).success).toBe(false);
  });
});

// ─── registerSchema ───────────────────────────────────────────────────────────

describe("registerSchema", () => {
  const validUser = {
    name: "Yasser Al-Faisal",
    email: "yasser@example.com",
    password: "securepass123",
  };

  it("accepts valid registration", () => {
    expect(registerSchema.safeParse(validUser).success).toBe(true);
  });

  it("rejects short password", () => {
    expect(registerSchema.safeParse({ ...validUser, password: "short" }).success).toBe(false);
  });

  it("rejects invalid email", () => {
    expect(registerSchema.safeParse({ ...validUser, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects short name", () => {
    expect(registerSchema.safeParse({ ...validUser, name: "A" }).success).toBe(false);
  });
});

// ─── loginSchema ──────────────────────────────────────────────────────────────

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    expect(
      loginSchema.safeParse({ email: "test@example.com", password: "pass" }).success
    ).toBe(true);
  });

  it("rejects empty password", () => {
    expect(
      loginSchema.safeParse({ email: "test@example.com", password: "" }).success
    ).toBe(false);
  });
});
