import { useState } from "react";
import axios from "axios";

interface TradeResult {
  // Define your trade result properties here
  // For example:
  // id: string;
  // status: 'success' | 'failed';
  // details: Record<string, any>;
}

interface TradeData {
  // Define your trade data structure here
}

export const useTrade = () => {
  const [tradeResult, setTradeResult] = useState<TradeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeTrade = async (tradeData: TradeData) => {
    setLoading(true);
    try {
      const response = await axios.post<TradeResult>("/api/trade", tradeData);
      setTradeResult(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  return { tradeResult, loading, error, executeTrade };
};
