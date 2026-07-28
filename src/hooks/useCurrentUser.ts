"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { UpdateProfileInput } from "@/server/validation/schemas";
import type { User } from "@/types";

// Cache key for the current user's profile.
// A plain string (not an array) because this query has no parameters.
export const currentUserQueryKey = ["currentUser"] as const;

/**
 * useCurrentUser
 *
 * Fetches the full profile of the currently authenticated user from
 * GET /api/users/me. Returns name, email, university, country,
 * homeCurrency, and more — fields that go beyond what useSession() provides.
 *
 * When to use this vs useSession():
 *  - useSession(): cheap (reads from cookie), use for name/avatar in Navbar
 *  - useCurrentUser(): DB fetch, use for the profile page or settings forms
 *    where you need university, country, homeCurrencyId, etc.
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: async () => {
      const response = await api.get<{ data: User }>("/users/me");
      return response.data.data;
    },
  });
}

/**
 * useUpdateCurrentUser
 *
 * Partially updates the current user's profile via PATCH /api/users/me.
 * Automatically invalidates and re-fetches the currentUser query on success
 * so the UI stays in sync.
 *
 * Usage:
 *   const { mutate: updateProfile, isPending } = useUpdateCurrentUser();
 *   updateProfile({ university: "MIT", country: "US" });
 */
export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileInput) => {
      const response = await api.patch<{ data: User }>("/users/me", data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currentUserQueryKey });
    },
  });
}
