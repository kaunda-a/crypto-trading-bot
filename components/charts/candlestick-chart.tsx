// components/charts/candlestick-chart.tsx
import React, { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, TimeScale, LinearScale } from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
  OhlcElement,
} from "chartjs-chart-financial";

Chart.register(
  CandlestickController,
  CandlestickElement,
  OhlcElement,
  TimeScale,
  LinearScale
);

interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  data: CandlestickData[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const config: ChartConfiguration<"candlestick"> = {
          type: "candlestick",
          data: {
            datasets: [
              {
                label: "OHLC",
                data: data.map((item) => ({
                  x: new Date(item.date).getTime(),
                  o: item.open,
                  h: item.high,
                  l: item.low,
                  c: item.close,
                })),
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                },
              },
              y: {
                beginAtZero: false,
              },
            },
          },
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};
export default CandlestickChart;
