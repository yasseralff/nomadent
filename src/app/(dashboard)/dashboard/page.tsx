import React from "react";
import { Receipt, AlertTriangle, CheckSquare, Target, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { DeadlinesWidget } from "@/components/dashboard/deadlines-widget";
import { PendingTasks } from "@/components/dashboard/pending-tasks";

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

      {/* Grid defined on the page container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Monthly Expenses"
          value="$1,450.00"
          icon={Receipt}
          trendIcon={TrendingUp}
          trendText="12% less than last month"
          trendSuccess
        />
        <StatsCard
          title="Visa Status"
          value="45 Days"
          icon={AlertTriangle}
          iconColorClass="text-error bg-error/10 animate-pulse"
          subtext="F-1 renewal due Aug 27"
        />
        <StatsCard
          title="Active Tasks"
          value="4 / 7"
          icon={CheckSquare}
          iconColorClass="text-secondary bg-secondary/10"
        />
        <StatsCard
          title="Savings Goal"
          value="$3,200 / $5k"
          icon={Target}
          iconColorClass="text-tertiary bg-tertiary/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsChart />
        <div className="flex flex-col gap-6">
          <DeadlinesWidget />
          <PendingTasks />
        </div>
      </div>
    </div>
  );
}
