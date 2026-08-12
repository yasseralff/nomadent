"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DEADLINE_TYPES } from "@/constants";
import {
  createDeadlineSchema,
  type CreateDeadlineInput,
} from "@/server/validation/schemas";

/**
 * Form-side schema derived from the shared createDeadlineSchema.
 *
 * RHF stores raw input values, so the resolver validates the *input* shape:
 * dueDate is a datetime-local string (no timezone offset) and workHourCap is
 * read as text. Both are normalized to the server's expected shape when the
 * form is submitted (see handleFormSubmit).
 */
const deadlineFormSchema = createDeadlineSchema
  .extend({
    dueDate: z.string().min(1, "Due date is required"),
    workHourCap: z
      .union([z.literal(""), z.coerce.number().int().positive()])
      .optional(),
  });

type FormValues = z.input<typeof deadlineFormSchema>;

interface DeadlineFormProps {
  isSubmitting: boolean;
  onSubmit: (data: CreateDeadlineInput) => void;
  onClose?: () => void;
}

export function DeadlineForm({ isSubmitting, onSubmit, onClose }: DeadlineFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(deadlineFormSchema),
    defaultValues: {
      title: "",
      type: "VISA",
      dueDate: "",
      notes: "",
      workHourCap: undefined,
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    onSubmit({
      title: data.title,
      type: data.type,
      notes: data.notes,
      dueDate: new Date(data.dueDate).toISOString(),
      workHourCap: !data.workHourCap ? undefined : (data.workHourCap as number),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-surface-container rounded-3xl border border-outline-variant p-6 flex flex-col gap-5"
      noValidate
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
            <CalendarClock size={16} className="text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-on-surface font-sora">
              New Deadline
            </h2>
            <p className="text-xs text-muted-foreground font-sans">
              Visa, insurance, or immigration dates that matter.
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close deadline form"
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <Input
        id="deadline-title"
        type="text"
        label="Title"
        placeholder="e.g. F-1 Visa Extension"
        required
        error={errors.title?.message}
        {...register("title")}
      />

      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor="deadline-type"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora"
        >
          Type<span className="text-error ml-1">*</span>
        </label>
        <select
          id="deadline-type"
          className="w-full bg-transparent py-2.5 text-sm text-foreground border-b border-outline-variant outline-none rounded-full px-4 transition-all duration-200 focus:border-transparent focus:ring-1 focus:ring-primary focus:bg-surface-container cursor-pointer"
          {...register("type")}
        >
          {DEADLINE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.type?.message && (
          <span className="text-xs text-error">{errors.type.message}</span>
        )}
      </div>

      <Input
        id="deadline-dueDate"
        type="datetime-local"
        label="Due date"
        required
        error={errors.dueDate?.message}
        {...register("dueDate")}
      />

      <Input
        id="deadline-notes"
        type="text"
        label="Notes (optional)"
        placeholder="e.g. Bring passport-sized photos"
        error={errors.notes?.message}
        {...register("notes")}
      />

      <Input
        id="deadline-workHourCap"
        type="number"
        label="Weekly work-hour cap (optional)"
        placeholder="e.g. 20"
        error={errors.workHourCap?.message}
        {...register("workHourCap")}
      />

      <Button type="submit" disabled={isSubmitting} className="self-end flex items-center gap-2">
        <Plus size={16} />
        <span>{isSubmitting ? "Creating..." : "Add Deadline"}</span>
      </Button>
    </form>
  );
}
