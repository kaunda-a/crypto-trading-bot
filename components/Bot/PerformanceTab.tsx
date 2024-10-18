"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Chart from "chart.js/auto";
import { fetchPerformanceMetrics } from "./TradingFunctions";

const PerformanceTab: React.FC = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const loadPerformanceMetrics = async () => {
    setLoading(true);
    try {
      const metrics = await fetchPerformanceMetrics();
      setPerformanceMetrics(metrics);
      updateChart(metrics.profitHistory);
      toast.success("Performance metrics loaded successfully!");
    } catch (error) {
      console.error("Error fetching performance metrics:", error);
      toast.error("Failed to fetch performance metrics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPerformanceMetrics();
  }, []);

  const updateChart = (data: any[]) => {
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Performance Metrics</h2>
      <Button onClick={loadPerformanceMetrics} disabled={loading}>
        {loading ? "Loading..." : "Refresh Metrics"}
      </Button>
      {performanceMetrics ? (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold">Total Profit</h3>
              <p className="text-2xl">
                {performanceMetrics.totalProfit.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold">Win Rate</h3>
              <p className="text-2xl">
                {(performanceMetrics.winRate * 100).toFixed(2)}%
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold">Total Trades</h3>
              <p className="text-2xl">{performanceMetrics.totalTrades}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold">Sharpe Ratio</h3>
              <p className="text-2xl">
                {performanceMetrics.sharpeRatio.toFixed(2)}
              </p>
            </div>
          </div>
          <canvas ref={chartRef} width={600} height={300}></canvas>
        </div>
      ) : (
        <p>
          No performance data available. Click "Refresh Metrics" to load data.
        </p>
      )}
    </div>
  );
};

export default PerformanceTab;
