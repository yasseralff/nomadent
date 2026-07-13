"use client";

import React, { useState } from "react";
import { Plus, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskItem } from "@/components/tasks/task-item";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Register for Fall classes", dueDate: "2026-07-20", priority: "HIGH", status: "TODO" },
    { id: 2, title: "CPT employment form review", dueDate: "2026-07-25", priority: "MEDIUM", status: "TODO" },
    { id: 3, title: "Submit housing security deposit", dueDate: "2026-07-15", priority: "HIGH", status: "DONE" },
    { id: 4, title: "Order textbook from Amazon", dueDate: "2026-08-01", priority: "LOW", status: "TODO" },
    { id: 5, title: "Set up local bank account", dueDate: "2026-07-18", priority: "MEDIUM", status: "IN_PROGRESS" }
  ]);

  const handleStatusToggle = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "DONE" ? "TODO" : "DONE" } : t));
  };

  const getStatusIcon = (status: string, id: number) => {
    if (status === "DONE") {
      return (
        <button onClick={() => handleStatusToggle(id)} className="text-primary hover:opacity-80 cursor-pointer">
          <CheckCircle2 size={18} />
        </button>
      );
    }
    return (
      <button onClick={() => handleStatusToggle(id)} className="text-muted-foreground hover:text-primary cursor-pointer">
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

      {/* Columns defined at page level */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Pending & In Progress Tasks */}
        <div className="lg:col-span-2 bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-on-surface font-sora">To Do</h2>
          
          <div className="flex flex-col gap-3">
            {tasks
              .filter(t => t.status !== "DONE")
              .map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onStatusToggle={handleStatusToggle} 
                  statusIcon={getStatusIcon(task.status, task.id)} 
                />
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
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onStatusToggle={handleStatusToggle} 
                  statusIcon={getStatusIcon(task.status, task.id)} 
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
