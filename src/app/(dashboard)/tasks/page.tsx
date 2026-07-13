"use client";

import React, { useState } from "react";
import { CheckSquare, Plus, CheckCircle2, Circle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Register for Fall classes", dueDate: "2026-07-20", priority: "HIGH", status: "TODO" },
    { id: 2, title: "CPT employment form review", dueDate: "2026-07-25", priority: "MEDIUM", status: "TODO" },
    { id: 3, title: "Submit housing security deposit", dueDate: "2026-07-15", priority: "HIGH", status: "DONE" },
    { id: 4, title: "Order textbook from Amazon", dueDate: "2026-08-01", priority: "LOW", status: "TODO" },
    { id: 5, title: "Set up local bank account", dueDate: "2026-07-18", priority: "MEDIUM", status: "IN_PROGRESS" }
  ]);

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

  const getStatusIcon = (status: string, id: number) => {
    const toggle = () => {
      setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "DONE" ? "TODO" : "DONE" } : t));
    };

    if (status === "DONE") {
      return (
        <button onClick={toggle} className="text-primary hover:opacity-80 cursor-pointer">
          <CheckCircle2 size={18} />
        </button>
      );
    }
    return (
      <button onClick={toggle} className="text-muted-foreground hover:text-primary cursor-pointer">
        <Circle size={18} />
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-on-surface font-sora tracking-tight">Academic & Personal Tasks</h1>
          <p className="text-sm text-on-surface-variant font-sans">
            Organize study schedules, documents, and visa requirements.
          </p>
        </div>
        
        <Button
          onClick={() => console.log("add task clicked")}
          size="md"
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Add Task</span>
        </Button>
      </div>

      {/* Columns: Todo & In Progress (Left), Completed (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Pending & In Progress Tasks */}
        <div className="lg:col-span-2 bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-on-surface font-sora">To Do</h2>
          
          <div className="flex flex-col gap-3">
            {tasks
              .filter(t => t.status !== "DONE")
              .map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl group transition-all hover:border-outline hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status, task.id)}
                    <div>
                      <p className="text-sm font-semibold text-on-surface leading-tight font-sans">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground font-sans">
                          <Clock size={12} />
                          {task.dueDate}
                        </span>
                        {task.status === "IN_PROGRESS" && (
                          <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.2 rounded font-sans uppercase font-bold">In Progress</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    {getPriorityBadge(task.priority)}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Right: Completed Tasks */}
        <div className="bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-on-surface font-sora">Completed</h2>
          
          <div className="flex flex-col gap-3">
            {tasks
              .filter(t => t.status === "DONE")
              .map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-surface-container-lowest/50 border border-outline-variant/20 rounded-2xl opacity-60">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status, task.id)}
                    <div>
                      <p className="text-sm font-semibold text-on-surface line-through leading-tight font-sans">
                        {task.title}
                      </p>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1 font-sans">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
