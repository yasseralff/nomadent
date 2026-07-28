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

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

interface NavLinkItemProps {
  href: string;
  label: string;
  iconName: string;
  isActive: boolean;
  onClick?: () => void;
}

/**
 * NavLinkItem — a single navigation link in the sidebar.
 *
 * Renders the icon, label, and an active indicator bar.
 * Extracted to avoid the duplicated ~30-line JSX block that existed
 * before (the settings link at the bottom used the exact same markup).
 */
function NavLinkItem({ href, label, iconName, isActive, onClick }: NavLinkItemProps) {
  const Icon = ICON_MAP[iconName];

  return (
    <Link
      href={href}
      title={label}
      onClick={onClick}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-surface-container-high active:bg-surface-container-highest hover:text-primary ${
        isActive ? "text-primary bg-surface-container-high/40" : "text-on-surface-variant"
      }`}
    >
      {/* Active indicator — vertical bar on the left edge */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary" />
      )}

      {Icon && (
        <Icon
          size={18}
          strokeWidth={isActive ? 2.5 : 1.75}
          className="shrink-0 transition-colors"
        />
      )}

      <span className="text-sm font-medium whitespace-nowrap transition-colors font-sora">
        {label}
      </span>
    </Link>
  );
}

export function Sidebar({ className = "", onClose }: SidebarProps) {
  const pathname = usePathname();

  // Split settings out so it renders pinned at the bottom, separate from main nav
  const mainLinks = NAV_LINKS.filter((link) => link.href !== "/settings");
  const settingsLink = NAV_LINKS.find((link) => link.href === "/settings");

  const isLinkActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className={`sidebar-glass flex flex-col justify-between gap-1 rounded-2xl border border-outline-variant p-3 ${className}`}
    >
      <div className="flex flex-col gap-1">
        {/* Wordmark + mobile close button */}
        <div className="px-2 pb-3 pt-1 border-b border-outline-variant mb-1 flex items-center justify-between">
          <span className="text-[13px] font-semibold tracking-widest uppercase text-primary font-sora">
            Nomadent
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-xs text-muted-foreground hover:text-foreground font-sora cursor-pointer"
            >
              Close
            </button>
          )}
        </div>

        {/* Main nav links */}
        {mainLinks.map(({ href, label, icon }) => (
          <NavLinkItem
            key={href}
            href={href}
            label={label}
            iconName={icon}
            isActive={isLinkActive(href)}
            onClick={onClose}
          />
        ))}
      </div>

      {/* Settings — pinned at the bottom */}
      {settingsLink && (
        <NavLinkItem
          href={settingsLink.href}
          label={settingsLink.label}
          iconName={settingsLink.icon}
          isActive={isLinkActive(settingsLink.href)}
          onClick={onClose}
        />
      )}
    </aside>
  );
}