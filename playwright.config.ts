import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright end-to-end test configuration for Nomadent.
 *
 * Covers the 3 critical flows from DESIGN.md §2:
 *  1. Sign up → dashboard
 *  2. Add an expense
 *  3. Complete a task
 *
 * Run: npx playwright test
 * UI:  npx playwright test --ui
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Start the Next.js dev server automatically before tests run
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
