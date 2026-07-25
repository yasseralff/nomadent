import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * Button primitive — matches §10.7 of the design spec.
 * Variants: primary (pill, solid fill) | ghost (pill outline).
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "cursor-pointer",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40";

  const sizes: Record<string, string> = {
    sm: "h-8 px-4 text-xs",
    md: "h-10 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-85 active:scale-[0.97]",
    ghost:
      "border border-outline-variant text-foreground hover:bg-surface-container hover:border-outline active:scale-[0.97]",
  };

  return (
    <button
      disabled={disabled}
      className={[
        base,
        sizes[size],
        variants[variant],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
