"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { CustomSelect } from "@/components/shared/CustomSelect";

interface InsightData {
  date: string;
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

const InsightsPage: React.FC = () => {
  const [insightData, setInsightData] = useState<InsightData[]>([]);
  const [timeFrame, setTimeFrame] = useState<string>("30d");
  const [loading, setLoading] = useState<boolean>(true);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    fetchInsightData();
  }, [timeFrame]);

  const fetchInsightData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/performance/insight?timeFrame=${timeFrame}`
      );
      setInsightData(response.data);
      updateChart(response.data);
    } catch (error) {
      console.error("Error fetching insight data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverage = (metric: keyof InsightData) => {
    const sum = insightData.reduce(
      (acc, data) => acc + (data[metric] as number),
      0
    );
    return (sum / insightData.length).toFixed(2);
  };

  const updateChart = (data: InsightData[]) => {
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
              label: "Profit Factor",
              data: data.map((d) => d.profitFactor),
              borderColor: "#8884d8",
              yAxisID: "y-axis-1",
            },
            {
              label: "Sharpe Ratio",
              data: data.map((d) => d.sharpeRatio),
              borderColor: "#82ca9d",
              yAxisID: "y-axis-1",
            },
            {
              label: "Max Drawdown",
              data: data.map((d) => d.maxDrawdown),
              borderColor: "#ff7300",
              yAxisID: "y-axis-2",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            "y-axis-1": {
              type: "linear",
              display: true,
              position: "left",
            },
            "y-axis-2": {
              type: "linear",
              display: true,
              position: "right",
              grid: {
                drawOnChartArea: false,
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
        Performance Insights
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Avg Profit Factor</h2>
          <p className="text-3xl font-bold text-blue-500">
            {calculateAverage("profitFactor")}
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Avg Sharpe Ratio</h2>
          <p className="text-3xl font-bold text-green-500">
            {calculateAverage("sharpeRatio")}
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Max Drawdown</h2>
          <p className="text-3xl font-bold text-red-500">
            {calculateAverage("maxDrawdown")}%
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Performance Metrics Over Time
        </h2>
        <div style={{ width: "100%", height: "400px" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </Card>
    </div>
  );
};

export default InsightsPage;
