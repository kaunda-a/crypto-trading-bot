"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  IconRefresh,
  IconPray,
  IconEyePause,
  IconChartLine,
} from "@tabler/icons-react";
import { toast } from "react-toastify";

interface Bot {
  id: string;
  name: string;
  status: "active" | "paused" | "inactive";
  tradingPair: string;
  profit: number;
  lastTrade: string;
}

const BotStatusPage: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBotStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/bots/status");
      setBots(response.data);
      toast.success("Bot status updated successfully");
    } catch (error) {
      console.error("Error fetching bot status:", error);
      toast.error("Failed to fetch bot status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBotStatus();
    const interval = setInterval(fetchBotStatus, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const handleToggleBot = async (botId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "paused" : "active";
      await axios.post(`/api/bots/${botId}/toggle`, { status: newStatus });
      fetchBotStatus(); // Refresh bot status after toggling
      toast.success(
        `Bot ${newStatus === "active" ? "activated" : "paused"} successfully`
      );
    } catch (error) {
      console.error("Error toggling bot status:", error);
      toast.error("Failed to toggle bot status");
    }
  };

  const handleViewPerformance = (botId: string) => {
    // Implement navigation to bot performance page
    console.log(`View performance for bot ${botId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-theme-800 dark:text-theme-200">
          Bot Status
        </h1>
        <Button onClick={fetchBotStatus} disabled={loading}>
          <IconRefresh className="mr-2" size={18} />
          Refresh
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Trading Pair</th>
            <th>Profit</th>
            <th>Last Trade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bots.map((bot) => (
            <tr key={bot.id}>
              <td>{bot.name}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    bot.status === "active"
                      ? "bg-green-500 text-white"
                      : bot.status === "paused"
                      ? "bg-yellow-500 text-black"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {bot.status}
                </span>
              </td>
              <td>{bot.tradingPair}</td>
              <td
                className={bot.profit >= 0 ? "text-green-500" : "text-red-500"}
              >
                {bot.profit.toFixed(2)}%
              </td>
              <td>{bot.lastTrade}</td>
              <td>
                <Button
                  onClick={() => handleToggleBot(bot.id, bot.status)}
                  variant="outline"
                  size="sm"
                  className="mr-2"
                >
                  {bot.status === "active" ? (
                    <>
                      <IconEyePause size={16} className="mr-1" /> Pause
                    </>
                  ) : (
                    <>
                      <IconPray size={16} className="mr-1" /> Activate
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => handleViewPerformance(bot.id)}
                  variant="outline"
                  size="sm"
                >
                  <IconChartLine size={16} className="mr-1" /> Performance
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BotStatusPage;
