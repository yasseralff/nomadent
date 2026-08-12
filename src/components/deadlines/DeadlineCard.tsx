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

  const urgencyClasses: Record<Urgency, string> = {
    CRITICAL: "border-error text-error bg-error/5",
    WARNING: "border-warning text-warning bg-warning/5",
    CALM: "border-outline-variant text-on-surface-variant",
  };

  const ringClasses: Record<Urgency, string> = {
    CRITICAL: "border-error",
    WARNING: "border-warning",
    CALM: "border-outline",
  };

  const typeLabel =
    DEADLINE_TYPES.find((t) => t.value === deadline.type)?.label ?? deadline.type;

  return (
    <div
      className={`border rounded-3xl p-6 flex items-start gap-4 transition-all hover:shadow-lg bg-surface-container ${urgencyClasses[urgency]}`}
    >
      <div className="relative shrink-0">
        <div
          className={`size-12 rounded-full border-2 flex items-center justify-center ${ringClasses[urgency]}`}
        >
          {TYPE_ICONS[deadline.type] ?? <CalendarClock size={18} />}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider font-sora px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant">
            {typeLabel}
          </span>
          <span className="text-xs font-semibold font-sora" suppressHydrationWarning>
            {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
          </span>
        </div>
        <h3 className="text-base font-bold text-on-surface mt-2 font-sans truncate">
          {deadline.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 font-sans">
          Due: {formatDate(deadline.dueDate)}
        </p>
        {deadline.notes && (
          <p className="text-xs text-muted-foreground mt-1.5 font-sans truncate">
            {deadline.notes}
          </p>
        )}
        {deadline.workHourCap && (
          <p className="text-xs text-on-surface-variant mt-1.5 font-sans">
            Work cap: {deadline.workHourCap}h
          </p>
        )}
      </div>
    </div>
  );
}
