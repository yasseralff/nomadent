import { useState, useEffect } from "react";
import api from "@/lib/api";
import { FALLBACK_RATES } from "@/constants";

interface UseExchangeRateParams {
  amount: number;
  from: string;
  to: string;
}

export function useExchangeRate({ amount, from, to }: UseExchangeRateParams) {
  const [convResult, setConvResult] = useState<number | null>(null);
  const [convRate, setConvRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchRate() {
      if (from === to) {
        setConvResult(amount);
        setConvRate(1);
        setErrorMsg(null);
        return;
      }
      if (amount <= 0) {
        setConvResult(0);
        setConvRate(null);
        return;
      }

      setIsLoading(true);
      setErrorMsg(null);

      try {
        const res = await api.get(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        if (!active) return;
        const data = res.data;
        const result = data.rates[to];
        setConvResult(result);
        setConvRate(result / amount);
        setRateDate(data.date);
      } catch (err: any) {
        if (!active) return;
        const rateFromUSD = FALLBACK_RATES[from];
        const rateToUSD = FALLBACK_RATES[to];

        if (rateFromUSD && rateToUSD) {
          const fallbackRate = rateToUSD / rateFromUSD;
          setConvResult(amount * fallbackRate);
          setConvRate(fallbackRate);
          setRateDate("Offline Fallback");
          setErrorMsg("API offline. Showing approximate local rate.");
        } else {
          setErrorMsg("Failed to retrieve exchange rates.");
        }
        console.warn("Frankfurter API fetch failed, utilizing local fallback rates:", err.message);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    fetchRate();

    return () => {
      active = false;
    };
  }, [amount, from, to]);

  return { convResult, convRate, rateDate, isLoading, errorMsg };
}
