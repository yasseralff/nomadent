"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCurrentUser, useUpdateCurrentUser } from "@/hooks/useCurrentUser";
import { updateProfileSchema, type UpdateProfileInput } from "@/server/validation/schemas";

/**
 * ProfileForm
 *
 * Reads the current user's profile from GET /api/users/me via useCurrentUser(),
 * then populates the form with their real data (name, email, university, country).
 *
 * On submit, calls PATCH /api/users/me via useUpdateCurrentUser() which
 * automatically invalidates and re-fetches the query so the Navbar and any
 * other consumers stay in sync.
 */
export function ProfileForm() {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: updateProfile, isPending, isSuccess, isError } = useUpdateCurrentUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      university: "",
      country: "",
    },
  });

  // Populate form once user data loads
  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        university: user.university ?? "",
        country: user.country ?? "US",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UpdateProfileInput) => {
    updateProfile(data);
  };

  if (isLoading) {
    return (
      <div className="lg:col-span-2 bg-surface-container rounded-3xl border border-outline-variant p-8 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-on-surface font-sora">Profile Information</h2>
        <p className="text-sm text-muted-foreground">Update your name, university, and country.</p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Name + Email row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="profile-name"
            label="Full Name"
            placeholder="Your full name"
            error={errors.name?.message}
            {...register("name")}
          />
          {/* Email is read-only — changing email requires a dedicated verification flow */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sora">
              Email Address
            </label>
            <p className="px-4 py-2.5 text-sm text-muted-foreground border-b border-outline-variant/50 select-all">
              {user?.email ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground">Email cannot be changed here.</p>
          </div>
        </div>

        {/* University + Country row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="profile-university"
            label="University"
            placeholder="e.g. University of Melbourne"
            error={errors.university?.message}
            {...register("university")}
          />
          <Input
            id="profile-country"
            label="Country (2-letter code)"
            placeholder="e.g. AU, US, GB"
            maxLength={2}
            error={errors.country?.message}
            {...register("country")}
          />
        </div>

        {/* Status feedback */}
        {isSuccess && (
          <p className="text-sm text-success">Profile updated successfully.</p>
        )}
        {isError && (
          <p className="text-sm text-error">Failed to update profile. Please try again.</p>
        )}

        <div className="flex justify-end">
          <Button type="submit" size="md" disabled={isPending || !isDirty}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
