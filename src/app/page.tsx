import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Landing Page Navigation Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
        <Link href="/" className="flex items-center gap-2 select-none group">
          <span className="text-xl font-semibold tracking-wider text-primary font-sora transition-opacity group-hover:opacity-80">
            Nomadent
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Sign up
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center">
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
      </main>
    </div>
  );
}
