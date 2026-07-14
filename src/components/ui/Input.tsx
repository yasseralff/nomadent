import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Input primitive — matches §10.7 of the design spec.
 * At rest: bottom-border only (hairline, outline-variant).
 * On focus: full pill outline with primary ring.
 */
export function Input({ label, error, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={[
          "w-full bg-transparent px-4 py-2.5 text-sm text-foreground",
          "border-b border-outline-variant outline-none",
          "rounded-full transition-all duration-200",
          "placeholder:text-muted-foreground",
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

      {error && (
        <span className="text-xs text-error">{error}</span>
      )}
    </div>
  );
}
