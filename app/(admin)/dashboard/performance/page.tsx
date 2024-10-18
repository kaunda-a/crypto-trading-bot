"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { CustomSelect } from "@/components/shared/CustomSelect";
import Card from "@/components/ui/card";

interface PerformanceData {
  date: string;
  profit: number;
  trades: number;
}

const PerformancePage: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [selectedBot, setSelectedBot] = useState<string>("all");
  const [timeFrame, setTimeFrame] = useState<string>("7d");
  const [bots, setBots] = useState<string[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    fetchBots();
    fetchPerformanceData();
  }, [selectedBot, timeFrame]);

  const fetchBots = async () => {
    try {
      const response = await axios.get("/api/bots");
      setBots(["all", ...response.data.map((bot: any) => bot.name)]);
    } catch (error) {
      console.error("Error fetching bots:", error);
    }
  };

  const fetchPerformanceData = async () => {
    try {
      const response = await axios.get(
        `/api/performance?bot=${selectedBot}&timeFrame=${timeFrame}`
      );
      setPerformanceData(response.data);
      updateChart(response.data);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  const updateChart = (data: PerformanceData[]) => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((d) => d.date),
          datasets: [
            {
              label: "Profit",
              data: data.map((d) => d.profit),
              borderColor: "#8884d8",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Profit",
              },
            },
          },
        },
      });
    }
  };

  const calculateTotalProfit = () => {
    return performanceData
      .reduce((sum, data) => sum + data.profit, 0)
      .toFixed(2);
  };

  const calculateTotalTrades = () => {
    return performanceData.reduce((sum, data) => sum + data.trades, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-theme-800 dark:text-theme-200 mb-6">
        Performance Overview
      </h1>

      <div className="flex space-x-4 mb-6">
        <CustomSelect
          value={selectedBot}
          onChange={(value) => setSelectedBot(value)}
          className="w-48"
        >
          {bots.map((bot) => (
            <option key={bot} value={bot}>
              {bot === "all" ? "All Bots" : bot}
            </option>
          ))}
        </CustomSelect>

        <CustomSelect
          value={timeFrame}
          onChange={(value) => setTimeFrame(value)}
          className="w-48"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </CustomSelect>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Total Profit</h2>
          <p className="text-3xl font-bold text-green-500">
            {calculateTotalProfit()}%
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Total Trades</h2>
          <p className="text-3xl font-bold">{calculateTotalTrades()}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Chart</h2>
        <div style={{ width: "100%", height: "400px" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </Card>
    </div>
  );
};

export default PerformancePage;
