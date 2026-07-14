"use client";

import React from "react";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { ProfileForm } from "@/components/settings/ProfileForm";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-on-surface font-sora tracking-tight">Settings</h1>
        <p className="text-sm text-on-surface-variant font-sans">
          Manage your account profile, currencies, and preferences.
        </p>
      </div>

      {/* Main Settings Grid defined at page level */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SettingsSidebar />
        <ProfileForm />
      </div>
    </div>
  );
}
