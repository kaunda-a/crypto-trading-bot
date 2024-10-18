"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { toast } from "react-toastify";
import Chart from "chart.js/auto";
import { fetchMarketData } from "./TradingFunctions";

const AIPredictionsTab: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState("");
  const [predictionTimeframe, setPredictionTimeframe] = useState("1h");
  const [predictionData, setPredictionData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const timeframes = ["1h", "4h", "1d", "1w"];

  const getPredictiveAnalysis = async () => {
    setLoading(true);
    try {
      const marketData = await fetchMarketData(
        "YourExchangeHere",
        selectedPair
      );

      const response = await fetch("/api/ai-predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pair: selectedPair,
          timeframe: predictionTimeframe,
          marketData: marketData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI predictions");
      }

      const predictions = await response.json();
      setPredictionData(predictions);
      toast.success("AI predictions generated successfully!");
      updateChart(predictions.priceForecasts);
    } catch (error) {
      console.error("Error fetching AI predictions:", error);
      toast.error("Failed to generate AI predictions. Please try again.");
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
          labels: data.map((d) => d.timestamp),
          datasets: [
            {
              label: "Actual Price",
              data: data.map((d) => d.price),
              borderColor: "#8884d8",
              fill: false,
            },
            {
              label: "Predicted Price",
              data: data.map((d) => d.predictedPrice),
              borderColor: "#82ca9d",
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
                text: "Timestamp",
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

  useEffect(() => {
    if (selectedPair && predictionTimeframe) {
      getPredictiveAnalysis();
    }
  }, [selectedPair, predictionTimeframe]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI-Powered Price Predictions</h2>
      <Select
        value={selectedPair}
        onValueChange={(value) => setSelectedPair(value)}
      >
        <option value="">Select Trading Pair</option>
        {/* Add your trading pairs here */}
      </Select>
      <Select
        value={predictionTimeframe}
        onValueChange={(value) => setPredictionTimeframe(value)}
      >
        {timeframes.map((tf) => (
          <option key={tf} value={tf}>
            {tf}
          </option>
        ))}
      </Select>
      <Button onClick={getPredictiveAnalysis} disabled={loading}>
        {loading ? "Generating Predictions..." : "Generate AI Predictions"}
      </Button>
      {predictionData && (
        <div>
          <h3 className="text-xl font-semibold">AI Predictions</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Predicted Direction</h4>
              <p className="text-2xl">{predictionData.direction}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Confidence Level</h4>
              <p className="text-2xl">
                {(predictionData.confidence * 100).toFixed(2)}%
              </p>
            </div>
          </div>
          <canvas ref={chartRef} width={600} height={300}></canvas>
        </div>
      )}
    </div>
  );
};

export default AIPredictionsTab;
