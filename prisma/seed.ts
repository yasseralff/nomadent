import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding started...");

  // 1. Seed Currencies
  const currencies = [
    { name: "USD", symbol: "$", details: "US Dollar" },
    { name: "GBP", symbol: "£", details: "British Pound" },
    { name: "EUR", symbol: "€", details: "Euro" },
    { name: "AUD", symbol: "A$", details: "Australian Dollar" },
    { name: "CAD", symbol: "C$", details: "Canadian Dollar" },
    { name: "JPY", symbol: "¥", details: "Japanese Yen" },
    { name: "CNY", symbol: "¥", details: "Chinese Yuan" },
    { name: "INR", symbol: "₹", details: "Indian Rupee" },
    { name: "KRW", symbol: "₩", details: "South Korean Won" },
    { name: "BRL", symbol: "R$", details: "Brazilian Real" },
    { name: "MXN", symbol: "$", details: "Mexican Peso" },
    { name: "SGD", symbol: "S$", details: "Singapore Dollar" },
    { name: "HKD", symbol: "HK$", details: "Hong Kong Dollar" },
    { name: "IDR", symbol: "Rp", details: "Indonesian Rupiah" },
    { name: "MYR", symbol: "RM", details: "Malaysian Ringgit" },
    { name: "THB", symbol: "฿", details: "Thai Baht" },
    { name: "NZD", symbol: "NZ$", details: "New Zealand Dollar" },
    { name: "CHF", symbol: "Fr", details: "Swiss Franc" },
  ];

  for (const c of currencies) {
    await prisma.currency.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    });
  }
  console.log("Currencies seeded.");

  // 2. Seed Global Categories
  const categories = [
    "Food & Groceries",
    "Rent & Housing",
    "Transport",
    "Utilities",
    "Healthcare",
    "Education",
    "Entertainment",
    "Clothing",
    "Insurance",
    "Travel",
    "Personal Care",
    "Other",
  ];

  for (const catName of categories) {
    const existing = await prisma.category.findFirst({
      where: { name: catName, userId: null },
    });
    if (!existing) {
      await prisma.category.create({
        data: { name: catName, userId: null },
      });
    }
  }
  console.log("Categories seeded.");

  // 3. Seed Priorities
  const priorities = [
    { name: "LOW", level: 1, color: "var(--success)" },
    { name: "MEDIUM", level: 2, color: "var(--warning)" },
    { name: "HIGH", level: 3, color: "var(--error)" },
  ];

  for (const p of priorities) {
    await prisma.priority.upsert({
      where: { name: p.name },
      update: { level: p.level, color: p.color },
      create: p,
    });
  }
  console.log("Priorities seeded.");

  // 4. Seed Statuses
  const statuses = [
    { name: "TODO", order: 1, color: "var(--muted-foreground)" },
    { name: "IN_PROGRESS", order: 2, color: "var(--primary)" },
    { name: "DONE", order: 3, color: "var(--success)" },
  ];

  for (const s of statuses) {
    await prisma.status.upsert({
      where: { name: s.name },
      update: { order: s.order, color: s.color },
      create: s,
    });
  }
  console.log("Statuses seeded.");

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
