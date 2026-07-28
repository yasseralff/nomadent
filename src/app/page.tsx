"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { LogOut, LayoutDashboard } from "lucide-react";

/**
 * Landing page — the public root ("/").
 *
 * Header adapts based on auth state:
 *  - Unauthenticated: Sign in + Sign up buttons
 *  - Authenticated: avatar initials + "Go to Dashboard" + Sign out
 */
export default function Home() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const userName = session?.user?.name ?? null;
  const userImage = session?.user?.image ?? null;

  // Derive 2-letter initials from name (e.g. "Yasser Alff" → "YA")
  const initials = userName
    ? userName
        .trim()
        .split(/\s+/)
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
        <Link href="/" className="flex items-center gap-2 select-none group">
          <span className="text-xl font-semibold tracking-wider text-primary font-sora transition-opacity group-hover:opacity-80">
            Nomadent
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Mini avatar */}
              <div className="flex items-center gap-2.5">
                {userImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={userImage}
                    alt={userName ?? "Avatar"}
                    className="size-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold font-sora">
                    {initials}
                  </div>
                )}
                <span className="hidden sm:block text-sm font-medium text-on-surface">
                  {userName}
                </span>
              </div>

              <Link href="/dashboard">
                <Button variant="primary" size="sm">
                  <LayoutDashboard size={14} />
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut size={14} />
                Sign out
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center">
        <Link
          href={isAuthenticated ? "/dashboard" : "/register"}
          className="group flex flex-col items-center gap-3 select-none"
          aria-label={isAuthenticated ? "Go to dashboard" : "Get started"}
        >
          <span className="text-4xl font-semibold tracking-widest uppercase text-primary transition-opacity duration-300 group-hover:opacity-70 font-sora">
            Nomadent
          </span>
          <span className="text-xs tracking-wider uppercase text-muted-foreground opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-60 group-hover:translate-y-0">
            {isAuthenticated ? "Open dashboard →" : "Get started →"}
          </span>
        </Link>
      </main>
    </div>
  );
}
