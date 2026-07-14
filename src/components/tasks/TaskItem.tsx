import React from "react";
import { Clock } from "lucide-react";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
  status: string;
}

interface TaskItemProps {
  task: Task;
  onStatusToggle: (id: number) => void;
  statusIcon: React.ReactNode;
}

export function TaskItem({ task, onStatusToggle, statusIcon }: TaskItemProps) {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <span className="text-[10px] bg-error/10 text-error px-2 py-0.5 rounded-full font-sora font-semibold uppercase tracking-wider">High</span>;
      case "MEDIUM":
        return <span className="text-[10px] bg-warning/10 text-warning px-2 py-0.5 rounded-full font-sora font-semibold uppercase tracking-wider">Medium</span>;
      default:
        return <span className="text-[10px] bg-success/10 text-success px-2 py-0.5 rounded-full font-sora font-semibold uppercase tracking-wider">Low</span>;
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
      task.status === "DONE" 
        ? "bg-surface-container-lowest/50 border border-outline-variant/20 opacity-60"
        : "bg-surface-container-lowest border border-outline-variant/40 group hover:border-outline hover:shadow-sm"
    }`}>
      <div className="flex items-center gap-3">
        {statusIcon}
        <div>
          <p className={`text-sm font-semibold text-on-surface leading-tight font-sans ${task.status === "DONE" ? "line-through" : ""}`}>
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {task.status !== "DONE" ? (
              <>
                <span className="flex items-center gap-1 text-xs text-muted-foreground font-sans">
                  <Clock size={12} />
                  {task.dueDate}
                </span>
                {task.status === "IN_PROGRESS" && (
                  <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.2 rounded font-sans uppercase font-bold">In Progress</span>
                )}
              </>
            ) : (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-sans">
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
      {task.status !== "DONE" && (
        <div>
          {getPriorityBadge(task.priority)}
        </div>
      )}
    </div>
  );
}
