import Link from "next/link";

interface AuthCardProps {
  children: React.ReactNode;
}

/**
 * AuthCard — shared glassmorphism card wrapper for login and register pages.
 * Contains the Nomadent wordmark above the form content.
 * Matches §10.5 elevation: backdrop blur + border at 10% primary opacity.
 */
export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      {/* Wordmark */}
      <Link href="/" aria-label="Back to home">
        <span
          className="text-2xl font-semibold tracking-widest uppercase text-primary hover:opacity-70 transition-opacity duration-200"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          Nomadent
        </span>
      </Link>

      {/* Glass card */}
      <div
        className="w-full rounded-3xl border border-outline-variant p-8 flex flex-col gap-6"
        style={{
          background: "color-mix(in srgb, var(--surface-container) 90%, transparent)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          boxShadow: "0 0 48px 0 color-mix(in srgb, var(--primary) 5%, transparent)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
