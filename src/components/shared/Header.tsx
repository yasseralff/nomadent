import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full gap-4">
      <div className="flex flex-col gap-1 min-w-0">
        <h1 className="text-2xl font-semibold text-on-surface font-sora tracking-tight truncate">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-on-surface-variant font-sans">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
