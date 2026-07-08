"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  CheckSquare,
  CalendarClock,
  Target,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { NAV_LINKS } from "@/constants";

/**
 * Maps the string icon names from constants to actual Lucide components.
 * Kept here (not in constants/) because Lucide is a React library and
 * constants should stay framework-agnostic.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Receipt,
  CheckSquare,
  CalendarClock,
  Target,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="sidebar-glass fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 rounded-2xl border border-outline-variant p-3"
    >
      {/* Wordmark */}
      <div className="px-2 pb-3 pt-1 border-b border-outline-variant mb-1">
        <span
          className="text-[13px] font-semibold tracking-widest uppercase text-primary"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          Nomadent
        </span>
      </div>

      {/* Nav links — sourced from constants/index.ts, single source of truth */}
      {NAV_LINKS.map(({ href, label, icon: iconName }) => {
        const Icon = ICON_MAP[iconName];
        const isActive = pathname === href || pathname.startsWith(href + "/");

        return (
          <Link
            key={href}
            href={href}
            title={label}
            className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
            style={{
              background: isActive ? "rgba(157,180,169,0.15)" : "transparent",
              color: isActive ? "var(--primary)" : "var(--on-surface-variant)",
            }}
          >
            {/* Active indicator bar */}
            {isActive && (
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary"
              />
            )}

            {Icon && (
              <Icon
                size={18}
                strokeWidth={isActive ? 2.5 : 1.75}
                className="shrink-0 transition-colors"
              />
            )}

            <span
              className="text-sm font-medium whitespace-nowrap transition-colors"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}