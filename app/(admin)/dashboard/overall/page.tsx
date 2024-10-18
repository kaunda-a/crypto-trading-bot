"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Card } from "@/components/ui/card";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { Table } from "@/components/ui/table";

interface OverallPerformance {
  totalProfit: number;
  totalTrades: number;
  winRate: number;
  bestPerformingBot: string;
  worstPerformingBot: string;
}

interface BotPerformance {
  name: string;
  profit: number;
  trades: number;
  winRate: number;
}

const OverallPerformancePage: React.FC = () => {
  const [overallPerformance, setOverallPerformance] =
    useState<OverallPerformance | null>(null);
  const [botPerformances, setBotPerformances] = useState<BotPerformance[]>([]);
  const [timeFrame, setTimeFrame] = useState<string>("30d");
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    fetchOverallPerformance();
    fetchBotPerformances();
  }, [timeFrame]);

  const fetchOverallPerformance = async () => {
    try {
      const response = await axios.get(
        `/api/performance/overall?timeFrame=${timeFrame}`
      );
      setOverallPerformance(response.data);
    } catch (error) {
      console.error("Error fetching overall performance:", error);
    }
  };

  const fetchBotPerformances = async () => {
    try {
      const response = await axios.get(
        `/api/performance/bots?timeFrame=${timeFrame}`
      );
      setBotPerformances(response.data);
      updateChart(response.data);
    } catch (error) {
      console.error("Error fetching bot performances:", error);
    }
  };

  const updateChart = (data: BotPerformance[]) => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((bot) => bot.name),
          datasets: [
            {
              label: "Profit",
              data: data.map((bot) => bot.profit),
              backgroundColor: "#8884d8",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Profit (%)",
              },
            },
          },
        },
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-theme-800 dark:text-theme-200 mb-6">
        Overall Performance
      </h1>

      <CustomSelect
        value={timeFrame}
        onChange={(value) => setTimeFrame(value)}
        className="w-48 mb-6"
      >
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
        <option value="90d">Last 90 Days</option>
        <option value="1y">Last Year</option>
      </CustomSelect>

      {overallPerformance && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Total Profit</h2>
            <p className="text-3xl font-bold text-green-500">
              {overallPerformance.totalProfit.toFixed(2)}%
            </p>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Total Trades</h2>
            <p className="text-3xl font-bold">
              {overallPerformance.totalTrades}
            </p>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Win Rate</h2>
            <p className="text-3xl font-bold">
              {overallPerformance.winRate.toFixed(2)}%
            </p>
          </Card>
        </div>
      )}

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Bot Performance Comparison
        </h2>
        <div style={{ width: "100%", height: "400px" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Bot Performance Details</h2>
        <Table>
          <thead>
            <tr>
              <th>Bot Name</th>
              <th>Profit</th>
              <th>Trades</th>
              <th>Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {botPerformances.map((bot) => (
              <tr key={bot.name}>
                <td>{bot.name}</td>
                <td
                  className={
                    bot.profit >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {bot.profit.toFixed(2)}%
                </td>
                <td>{bot.trades}</td>
                <td>{bot.winRate.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default OverallPerformancePage;
