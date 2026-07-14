"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

/**
 * Wraps the app with TanStack Query and Auth.js session providers.
 *
 * WHY a separate component?
 * Next.js root layout.tsx is a Server Component — you can't call useState()
 * or use browser APIs there. This wrapper is a Client Component that holds
 * the QueryClient instance and provides it to the rest of the tree.
 *
 * WHY useState for QueryClient?
 * Creating QueryClient inside useState ensures each browser tab/user gets
 * its own instance, preventing state from leaking between requests.
 *
 * WHY SessionProvider here?
 * SessionProvider must be a Client Component ancestor of any component that
 * calls useSession(). Placing it here keeps the root layout clean.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 60 seconds — no refetch on window focus
            staleTime: 60 * 1000,
            // Retry failed requests once before showing an error
            retry: 1,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}

