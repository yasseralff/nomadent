import React from "react";
import { ShieldCheck, FileText, UserCheck, CalendarClock } from "lucide-react";

interface DeadlineCardProps {
  deadline: {
    id: number;
    title: string;
    date: string;
    daysLeft: number;
    category: string;
    urgency: string;
  };
}

export function DeadlineCard({ deadline }: DeadlineCardProps) {
  const getUrgencyClasses = (urgency: string) => {
    if (urgency === "CRITICAL") {
      return "border-error text-error bg-error/5";
    }
    return "border-warning text-warning bg-warning/5";
  };

  const getDeadlineIcon = (category: string) => {
    switch (category) {
      case "VISA":
        return <UserCheck size={18} />;
      case "INSURANCE":
        return <ShieldCheck size={18} />;
      case "OPT_CPT":
        return <FileText size={18} />;
      default:
        return <CalendarClock size={18} />;
    }
  };

  return (
    <div
      className={`border rounded-3xl p-6 flex items-start gap-4 transition-all hover:shadow-lg bg-surface-container ${getUrgencyClasses(deadline.urgency)}`}
    >
      {/* Signature Urgency Ring Visualized as Fading Gradient Ring */}
      <div className="relative shrink-0">
        <div className={`size-12 rounded-full border-2 flex items-center justify-center ${deadline.urgency === "CRITICAL" ? "border-error" : "border-warning"}`}>
          {getDeadlineIcon(deadline.category)}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider font-sora px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant">
            {deadline.category}
          </span>
          <span className="text-xs font-semibold font-sora">
            {deadline.daysLeft} days left
          </span>
        </div>
        <h3 className="text-base font-bold text-on-surface mt-2 font-sans truncate">
          {deadline.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 font-sans">
          Due: {deadline.date}
        </p>
      </div>
    </div>
  );
}
