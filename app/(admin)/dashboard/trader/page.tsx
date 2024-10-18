"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";

interface TradeData {
  timestamp: number;
  price: number;
  volume: number;
}

const TraderPage: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const [tradeAmount, setTradeAmount] = useState("");
  const [tradeData, setTradeData] = useState<TradeData[]>([]);
  const [openOrders, setOpenOrders] = useState<any[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    fetchTradeData();
    fetchOpenOrders();
    const interval = setInterval(fetchTradeData, 5000);
    return () => clearInterval(interval);
  }, [selectedPair]);

  const fetchTradeData = async () => {
    try {
      const response = await axios.get(`/api/market-data?pair=${selectedPair}`);
      setTradeData(response.data);
      updateChart(response.data);
    } catch (error) {
      console.error("Error fetching trade data:", error);
    }
  };

  const fetchOpenOrders = async () => {
    try {
      const response = await axios.get("/api/open-orders");
      setOpenOrders(response.data);
    } catch (error) {
      console.error("Error fetching open orders:", error);
    }
  };

  const handleTrade = async (action: "buy" | "sell") => {
    try {
      await axios.post("/api/trade", {
        pair: selectedPair,
        amount: tradeAmount,
        action,
      });
      fetchOpenOrders();
      setTradeAmount("");
    } catch (error) {
      console.error("Error executing trade:", error);
    }
  };

  const updateChart = (data: TradeData[]) => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
          datasets: [
            {
              label: "Price",
              data: data.map((d) => d.price),
              borderColor: "#8884d8",
              yAxisID: "y-axis-1",
            },
            {
              label: "Volume",
              data: data.map((d) => d.volume),
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-theme-800 dark:text-theme-200 mb-6">
        Trader Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
          <div style={{ width: "100%", height: "300px" }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Trade Execution</h2>
          <div className="space-y-4">
            <CustomSelect
              value={selectedPair}
              onChange={(value) => setSelectedPair(value)}
              className="w-full"
            >
              <option value="BTC/USDT">BTC/USDT</option>
              <option value="ETH/USDT">ETH/USDT</option>
              <option value="ADA/USDT">ADA/USDT</option>
            </CustomSelect>
            <Input
              type="number"
              placeholder="Amount"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
            />
            <div className="flex space-x-4">
              <Button
                onClick={() => handleTrade("buy")}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                Buy
              </Button>
              <Button
                onClick={() => handleTrade("sell")}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Sell
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Open Orders</h2>
        <Table>
          <thead>
            <tr>
              <th>Pair</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {openOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.pair}</td>
                <td>{order.type}</td>
                <td>{order.amount}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default TraderPage;
