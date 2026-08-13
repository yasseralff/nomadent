import React, { useSyncExternalStore } from "react";
import {
  ShieldCheck,
  FileText,
  UserCheck,
  Fingerprint,
  CalendarClock,
} from "lucide-react";
import type { Deadline } from "@/types";
import { DEADLINE_TYPES, DEADLINE_URGENCY } from "@/constants";
import { formatDate } from "@/lib/utils";

type Urgency = "CRITICAL" | "WARNING" | "CALM";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  VISA: <UserCheck size={18} />,
  INSURANCE: <ShieldCheck size={18} />,
  BIOMETRICS: <Fingerprint size={18} />,
  OPT_CPT: <FileText size={18} />,
  DOCUMENT: <FileText size={18} />,
  OTHER: <CalendarClock size={18} />,
};

const emptySubscribe = () => () => {};

/**
 * Snapshot of the current epoch time, safe to read during render.
 * useSyncExternalStore is the sanctioned escape hatch for time values in React.
 */
function useNow(): number {
  return useSyncExternalStore(
    emptySubscribe,
    () => Date.now(),
    () => Date.now()
  );
}

interface DeadlineCardProps {
  deadline: Deadline;
}

/**
 * Dense list-row variant (§10.6). The urgency ring (§10.8 signature element):
 *  - CRITICAL (≤7 days): ping ring (expanding + fading sonar) + solid inner ring
 *  - WARNING  (≤14 days): pulse ring (breathing) + solid inner ring
 *  - CALM: plain static ring
 *
 * This component does NOT own its own border or background — the parent
 * container in page.tsx provides the rounded outer card and hairline dividers.
 */
export function DeadlineCard({ deadline }: DeadlineCardProps) {
  const now = useNow();
  const daysLeft = Math.ceil(
    (new Date(deadline.dueDate).getTime() - now) / (1000 * 60 * 60 * 24)
  );

  const urgency: Urgency =
    daysLeft <= DEADLINE_URGENCY.CRITICAL
      ? "CRITICAL"
      : daysLeft <= DEADLINE_URGENCY.WARNING
        ? "WARNING"
        : "CALM";

  /**
   * Row-level left-edge accent — replaces the full card bg of the spacious variant.
   * Only CRITICAL and WARNING rows get a tinted background stripe; CALM rows blend in.
   */
  const rowAccentClasses: Record<Urgency, string> = {
    CRITICAL: "border-l-2 border-l-error bg-error/[0.03]",
    WARNING:  "border-l-2 border-l-warning bg-warning/[0.03]",
    CALM:     "border-l-2 border-l-transparent",
  };

  /** Inner icon ring color */
  const ringClasses: Record<Urgency, string> = {
    CRITICAL: "border-error text-error",
    WARNING:  "border-warning text-warning",
    CALM:     "border-outline text-on-surface-variant",
  };

  /** Ping / pulse overlay ring — only shown for urgent states */
  const animatedRingClasses: Record<Urgency, string | null> = {
    CRITICAL: "border-error animate-ping",
    WARNING:  "border-warning animate-pulse",
    CALM:     null,
  };

  const typeLabel =
    DEADLINE_TYPES.find((t) => t.value === deadline.type)?.label ?? deadline.type;

  const animatedRing = animatedRingClasses[urgency];

  return (
    <div
      className={`flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface-container-high ${rowAccentClasses[urgency]}`}
    >
      {/* Urgency ring — §10.8 signature element */}
      <div className="relative shrink-0">
        {/* Animated overlay ring (ping = sonar burst, pulse = breath) */}
        {animatedRing && (
          <div
            className={`absolute inset-0 rounded-full border-2 opacity-60 ${animatedRing}`}
          />
        )}
        {/* Solid inner ring with icon */}
        <div
          className={`size-10 rounded-full border-2 flex items-center justify-center bg-surface-container ${ringClasses[urgency]}`}
        >
          {TYPE_ICONS[deadline.type] ?? <CalendarClock size={16} />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-on-surface font-sans truncate">
            {deadline.title}
          </h3>
          <span className="text-[10px] uppercase font-bold tracking-wider font-sora px-1.5 py-px rounded bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant shrink-0">
            {typeLabel}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 font-sans">
          Due: {formatDate(deadline.dueDate)}
          {deadline.notes && <span className="ml-2 opacity-60">· {deadline.notes}</span>}
        </p>
      </div>

      {/* Days-left badge — right-aligned */}
      <div className="shrink-0 text-right">
        <span
          className={`text-xs font-semibold font-sora ${
            urgency === "CRITICAL"
              ? "text-error"
              : urgency === "WARNING"
                ? "text-warning"
                : "text-on-surface-variant"
          }`}
          suppressHydrationWarning
        >
          {daysLeft > 0 ? `${daysLeft}d left` : "Overdue"}
        </span>
        {deadline.workHourCap && (
          <p className="text-[10px] text-on-surface-variant mt-0.5 font-sans">
            Cap: {deadline.workHourCap}h/wk
          </p>
        )}
      </div>
    </div>
  );
}
