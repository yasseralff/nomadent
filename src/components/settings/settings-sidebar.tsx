import React from "react";
import { User, CreditCard, Bell, Shield, ArrowRight } from "lucide-react";

export function SettingsSidebar() {
  return (
    <div className="bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-3">
      <button className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-high/60 text-primary border border-outline-variant/40 text-left cursor-pointer font-sans transition-all">
        <div className="flex items-center gap-3">
          <User size={18} />
          <span className="font-semibold text-sm">Profile Details</span>
        </div>
        <ArrowRight size={14} />
      </button>
      <button className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-high text-on-surface-variant text-left cursor-pointer font-sans transition-all">
        <div className="flex items-center gap-3">
          <CreditCard size={18} />
          <span className="text-sm">Currency & Budgeting</span>
        </div>
        <ArrowRight size={14} />
      </button>
      <button className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-high text-on-surface-variant text-left cursor-pointer font-sans transition-all">
        <div className="flex items-center gap-3">
          <Bell size={18} />
          <span className="text-sm">Notification Settings</span>
        </div>
        <ArrowRight size={14} />
      </button>
      <button className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-high text-on-surface-variant text-left cursor-pointer font-sans transition-all">
        <div className="flex items-center gap-3">
          <Shield size={18} />
          <span className="text-sm">Security & Privacy</span>
        </div>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
