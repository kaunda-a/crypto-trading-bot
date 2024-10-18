import { useState, useEffect } from "react";
import axios from "axios";

interface MarketData {
  // Define your market data properties here
  // For example:
  // price: number;
  // volume: number;
  // etc.
}

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get<MarketData[]>("/api/market");
        setMarketData(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return { marketData, loading, error };
};
