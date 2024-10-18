import { useState } from "react";
import axios from "axios";

interface AIStrategy {
  // Define your AI strategy properties here
  // For example:
  // name: string;
  // parameters: Record<string, any>;
  // etc.
}

interface MarketData {
  // Define your market data structure here
}

export const useAIStrategy = () => {
  const [strategy, setStrategy] = useState<AIStrategy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStrategy = async (marketData: MarketData) => {
    setLoading(true);
    try {
      const response = await axios.post<{ aiStrategy: AIStrategy }>(
        "/api/strategy",
        marketData
      );
      setStrategy(response.data.aiStrategy);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { strategy, loading, error, generateStrategy };
};
