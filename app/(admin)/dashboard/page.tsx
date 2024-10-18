"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconChartBar, IconRobot, IconHistory } from "@tabler/icons-react";

export default function DashboardPage() {
  const dashboardCards = [
    {
      title: "Active Bots",
      value: "5",
      icon: <IconRobot className="w-8 h-8 text-blue-500" />,
      link: "/dashboard/bots",
    },
    {
      title: "Total Profit",
      value: "$1,234.56",
      icon: <IconChartBar className="w-8 h-8 text-green-500" />,
      link: "/dashboard/performance",
    },
    {
      title: "Recent Trades",
      value: "28",
      icon: <IconHistory className="w-8 h-8 text-purple-500" />,
      link: "/dashboard/trading-history",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-theme-900 dark:text-white">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-theme-700 dark:text-theme-300">
                {card.title}
              </h2>
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-theme-900 dark:text-white mb-4">
              {card.value}
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => (window.location.href = card.link)}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
        <p className="mb-4">
          Welcome to your cryptobot dashboard. Here's how to get started:
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Configure your trading bots in the Bots section</li>
          <li>Monitor your performance in real-time</li>
          <li>Analyze your trading history to refine your strategies</li>
        </ol>
      </Card>
    </div>
  );
}
