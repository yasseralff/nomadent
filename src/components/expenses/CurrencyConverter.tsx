import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SUPPORTED_CURRENCIES } from "@/constants";
import { useExchangeRate } from "@/hooks/useExchangeRate";

export function CurrencyConverter() {
  const [convAmount, setConvAmount] = useState<number>(100);
  const [fromCurr, setFromCurr] = useState<string>("GBP");
  const [toCurr, setToCurr] = useState<string>("USD");

  const { convResult, convRate, rateDate, isLoading, errorMsg } = useExchangeRate({
    amount: convAmount,
    from: fromCurr,
    to: toCurr,
  });

  return (
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
  );
}
