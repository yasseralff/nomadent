"use client";

import React, { useState } from "react";
import { Settings, User, CreditCard, Bell, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [name, setName] = useState("Yasser Alff");
  const [email, setEmail] = useState("yasser@university.edu");
  const [homeCurrency, setHomeCurrency] = useState("USD");

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-on-surface font-sora tracking-tight">Settings</h1>
        <p className="text-sm text-on-surface-variant font-sans">
          Manage your account profile, currencies, and preferences.
        </p>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Settings Navigation / Options List */}
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

        {/* Right Side: Settings Content Card */}
        <div className="lg:col-span-2 bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-on-surface font-sora">Profile Information</h2>
          
          <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); console.log("saved settings"); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="profile-name"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                id="profile-email"
                label="Email Address"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora">
                Home Currency
              </label>
              <select
                value={homeCurrency}
                onChange={(e) => setHomeCurrency(e.target.value)}
                className="w-full bg-transparent px-4 py-2.5 text-sm text-foreground border-b border-outline-variant outline-none rounded-full focus:border-transparent focus:ring-1 focus:ring-primary focus:bg-surface-container transition-all duration-200"
              >
                <option value="USD">USD ($) - US Dollar</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="IDR">IDR (Rp) - Indonesian Rupiah</option>
              </select>
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" size="md">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
