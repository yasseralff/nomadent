import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  subtext?: string;
  iconColorClass?: string;
  trendIcon?: LucideIcon;
  trendText?: string;
  trendSuccess?: boolean;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  subtext,
  iconColorClass = "text-primary bg-primary/10",
  trendIcon: TrendIcon,
  trendText,
  trendSuccess,
}: StatsCardProps) {
  return (
    <div className="bg-surface-container rounded-3xl border border-outline-variant p-6 flex flex-col justify-between h-36">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora">
          {title}
        </span>
        <div className={`p-2 rounded-xl ${iconColorClass}`}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-on-surface font-sora">{value}</div>
        {TrendIcon && trendText && (
          <p className={`text-xs flex items-center gap-1 mt-1 font-sans ${trendSuccess ? "text-success" : "text-error"}`}>
            <TrendIcon size={12} />
            <span>{trendText}</span>
          </p>
        )}
        {subtext && !trendText && (
          <p className="text-xs text-error mt-1 font-sans font-medium">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
