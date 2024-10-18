import { useState, useEffect } from "react";
import axios from "axios";

interface Bot {
  // Define your bot properties here
  id: string;
  name: string;
  // ... other properties
}

export const useBot = (botId: string) => {
  const [bot, setBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBot = async () => {
      try {
        const response = await axios.get<Bot>(`/api/bots/${botId}`);
        setBot(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBot();
  }, [botId]);

  return { bot, loading, error };
};
