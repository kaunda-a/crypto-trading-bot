// File: hooks/use-bots.ts
"use client";

import { useState, useEffect, useCallback } from "react";

interface Bot {
  id: string;
  name: string;
  status: "active" | "paused" | "inactive";
  performance: number;
  algorithm: string;
  tradingPair: string;
}

export const useBots = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBots = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/bots");
      if (!response.ok) {
        throw new Error("Failed to fetch bots");
      }
      const data = await response.json();
      setBots(data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBots();
  }, [fetchBots]);

  return { bots, isLoading, error, refetch: fetchBots };
};
