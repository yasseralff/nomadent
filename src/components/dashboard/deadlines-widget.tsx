import React from "react";
import { AlertTriangle, CalendarClock } from "lucide-react";

export function DeadlinesWidget() {
  return (
    <div className="bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-on-surface font-sora">Deadlines</h2>
        <span className="text-[10px] bg-error/10 text-error px-2 py-0.5 rounded-full font-sora font-semibold">
          1 Critical
        </span>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/40">
          <div className="size-8 rounded-full border-2 border-error flex items-center justify-center text-error">
            <AlertTriangle size={14} />
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface leading-tight font-sans">F-1 Visa Extension</p>
            <p className="text-xs text-error leading-tight mt-0.5 font-sans">Due in 45 days • Aug 27</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/40">
          <div className="size-8 rounded-full border-2 border-warning flex items-center justify-center text-warning">
            <CalendarClock size={14} />
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface leading-tight font-sans">Insurance Renewal</p>
            <p className="text-xs text-warning leading-tight mt-0.5 font-sans">Due in 75 days • Sep 26</p>
          </div>
        </div>
      </div>
    </div>
  );
}
