import React from "react";
import { Button } from "@/components/ui/Button";

export function WorkHoursBar() {
  return (
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
  );
}
