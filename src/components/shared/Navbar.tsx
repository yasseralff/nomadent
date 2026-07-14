"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, LogOut, User, Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Initialize theme from document attribute or localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <header className="sidebar-glass rounded-2xl border border-outline-variant px-6 py-3 flex items-center justify-between w-full select-none">
      {/* Title / Current Page context */}
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
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-semibold tracking-wider text-muted-foreground uppercase font-sora">
            Workspace
          </span>
          {/* <span className="text-muted-foreground text-xs md:text-sm">/</span>
          <span className="text-xs md:text-sm font-medium text-on-surface font-sans">
            Overview
          </span> */}
        </div>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-xl border border-outline-variant hover:bg-surface-container-high transition-all text-on-surface hover:text-primary cursor-pointer active:scale-95"
        >
          {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Vertical divider */}
        <span className="h-6 w-px bg-outline-variant" />

        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-surface-container-high transition-all active:scale-98"
          >
            {/* Avatar Circle */}
            <div className="size-8 rounded-full bg-primary text-primary-foreground font-semibold font-sora flex items-center justify-center text-sm shadow-inner">
              YA
            </div>
            
            <div className="hidden md:flex flex-col items-start text-left">
              <span className="text-sm font-semibold text-on-surface leading-tight font-sans">
                Yasser Alff
              </span>
              <span className="text-xs text-muted-foreground leading-tight font-sans">
                yasser@university.edu
              </span>
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-outline-variant bg-surface-container-highest p-1.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-outline-variant mb-1 font-sora">
                  User Account
                </div>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    console.log("navigate to profile settings");
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-on-surface hover:bg-surface-container-high transition-all cursor-pointer font-sans"
                >
                  <User size={16} />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    console.log("logout triggered");
                  }}
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
