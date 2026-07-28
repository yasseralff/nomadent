import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  /**
   * When true, renders a red asterisk (*) next to the label to indicate
   * this field is mandatory. Does not affect HTML validation — the asterisk
   * is purely a visual affordance.
   */
  required?: boolean;
  /**
   * Renders a React node inside the input container, aligned to the right.
   * Used for the show/hide password toggle (an eye icon button). The input's
   * padding-right is increased automatically to prevent text overlapping the icon.
   */
  rightIcon?: React.ReactNode;
}

/**
 * Input primitive — matches §10.7 of the design spec.
 *
 * At rest: bottom-border only (hairline, outline-variant color).
 * On focus: morphs to a full pill outline with primary ring color.
 * On error: border turns red (error color).
 *
 * Supports an optional label with a required indicator (*) and an optional
 * right-side icon slot (used for show/hide password toggle).
 *
 * Uses forwardRef so React Hook Form can attach its ref for focus management.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, required, rightIcon, className = "", ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora"
        >
          {label}
          {required && (
            <span className="text-error ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Input wrapper — relative so the rightIcon can be absolutely positioned */}
      <div className="relative">
        <input
          id={id}
          ref={ref}
          className={[
            "w-full bg-transparent py-2.5 text-sm text-foreground",
            "border-b border-outline-variant outline-none",
            "rounded-full transition-all duration-200",
            "placeholder:text-muted-foreground",
            // Add right padding when a right icon is present to prevent overlap
            rightIcon ? "pl-4 pr-10" : "px-4",
            // Focus: morphs to pill outline
            "focus:border-transparent focus:ring-1 focus:ring-primary focus:bg-surface-container",
            // Error state
            error ? "border-error focus:ring-error" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {/* Right icon slot — e.g. show/hide password toggle */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
});
