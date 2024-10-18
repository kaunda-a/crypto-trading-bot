"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import Chart from "chart.js/auto";
import {
  fetchHistoricalData,
  implementTradingStrategy,
  calculateProfit,
} from "./TradingFunctions";

const BacktestTab: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [backtestResults, setBacktestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const runBacktest = async () => {
    setLoading(true);
    try {
      const historicalData = await fetchHistoricalData(
        selectedPair,
        startDate,
        endDate
      );
      const filteredData = historicalData.filter(
        (data: { date: string | number | Date }) =>
          new Date(data.date) >= new Date(startDate) &&
          new Date(data.date) <= new Date(endDate)
      );

      let balance = parseFloat(initialBalance);
      let position = 0;

      const results = filteredData.map((data: any, index: number) => {
        const signal = implementTradingStrategy(
          data,
          filteredData.slice(0, index)
        );
        let profit = 0;

        if (signal === "buy" && position === 0) {
          position = balance / data.price;
          balance = 0;
        } else if (signal === "sell" && position > 0) {
          balance = position * data.price;
          profit =
            calculateProfit("sell", data.price, filteredData[index - 1].price) *
            position;
          position = 0;
        }

        return {
          date: data.date,
          price: data.price,
          signal: signal,
          balance: balance + position * data.price,
          profit: profit,
        };
      });

      const totalProfit =
        results[results.length - 1].balance - parseFloat(initialBalance);
      const winRate =
        results.filter((r: { profit: number }) => r.profit > 0).length /
        results.length;

      setBacktestResults({
        results: results,
        totalProfit: totalProfit,
        winRate: winRate,
      });

      updateChart(results);
      toast.success("Backtest completed successfully!");
    } catch (error) {
      console.error("Error running backtest:", error);
      toast.error("Failed to run backtest. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              label: "Price",
              data: data.map((d) => d.price),
              borderColor: "#8884d8",
              yAxisID: "y-axis-1",
            },
            {
              label: "Balance",
              data: data.map((d) => d.balance),
              borderColor: "#82ca9d",
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Backtest Your Strategy</h2>
      <Select
        value={selectedPair}
        onValueChange={(value) => setSelectedPair(value)}
        required
      >
        <option value="">Select Trading Pair</option>
        {/* Add your trading pairs here */}
      </Select>
      <Input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start Date"
        required
      />
      <Input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="End Date"
        required
      />
      <Input
        type="number"
        value={initialBalance}
        onChange={(e) => setInitialBalance(e.target.value)}
        placeholder="Initial Balance"
        required
      />
      <Button onClick={runBacktest} disabled={loading}>
        {loading ? "Running Backtest..." : "Run Backtest"}
      </Button>
      {backtestResults && (
        <div>
          <h3 className="text-xl font-semibold">Backtest Results</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Total Profit</h4>
              <p className="text-2xl">
                {backtestResults.totalProfit.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Win Rate</h4>
              <p className="text-2xl">
                {(backtestResults.winRate * 100).toFixed(2)}%
              </p>
            </div>
          </div>
          <canvas ref={chartRef} width={600} height={300}></canvas>
        </div>
      )}
    </div>
  );
};

export default BacktestTab;
