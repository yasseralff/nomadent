import React from "react";

export function PendingTasks() {
  return (
    <div className="bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-on-surface font-sora">Pending Tasks</h2>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-3 p-2 hover:bg-surface-container-high rounded-xl cursor-pointer transition-all">
          <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary size-4" defaultChecked />
          <span className="text-sm text-on-surface-variant line-through font-sans">Register for Fall Classes</span>
        </label>
        <label className="flex items-center gap-3 p-2 hover:bg-surface-container-high rounded-xl cursor-pointer transition-all">
          <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary size-4" />
          <span className="text-sm text-on-surface font-sans">Submit CPT Agreement Form</span>
        </label>
        <label className="flex items-center gap-3 p-2 hover:bg-surface-container-high rounded-xl cursor-pointer transition-all">
          <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary size-4" />
          <span className="text-sm text-on-surface font-sans">Pay Housing Deposit</span>
        </label>
      </div>
    </div>
  );
}
