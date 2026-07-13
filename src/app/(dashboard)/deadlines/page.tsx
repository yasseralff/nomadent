"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeadlineCard } from "@/components/deadlines/deadline-card";
import { WorkHoursBar } from "@/components/deadlines/work-hours-bar";

export default function DeadlinesPage() {
  const mockDeadlines = [
    { id: 1, title: "F-1 Visa Extension", date: "2026-08-27", daysLeft: 45, category: "VISA", urgency: "CRITICAL" },
    { id: 2, title: "Health Insurance Renewal", date: "2026-09-26", daysLeft: 75, category: "INSURANCE", urgency: "WARNING" },
    { id: 3, title: "Biometrics Appointment", date: "2026-07-28", daysLeft: 15, category: "BIOMETRICS", urgency: "CRITICAL" },
    { id: 4, title: "CPT Employment Contract Review", date: "2026-08-15", daysLeft: 33, category: "OPT_CPT", urgency: "WARNING" }
  ];

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

      {/* Main Grid defined at page level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockDeadlines.map((deadline) => (
          <DeadlineCard key={deadline.id} deadline={deadline} />
        ))}
      </div>

      <WorkHoursBar />
    </div>
  );
}
