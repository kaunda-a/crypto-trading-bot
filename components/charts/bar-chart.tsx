// components/charts/bar-chart.tsx
import React from "react";
import { ResponsiveBar } from "@nivo/bar";

interface BarChartProps {
  data: Array<{ [key: string]: string | number }>;
  keys: string[];
  indexBy: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  padding?: number;
  colors?: string | Function | string[];
  axisBottom?: {
    legend: string;
    legendPosition: "middle" | "start" | "end";
    legendOffset: number;
  };
  axisLeft?: {
    legend: string;
    legendPosition: "middle" | "start" | "end";
    legendOffset: number;
  };
  labelSkipWidth?: number;
  labelSkipHeight?: number;
  animate?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  keys,
  indexBy,
  margin = { top: 50, right: 130, bottom: 50, left: 60 },
  padding = 0.3,
  colors = { scheme: "nivo" } as any,
  axisBottom = {
    legend: "Categories",
    legendPosition: "middle",
    legendOffset: 32,
  },
  axisLeft = { legend: "Values", legendPosition: "middle", legendOffset: -40 },
  labelSkipWidth = 12,
  labelSkipHeight = 12,
  animate = true,
}) => {
  return (
    <div style={{ height: "400px" }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={margin}
        padding={padding}
        colors={colors}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          ...axisBottom,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          ...axisLeft,
        }}
        labelSkipWidth={labelSkipWidth}
        labelSkipHeight={labelSkipHeight}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={animate}
      />
    </div>
  );
};
export default BarChart;
