/**
 * Utility functions for Nomadent
 */

/**
 * Formats a number as a currency string.
 * @example formatCurrency(1500) => "$1,500.00"
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-GB"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Formats a Date object or ISO string to a readable date.
 * @example formatDate(new Date()) => "6 Jul 2026"
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Calculates the percentage of a value relative to a total.
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}
