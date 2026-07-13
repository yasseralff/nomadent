"use client";

import React from "react";
import { Target, Plus, PiggyBank, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GoalsPage() {
  const mockGoals = [
    { id: 1, title: "Emergency Fund", targetAmount: 2000, currentAmount: 1200, currency: "USD", deadline: "2026-12-31" },
    { id: 2, title: "Fall Tuition Fees", targetAmount: 5000, currentAmount: 3200, currency: "USD", deadline: "2026-09-01" },
    { id: 3, title: "Travel to Home Country", targetAmount: 1500, currentAmount: 450, currency: "EUR", deadline: "2027-01-15" }
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-on-surface font-sora tracking-tight">Savings Goals</h1>
          <p className="text-sm text-on-surface-variant font-sans">
            Set aside money for tuition, emergencies, or travels.
          </p>
        </div>
        
        <Button
          onClick={() => console.log("add goal clicked")}
          size="md"
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Create Goal</span>
        </Button>
      </div>

      {/* Grid of Goals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockGoals.map((goal) => {
          const progressPercent = Math.round((goal.currentAmount / goal.targetAmount) * 100);
          
          return (
            <div key={goal.id} className="bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col justify-between min-h-[220px] transition-all hover:border-outline hover:shadow-md">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <PiggyBank size={20} />
                </div>
                <span className="text-xs text-muted-foreground font-sans">
                  Target: {goal.deadline}
                </span>
              </div>

              <div className="my-4">
                <h3 className="text-base font-bold text-on-surface font-sans truncate">{goal.title}</h3>
                <div className="flex items-baseline gap-1 mt-1 font-sora">
                  <span className="text-xl font-bold text-on-surface">{goal.currency} {goal.currentAmount}</span>
                  <span className="text-xs text-muted-foreground">/ {goal.targetAmount}</span>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-xs font-semibold mb-1.5 text-on-surface-variant font-sora">
                  <span>Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-outline-variant h-2 rounded-full overflow-hidden">
                  <div className="bg-success h-full rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
