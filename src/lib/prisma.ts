import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma client singleton for Nomadent.
 *
 * Prisma 7 requires a driver adapter rather than reading DATABASE_URL
 * from schema.prisma — connection URLs are now managed outside the schema.
 * PrismaPg reads DATABASE_URL from the environment and handles connection pooling.
 *
 * The globalThis trick prevents multiple Prisma instances during hot-reload
 * in development (Next.js re-imports modules on every file change).
 */

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set.");
  }

  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
