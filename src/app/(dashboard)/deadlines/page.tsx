"use client";

import React, { useState } from "react";
import { Plus, CalendarClock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DeadlineCard } from "@/components/deadlines/DeadlineCard";
import { DeadlineForm } from "@/components/deadlines/DeadlineForm";
import { WorkHoursBar } from "@/components/deadlines/WorkHoursBar";
import { useDeadlines, useCreateDeadline } from "@/hooks/useDeadlines";

export default function DeadlinesPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data, isLoading, isError, error } = useDeadlines();
  const { mutate: createDeadline, isPending: isCreating } = useCreateDeadline();

  const deadlines = data?.data ?? [];
  const empty = !isLoading && !isError && deadlines.length === 0;

  const handleCreate = (formData: Parameters<typeof createDeadline>[0]) => {
    createDeadline(formData, {
      onSuccess: () => {
        setShowCreateForm(false);
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-on-surface font-sora tracking-tight">Deadlines</h1>
          <p className="text-sm text-on-surface-variant font-sans">
            Visa, insurance, and immigration dates — the ones that actually matter.
          </p>
        </div>

        <Button
          onClick={() => setShowCreateForm((v) => !v)}
          size="md"
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Add Deadline</span>
        </Button>
      </div>

      {/* Create form — expands above the grid */}
      {showCreateForm && (
        <DeadlineForm
          isSubmitting={isCreating}
          onSubmit={handleCreate}
          onClose={() => setShowCreateForm(false)}
        />
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm font-sans">Loading deadlines…</p>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <div className="size-12 rounded-full bg-error/10 flex items-center justify-center">
            <AlertCircle size={22} className="text-error" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-on-surface font-sora">
              Couldn&apos;t load deadlines
            </p>
            <p className="text-xs text-muted-foreground font-sans">
              {error instanceof Error ? error.message : "Something went wrong. Please try again."}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      )}

      {/* Empty state */}
      {empty && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CalendarClock size={22} className="text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-on-surface font-sora">No deadlines yet</p>
            <p className="text-xs text-muted-foreground font-sans">
              Add your first visa, insurance, or document deadline to stay on top of it.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus size={14} />
            Create your first deadline
          </Button>
        </div>
      )}

      {/* Dense list container (§10.6) — rounded outer card, hairline dividers per row */}
      {!isLoading && !isError && deadlines.length > 0 && (
        <div className="rounded-3xl border border-outline-variant bg-surface-container overflow-hidden divide-y divide-outline-variant/40">
          {deadlines.map((deadline) => (
            <DeadlineCard key={deadline.id} deadline={deadline} />
          ))}
        </div>
      )}

      <WorkHoursBar />
    </div>
  );
}
