"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GoalProgressCard } from "@/components/goals/GoalProgressCard";

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
        {mockGoals.map((goal) => (
          <GoalProgressCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}
