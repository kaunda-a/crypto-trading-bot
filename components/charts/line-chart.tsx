// components/charts/line-chart.tsx
import React from "react";
import { ResponsiveLine } from "@nivo/line";

interface LineChartProps {
  data: {
    id: string;
    color: string;
    data: Array<{ x: string | number; y: number }>;
  }[];
  xScale?: { type: "point" | "linear" | "time" };
  yScale?: { type: "linear" | "log" };
  axisBottom?: { legend: string; legendOffset: number };
  axisLeft?: { legend: string; legendOffset: number };
  enablePoints?: boolean;
  useMesh?: boolean;
  animate?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  xScale = { type: "point" },
  yScale = { type: "linear" },
  axisBottom = { legend: "X Axis", legendOffset: 36 },
  axisLeft = { legend: "Y Axis", legendOffset: -40 },
  enablePoints = true,
  useMesh = true,
  animate = true,
}) => {
  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={xScale}
        yScale={yScale}
        axisBottom={{
          ...axisBottom,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          ...axisLeft,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        enablePoints={enablePoints}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        useMesh={useMesh}
        enableSlices="x"
        animate={animate}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
export default LineChart;
