"use client";

import { PASSWORD_RULES } from "@/server/validation/schemas";

interface PasswordStrengthMeterProps {
  /** The current value of the password input, from React Hook Form's watch("password"). */
  password: string;
}

/**
 * PasswordStrengthMeter
 *
 * Shows two things below the password input on the registration form:
 *  1. A segmented strength bar (4 segments, color-coded Weak → Strong)
 *  2. A live checklist of all password requirements
 *
 * Each requirement is sourced from PASSWORD_RULES in schemas.ts — the same
 * rules the Zod schema uses server-side. This guarantees the UI feedback
 * perfectly mirrors what the server will accept.
 *
 * Strength score = number of satisfied rules (0–5).
 * The bar maps that score to 4 visual segments.
 */
export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  // Evaluate each rule against the current password value
  const ruleResults = {
    minLength: PASSWORD_RULES.minLength(password),
    hasUppercase: PASSWORD_RULES.hasUppercase(password),
    hasLowercase: PASSWORD_RULES.hasLowercase(password),
    hasNumber: PASSWORD_RULES.hasNumber(password),
    hasSpecialChar: PASSWORD_RULES.hasSpecialChar(password),
  };

  const satisfiedCount = Object.values(ruleResults).filter(Boolean).length;

  // Map satisfied count to a 0–4 strength level for the bar
  const strengthLevel = Math.min(4, satisfiedCount === 0 ? 0 : Math.ceil(satisfiedCount / 1.25));

  const strengthConfig = [
    { label: "", segmentColor: "" }, // 0 — nothing typed
    { label: "Weak", segmentColor: "bg-error" },
    { label: "Fair", segmentColor: "bg-warning" },
    { label: "Good", segmentColor: "bg-warning" },
    { label: "Strong", segmentColor: "bg-success" },
  ] as const;

  const { label: strengthLabel, segmentColor } = strengthConfig[strengthLevel];

  // Don't render anything if the user hasn't started typing
  if (!password) return null;

  return (
    <div className="flex flex-col gap-3 mt-1">
      {/* Strength Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {[1, 2, 3, 4].map((segment) => (
            <div
              key={segment}
              className={[
                "h-1 flex-1 rounded-full transition-all duration-300",
                segment <= strengthLevel ? segmentColor : "bg-outline-variant",
              ].join(" ")}
            />
          ))}
        </div>
        {strengthLabel && (
          <span
            className={[
              "text-xs font-semibold font-sora shrink-0 transition-colors duration-200",
              strengthLevel <= 1 ? "text-error" : "",
              strengthLevel === 2 || strengthLevel === 3 ? "text-warning" : "",
              strengthLevel === 4 ? "text-success" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {strengthLabel}
          </span>
        )}
      </div>

      {/* Requirements Checklist */}
      <ul className="flex flex-col gap-1.5" aria-label="Password requirements">
        <RequirementItem met={ruleResults.minLength} label="At least 8 characters" />
        <RequirementItem met={ruleResults.hasUppercase} label="One uppercase letter (A–Z)" />
        <RequirementItem met={ruleResults.hasLowercase} label="One lowercase letter (a–z)" />
        <RequirementItem met={ruleResults.hasNumber} label="One number (0–9)" />
        <RequirementItem met={ruleResults.hasSpecialChar} label="One special character (!@#$%...)" />
      </ul>
    </div>
  );
}

interface RequirementItemProps {
  met: boolean;
  label: string;
}

function RequirementItem({ met, label }: RequirementItemProps) {
  return (
    <li className="flex items-center gap-2">
      {/* Icon: green tick when met, muted dot when not */}
      <span
        className={[
          "flex items-center justify-center size-4 rounded-full text-[10px] font-bold transition-all duration-200 shrink-0",
          met ? "bg-success/20 text-success" : "bg-outline-variant/30 text-muted-foreground",
        ].join(" ")}
        aria-hidden="true"
      >
        {met ? "✓" : "·"}
      </span>
      <span
        className={[
          "text-xs transition-colors duration-200",
          met ? "text-success" : "text-muted-foreground",
        ].join(" ")}
      >
        {label}
      </span>
    </li>
  );
}
