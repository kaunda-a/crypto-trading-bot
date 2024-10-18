"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Card } from "@/components/ui/card";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { Table } from "@/components/ui/table";

interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

interface TrendData {
  date: string;
  price: number;
  volume: number;
}

const MarketAnalysisPage: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [sentiment, setSentiment] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const priceChartRef = useRef<HTMLCanvasElement>(null);
  const volumeChartRef = useRef<HTMLCanvasElement>(null);
  const priceChartInstance = useRef<Chart | null>(null);
  const volumeChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    fetchMarketData();
    fetchTrendData();
    fetchSentiment();
  }, [selectedAsset]);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/market-data");
      setMarketData(response.data);
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendData = async () => {
    try {
      const response = await axios.get(
        `/api/trend-data?asset=${selectedAsset}`
      );
      setTrendData(response.data);
      updateCharts(response.data);
    } catch (error) {
      console.error("Error fetching trend data:", error);
    }
  };

  const fetchSentiment = async () => {
    try {
      const response = await axios.get(`/api/sentiment?asset=${selectedAsset}`);
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error("Error fetching sentiment:", error);
    }
  };

  const updateCharts = (data: TrendData[]) => {
    updatePriceChart(data);
    updateVolumeChart(data);
  };

  const updatePriceChart = (data: TrendData[]) => {
    if (priceChartInstance.current) {
      priceChartInstance.current.destroy();
    }

    const ctx = priceChartRef.current?.getContext("2d");
    if (ctx) {
      priceChartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((d) => d.date),
          datasets: [
            {
              label: "Price",
              data: data.map((d) => d.price),
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
                text: "Price",
              },
            },
          },
        },
      });
    }
  };

  const updateVolumeChart = (data: TrendData[]) => {
    if (volumeChartInstance.current) {
      volumeChartInstance.current.destroy();
    }

    const ctx = volumeChartRef.current?.getContext("2d");
    if (ctx) {
      volumeChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((d) => d.date),
          datasets: [
            {
              label: "Volume",
              data: data.map((d) => d.volume),
              backgroundColor: "#82ca9d",
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
                text: "Volume",
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
        Market Analysis
      </h1>

      <CustomSelect
        value={selectedAsset}
        onChange={(value) => setSelectedAsset(value)}
        className="w-48 mb-6"
      >
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH">Ethereum (ETH)</option>
        <option value="ADA">Cardano (ADA)</option>
      </CustomSelect>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Price Trend</h2>
          <div style={{ width: "100%", height: "300px" }}>
            <canvas ref={priceChartRef}></canvas>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Volume Analysis</h2>
          <div style={{ width: "100%", height: "300px" }}>
            <canvas ref={volumeChartRef}></canvas>
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
        <Table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>24h Volume</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((asset) => (
              <tr key={asset.symbol}>
                <td>{asset.symbol}</td>
                <td>${asset.price.toFixed(2)}</td>
                <td
                  className={
                    asset.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {asset.change24h.toFixed(2)}%
                </td>
                <td>${asset.volume24h.toLocaleString()}</td>
                <td>${asset.marketCap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Market Sentiment</h2>
        <p className="text-2xl font-bold text-center">
          {sentiment === "bullish" && "🐂 Bullish"}
          {sentiment === "bearish" && "🐻 Bearish"}
          {sentiment === "neutral" && "😐 Neutral"}
        </p>
      </Card>
    </div>
  );
};

export default MarketAnalysisPage;
