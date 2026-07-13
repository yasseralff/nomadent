import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Link
        href="/dashboard"
        className="group flex flex-col items-center gap-3 select-none"
        aria-label="Go to dashboard"
      >
        {/* Wordmark */}
        <span
          className="text-4xl font-semibold tracking-widest uppercase text-primary transition-opacity duration-300 group-hover:opacity-70 font-sora"
        >
          Nomadent
        </span>

        {/* Subtle hint */}
        <span className="text-xs tracking-wider uppercase text-muted-foreground opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-60 group-hover:translate-y-0">
          Open dashboard →
        </span>
      </Link>
    </div>
  );
}
