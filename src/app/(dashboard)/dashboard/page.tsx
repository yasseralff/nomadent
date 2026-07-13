import React from "react";
import { Receipt, CalendarClock, Target, CheckSquare, TrendingUp, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-on-surface font-sora tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-on-surface-variant font-sans">
          Welcome back, Yasser. Here is a summary of your academic life and finances.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1: Monthly Expenses */}
        <div className="bg-surface-container rounded-3xl border border-outline-variant p-6 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora">
              Monthly Expenses
            </span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Receipt size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface font-sora">$1,450.00</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1 font-sans">
              <TrendingUp size={12} />
              <span>12% less than last month</span>
            </p>
          </div>
        </div>

        {/* Card 2: Visa Deadline */}
        <div className="bg-surface-container rounded-3xl border border-outline-variant p-6 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora">
              Visa Status
            </span>
            <div className="p-2 rounded-xl bg-error/10 text-error animate-pulse">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface font-sora">45 Days</div>
            <p className="text-xs text-error mt-1 font-sans font-medium">
              F-1 renewal due Aug 27
            </p>
          </div>
        </div>

        {/* Card 3: Tasks Pending */}
        <div className="bg-surface-container rounded-3xl border border-outline-variant p-6 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora">
              Active Tasks
            </span>
            <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
              <CheckSquare size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface font-sora">4 / 7</div>
            <div className="w-full bg-outline-variant h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "57%" }} />
            </div>
          </div>
        </div>

        {/* Card 4: Goal Progress */}
        <div className="bg-surface-container rounded-3xl border border-outline-variant p-6 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora">
              Savings Goal
            </span>
            <div className="p-2 rounded-xl bg-tertiary/10 text-tertiary">
              <Target size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface font-sora">$3,200 / $5k</div>
            <div className="w-full bg-outline-variant h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-success h-full rounded-full" style={{ width: "64%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left chart, Right upcoming list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend Chart Area */}
        <div className="lg:col-span-2 bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col justify-between min-h-[350px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-on-surface font-sora">Expense Analytics</h2>
              <p className="text-xs text-muted-foreground font-sans">Visual summary of your monthly spending habits</p>
            </div>
          </div>
          {/* Mock Chart Area */}
          <div className="flex-1 border border-dashed border-outline-variant/60 rounded-2xl flex flex-col items-center justify-center p-6 bg-surface-container-lowest/50">
            <div className="flex gap-4 items-end justify-center h-40 w-full max-w-sm">
              <div className="w-12 bg-primary/20 hover:bg-primary transition-colors rounded-t-lg h-[40%]" />
              <div className="w-12 bg-primary/30 hover:bg-primary transition-colors rounded-t-lg h-[60%]" />
              <div className="w-12 bg-primary/25 hover:bg-primary transition-colors rounded-t-lg h-[50%]" />
              <div className="w-12 bg-primary/45 hover:bg-primary transition-colors rounded-t-lg h-[85%]" />
              <div className="w-12 bg-primary hover:bg-primary/80 transition-colors rounded-t-lg h-[70%]" />
            </div>
            <div className="flex gap-4 justify-center w-full max-w-sm mt-3 text-[10px] text-muted-foreground uppercase font-sora font-semibold">
              <span className="w-12 text-center">Feb</span>
              <span className="w-12 text-center">Mar</span>
              <span className="w-12 text-center">Apr</span>
              <span className="w-12 text-center">May</span>
              <span className="w-12 text-center">Jun</span>
            </div>
          </div>
        </div>

        {/* Sidebar deadlinelist / tasks widgets */}
        <div className="flex flex-col gap-6">
          {/* Deadlines Widget */}
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

          {/* Quick Tasks Widget */}
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
        </div>
      </div>
    </div>
  );
}
