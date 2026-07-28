"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Sun, Moon, LogOut, User, Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void;
}

/**
 * Derives a 2-letter avatar initials string from a full name.
 * Examples:
 *   "Yasser Alff" → "YA"
 *   "John"        → "JO"
 *   ""            → "??"
 */
function deriveInitials(name: string | null | undefined): string {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme ?? "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut({ callbackUrl: "/login" });
  };

  const handleNavigateToSettings = () => {
    setDropdownOpen(false);
    router.push("/settings");
  };

  // Derive display values from the session — fall back gracefully if loading
  const userName = session?.user?.name ?? null;
  const userEmail = session?.user?.email ?? null;
  const userImage = session?.user?.image ?? null;
  const initials = deriveInitials(userName);

  return (
    <header className="sidebar-glass rounded-2xl border border-outline-variant px-6 py-3 flex items-center justify-between w-full select-none">
      {/* Left: mobile hamburger + workspace label */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-surface-container-high transition-all text-on-surface cursor-pointer"
          >
            <Menu size={18} />
          </button>
        )}
        <span className="text-xs md:text-sm font-semibold tracking-wider text-muted-foreground uppercase font-sora">
          Workspace
        </span>
      </div>

      {/* Right: theme toggle + profile section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-xl border border-outline-variant hover:bg-surface-container-high transition-all text-on-surface hover:text-primary cursor-pointer active:scale-95"
        >
          {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <span className="h-6 w-px bg-outline-variant" />

        {/* Profile section */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-surface-container-high transition-all active:scale-[0.98]"
            aria-label="Open profile menu"
            aria-expanded={dropdownOpen}
          >
            {/* Avatar: show Google photo if available, otherwise initials */}
            {userImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={userImage}
                alt={userName ?? "User avatar"}
                className="size-8 rounded-full object-cover"
              />
            ) : (
              <div className="size-8 rounded-full bg-primary text-primary-foreground font-semibold font-sora flex items-center justify-center text-sm shadow-inner">
                {initials}
              </div>
            )}

            <div className="hidden md:flex flex-col items-start text-left">
              <span className="text-sm font-semibold text-on-surface leading-tight font-sans">
                {userName ?? "Loading..."}
              </span>
              <span className="text-xs text-muted-foreground leading-tight font-sans">
                {userEmail ?? ""}
              </span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <>
              {/* Invisible backdrop to close dropdown on outside click */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-outline-variant bg-surface-container-highest p-1.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-outline-variant mb-1 font-sora">
                  Account
                </div>

                <button
                  id="navbar-profile-settings-btn"
                  onClick={handleNavigateToSettings}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-on-surface hover:bg-surface-container-high transition-all cursor-pointer font-sans"
                >
                  <User size={16} />
                  <span>Profile Settings</span>
                </button>

                <button
                  id="navbar-logout-btn"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-error hover:bg-error/10 transition-all cursor-pointer font-sans"
                >
                  <LogOut size={16} />
                  <span>Log out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
