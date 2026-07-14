import React from "react";
import { PiggyBank } from "lucide-react";

interface GoalProgressCardProps {
  goal: {
    id: number;
    title: string;
    targetAmount: number;
    currentAmount: number;
    currency: string;
    deadline: string;
  };
}

export function GoalProgressCard({ goal }: GoalProgressCardProps) {
  const progressPercent = Math.round((goal.currentAmount / goal.targetAmount) * 100);

  return (
    <div className="bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col justify-between min-h-[220px] transition-all hover:border-outline hover:shadow-md">
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
}
