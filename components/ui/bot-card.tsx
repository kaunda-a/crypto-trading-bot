// File: components/dashboard/bot-card.tsx
"use client";

import React from "react";
import {
  IconRobot,
  IconTrendingUp,
  IconTrendingDown,
  IconPower,
} from "@tabler/icons-react";

interface BotCardProps {
  bot: {
    id: string;
    name: string;
    status: "active" | "paused" | "inactive";
    performance: number;
    algorithm: string;
    tradingPair: string;
  };
}

export const BotCard: React.FC<BotCardProps> = ({ bot }) => {
  const statusColors = {
    active: "bg-green-500",
    paused: "bg-yellow-500",
    inactive: "bg-red-500",
  };

  return (
    <div className="bg-white dark:bg-theme-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-theme-900 dark:text-theme-100">
            {bot.name}
          </h3>
          <div
            className={`w-3 h-3 rounded-full ${statusColors[bot.status]}`}
          ></div>
        </div>
        <div className="flex items-center mb-4">
          <IconRobot className="text-theme-500 mr-2" size={24} />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {bot.algorithm}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 mr-2">
            Trading Pair:
          </span>
          <span className="text-sm text-theme-600 dark:text-theme-400">
            {bot.tradingPair}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {bot.performance >= 0 ? (
              <IconTrendingUp className="text-green-500 mr-1" size={20} />
            ) : (
              <IconTrendingDown className="text-red-500 mr-1" size={20} />
            )}
            <span
              className={`font-bold ${
                bot.performance >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {bot.performance.toFixed(2)}%
            </span>
          </div>
          <button className="bg-theme-500 hover:bg-theme-600 text-white rounded-full p-2 transition-colors duration-200">
            <IconPower size={20} />
          </button>
        </div>
      </div>
      <div className="bg-theme-100 dark:bg-theme-700 px-6 py-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">24h Volume</span>
          <span className="font-medium text-theme-800 dark:text-theme-200">
            $12,345.67
          </span>
        </div>
      </div>
    </div>
  );
};
