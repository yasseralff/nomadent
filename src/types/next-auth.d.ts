/**
 * Type augmentations for Auth.js v4 (next-auth).
 *
 * By default, `session.user` only has `name`, `email`, `image`.
 * This extends it with `id` so route handlers can access the database user ID
 * via `getServerSession(authOptions)` without type errors.
 *
 * Reference: https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
