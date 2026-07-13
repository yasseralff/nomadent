"use client";

import React, { useState, useEffect } from "react";
import { Receipt, Plus, Filter, ArrowUpRight, DollarSign, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUPPORTED_CURRENCIES } from "@/constants";

export default function ExpensesPage() {
  const [filterCategory, setFilterCategory] = useState("All");

  // Currency Converter State
  const [convAmount, setConvAmount] = useState<number>(100);
  const [fromCurr, setFromCurr] = useState<string>("GBP");
  const [toCurr, setToCurr] = useState<string>("USD");
  const [convResult, setConvResult] = useState<number | null>(null);
  const [convRate, setConvRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mockExpenses = [
    { id: 1, description: "Monthly Rent Payment", category: "Rent & Housing", amount: 950.00, currency: "USD", converted: 950.00, date: "2026-07-10" },
    { id: 2, description: "Grocery Store", category: "Food & Groceries", amount: 64.20, currency: "USD", converted: 64.20, date: "2026-07-08" },
    { id: 3, description: "University Textbook", category: "Education", amount: 120.00, currency: "GBP", converted: 154.50, date: "2026-07-05" },
    { id: 4, description: "Train Ticket to City Center", category: "Transport", amount: 12.00, currency: "EUR", converted: 13.10, date: "2026-07-02" },
    { id: 5, description: "Mobile Bill Renewal", category: "Utilities", amount: 35.00, currency: "USD", converted: 35.00, date: "2026-06-30" },
  ];

  // Approximate static fallback rates against USD in case Frankfurter API is offline or blocked
  const FALLBACK_RATES: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.78,
    CAD: 1.36,
    AUD: 1.50,
    JPY: 158.0,
    CNY: 7.25,
    INR: 83.5,
    KRW: 1380.0,
    SGD: 1.35,
    HKD: 7.8,
    IDR: 16200.0,
    MYR: 4.7,
    THB: 36.5,
    NZD: 1.63,
    CHF: 0.90,
    BRL: 5.4,
    MXN: 18.0,
  };

  const handleConvert = async () => {
    if (fromCurr === toCurr) {
      setConvResult(convAmount);
      setConvRate(1);
      setErrorMsg(null);
      return;
    }
    if (convAmount <= 0) {
      setConvResult(0);
      setConvRate(null);
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${convAmount}&from=${fromCurr}&to=${toCurr}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch exchange rate data.");
      }
      const data = await res.json();
      const result = data.rates[toCurr];
      setConvResult(result);
      setConvRate(result / convAmount);
      setRateDate(data.date);
    } catch (err: any) {
      // Offline / network failure fallback
      const rateFromUSD = FALLBACK_RATES[fromCurr];
      const rateToUSD = FALLBACK_RATES[toCurr];
      
      if (rateFromUSD && rateToUSD) {
        const fallbackRate = rateToUSD / rateFromUSD;
        setConvResult(convAmount * fallbackRate);
        setConvRate(fallbackRate);
        setRateDate("Offline Fallback");
        setErrorMsg("API offline. Showing approximate local rate.");
      } else {
        setErrorMsg("Failed to retrieve exchange rates.");
      }
      // Suppress full error log to avoid trigger of Next.js dev overlay crash screen
      console.warn("Frankfurter API fetch failed, utilizing local fallback rates:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert on mount or change of currencies
  useEffect(() => {
    handleConvert();
  }, [fromCurr, toCurr]);

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

      {/* Main Layout: Left side list, Right side category stats & converter */}
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

          {/* Dense List Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/60 text-[10px] text-muted-foreground uppercase font-sora font-bold tracking-wider">
                  <th className="pb-3 pl-2">Description</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 text-right">Converted (USD)</th>
                  <th className="pb-3 pr-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {mockExpenses
                  .filter((e) => filterCategory === "All" || e.category === filterCategory)
                  .map((expense) => (
                    <tr key={expense.id} className="group hover:bg-surface-container-high/40 transition-colors font-sans text-sm">
                      <td className="py-3 pl-2 font-medium text-on-surface max-w-[200px] truncate">
                        {expense.description}
                      </td>
                      <td className="py-3 text-on-surface-variant">
                        <span className="text-xs px-2 py-0.5 rounded-full border border-outline-variant bg-surface-container-lowest font-medium">
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium text-on-surface font-sora">
                        {expense.amount.toFixed(2)} <span className="text-xs text-muted-foreground">{expense.currency}</span>
                      </td>
                      <td className="py-3 text-right font-semibold text-primary font-sora">
                        ${expense.converted.toFixed(2)}
                      </td>
                      <td className="py-3 pr-2 text-right text-xs text-muted-foreground">
                        {expense.date}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
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

          {/* Currency Converter Panel */}
          <div className="bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-semibold text-on-surface font-sora">Exchange Calculator</h2>
              <p className="text-xs text-muted-foreground font-sans mt-0.5">Quickly convert between study abroad currencies</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Input Amount */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-sora">Amount</label>
                <input
                  type="number"
                  min="0"
                  value={convAmount}
                  onChange={(e) => setConvAmount(Number(e.target.value))}
                  placeholder="Enter amount..."
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-foreground border-b border-outline-variant outline-none rounded-full focus:border-transparent focus:ring-1 focus:ring-primary focus:bg-surface-container transition-all duration-200"
                />
              </div>

              {/* Currency Dropdowns */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-sora">From</label>
                  <select
                    value={fromCurr}
                    onChange={(e) => setFromCurr(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-xs border border-outline-variant rounded-xl outline-none text-on-surface cursor-pointer font-sans"
                  >
                    {SUPPORTED_CURRENCIES.map((curr) => (
                      <option key={curr.code} value={curr.code}>{curr.code}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-sora">To</label>
                  <select
                    value={toCurr}
                    onChange={(e) => setToCurr(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-xs border border-outline-variant rounded-xl outline-none text-on-surface cursor-pointer font-sans"
                  >
                    {SUPPORTED_CURRENCIES.map((curr) => (
                      <option key={curr.code} value={curr.code}>{curr.code}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                onClick={handleConvert}
                disabled={isLoading}
                size="sm"
                className="w-full mt-2 font-sora"
              >
                {isLoading ? "Converting..." : "Convert"}
              </Button>
            </div>

            {/* Results / Feedback */}
            {errorMsg ? (
              <p className="text-xs text-error font-sans text-center">{errorMsg}</p>
            ) : (
              convResult !== null && (
                <div className="mt-2 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-muted-foreground font-sans">Converted Value</span>
                  <span className="text-lg font-bold text-on-surface font-sora mt-1">
                    {toCurr} {convResult.toFixed(2)}
                  </span>
                  {convRate && (
                    <span className="text-[10px] text-muted-foreground font-sans mt-1">
                      Rate: 1 {fromCurr} = {convRate.toFixed(4)} {toCurr}
                    </span>
                  )}
                  {rateDate && (
                    <span className="text-[9px] text-muted-foreground font-sans mt-0.5">
                      Updated: {rateDate}
                    </span>
                  )}
                </div>
              )
            )}

            {/* Disclaimer */}
            <p className="text-[9px] leading-relaxed text-muted-foreground text-center font-sans border-t border-outline-variant/30 pt-3">
              Exchange rates are sourced from the Frankfurter API based on reference values published by the European Central Bank (ECB).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
