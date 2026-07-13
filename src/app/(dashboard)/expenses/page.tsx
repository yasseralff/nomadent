"use client";

import React, { useState } from "react";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExpensesTable } from "@/components/expenses/expenses-table";
import { CurrencyConverter } from "@/components/expenses/currency-converter";

export default function ExpensesPage() {
  const [filterCategory, setFilterCategory] = useState("All");

  const mockExpenses = [
    { id: 1, description: "Monthly Rent Payment", category: "Rent & Housing", amount: 950.00, currency: "USD", converted: 950.00, date: "2026-07-10" },
    { id: 2, description: "Grocery Store", category: "Food & Groceries", amount: 64.20, currency: "USD", converted: 64.20, date: "2026-07-08" },
    { id: 3, description: "University Textbook", category: "Education", amount: 120.00, currency: "GBP", converted: 154.50, date: "2026-07-05" },
    { id: 4, description: "Train Ticket to City Center", category: "Transport", amount: 12.00, currency: "EUR", converted: 13.10, date: "2026-07-02" },
    { id: 5, description: "Mobile Bill Renewal", category: "Utilities", amount: 35.00, currency: "USD", converted: 35.00, date: "2026-06-30" },
  ];

  const filteredExpenses = mockExpenses.filter(
    (e) => filterCategory === "All" || e.category === filterCategory
  );

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-on-surface font-sora tracking-tight">Expenses</h1>
          <p className="text-sm text-on-surface-variant font-sans">
            Track and convert your spending across multiple currencies.
          </p>
        </div>
        
        <Button
          onClick={() => console.log("add expense clicked")}
          size="md"
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Add Expense</span>
        </Button>
      </div>

      {/* Main Grid defined at page level */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expenses List Panel */}
        <div className="lg:col-span-2 bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface font-sora">Transactions</h2>
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-muted-foreground" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-transparent border border-outline-variant text-xs rounded-xl px-2 py-1 outline-none text-on-surface cursor-pointer font-sans"
              >
                <option value="All">All Categories</option>
                <option value="Rent & Housing">Rent & Housing</option>
                <option value="Food & Groceries">Food & Groceries</option>
                <option value="Education">Education</option>
                <option value="Transport">Transport</option>
              </select>
            </div>
          </div>

          <ExpensesTable expenses={filteredExpenses} />
        </div>

        {/* Expense Summary & Converter Panels */}
        <div className="flex flex-col gap-6">
          {/* Distribution Chart Panel */}
          <div className="bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-on-surface font-sora">Distribution</h2>
            
            {/* Category breakdown meters */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 font-sora">
                  <span className="text-on-surface">Rent & Housing</span>
                  <span className="text-primary">$950.00 (79%)</span>
                </div>
                <div className="w-full bg-outline-variant h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "79%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 font-sora">
                  <span className="text-on-surface">Education</span>
                  <span className="text-primary">$154.50 (13%)</span>
                </div>
                <div className="w-full bg-outline-variant h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "13%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 font-sora">
                  <span className="text-on-surface">Food & Groceries</span>
                  <span className="text-primary">$64.20 (5%)</span>
                </div>
                <div className="w-full bg-outline-variant h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "5%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 font-sora">
                  <span className="text-on-surface">Others</span>
                  <span className="text-primary">$13.10 (3%)</span>
                </div>
                <div className="w-full bg-outline-variant h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "3%" }} />
                </div>
              </div>
            </div>
          </div>

          <CurrencyConverter />
        </div>
      </div>
    </div>
  );
}
