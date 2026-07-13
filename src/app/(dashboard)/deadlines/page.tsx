"use client";

import React from "react";
import { CalendarClock, Plus, AlertTriangle, ShieldCheck, FileText, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeadlinesPage() {
  const mockDeadlines = [
    { id: 1, title: "F-1 Visa Extension", date: "2026-08-27", daysLeft: 45, category: "VISA", urgency: "CRITICAL" },
    { id: 2, title: "Health Insurance Renewal", date: "2026-09-26", daysLeft: 75, category: "INSURANCE", urgency: "WARNING" },
    { id: 3, title: "Biometrics Appointment", date: "2026-07-28", daysLeft: 15, category: "BIOMETRICS", urgency: "CRITICAL" },
    { id: 4, title: "CPT Employment Contract Review", date: "2026-08-15", daysLeft: 33, category: "OPT_CPT", urgency: "WARNING" }
  ];

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
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-on-surface font-sora tracking-tight">Deadlines</h1>
          <p className="text-sm text-on-surface-variant font-sans">
            Visa, insurance, and immigration dates — the ones that actually matter.
          </p>
        </div>
        
        <Button
          onClick={() => console.log("add deadline clicked")}
          size="md"
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Add Deadline</span>
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockDeadlines.map((deadline) => (
          <div
            key={deadline.id}
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
        ))}
      </div>

      {/* Part-Time Work Hours Cap Section */}
      <div className="bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold text-on-surface font-sora">Work Hours Tracker</h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-sans">Monitor weekly hours worked against your visa cap (20 hours/week)</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-sm font-semibold mb-1 font-sora">
              <span className="text-on-surface">Weekly Hours Logged</span>
              <span className="text-primary">12.5 / 20 hours</span>
            </div>
            <div className="w-full bg-outline-variant h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "62.5%" }} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => console.log("log work hours")}
              variant="ghost"
              size="sm"
            >
              Log Work Hours
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
