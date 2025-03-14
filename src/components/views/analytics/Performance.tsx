"use client";
import React from "react";
import { Card } from "../../common/Card";
import { useTranslations } from "next-intl";
import { BlockTitle } from "../../common/BlockTitle";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { BaseTooltip } from "../../common/BaseTooltip";
import { PerformanceProps } from "./types";
import { useTheme } from "next-themes";
import { useChartColors } from "../../../hooks/useChartColors";

// ---------------------
// 1) Definicja danych
// ---------------------
// interface DataItem {
//   month: string; // np. "Jan", "Feb", ...
//   sales: number;
//   profit: number;
// }

// const performanceData2: DataItem[] = [
//   { month: "Jan", sales: 2756, profit: 2234 },
//   { month: "Feb", sales: 1967, profit: 1445 },
//   { month: "Mar", sales: 3543, profit: 2367 },
//   { month: "Apr", sales: 1823, profit: 1289 },
//   { month: "May", sales: 2912, profit: 1378 },
//   { month: "Jun", sales: 2145, profit: 1687 },
//   { month: "Jul", sales: 4678, profit: 4198 },
//   { month: "Aug", sales: 1945, profit: 1534 },
//   { month: "Sep", sales: 3678, profit: 2845 },
// ];

// ---------------------
// 2) Dedykowany tooltip dla Performance
// ---------------------
interface PerformanceTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color?: string }>;
  label?: string;
}

const PerformanceTooltip: React.FC<PerformanceTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const t = useTranslations("analytics.performance");

  if (!active || !payload || !payload.length || !label) return null;

  const translatedLabel = t(label.toLowerCase());

  return (
    <BaseTooltip title={translatedLabel}>
      {payload.map((entry, index) => (
        <p
          key={`performance-tooltip-${index}`}
          className="px-3 pb-1 text-primaryText dark:text-primaryTextDark flex items-center justify-between"
        >
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: entry.color }}
            />
            {`${entry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(entry.value)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

// ---------------------
// 3) Customowa legenda
// ---------------------
interface CustomLegendProps {
  payload?: Array<{ value: string; color?: string }>;
}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// ---------------------
// 4) Customowy tick dla osi X jako komponent React
// ---------------------
interface CustomXAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

const CustomXAxisTick: React.FC<CustomXAxisTickProps> = ({ x, y, payload }) => {
  const t = useTranslations("analytics.performance");

  // payload.value np. "Jan", "Feb", ...
  const originalMonth = payload?.value || "";
  const translatedMonth = t(originalMonth.toLowerCase());

  return (
    <text
      x={x}
      y={y}
      dy={16} // przesunięcie w dół
      textAnchor="middle"
      fill="white"
      fontSize="0.8rem"
    >
      {translatedMonth}
    </text>
  );
};

// ---------------------
// 5) Główny komponent Performance
// ---------------------
export const Performance = ({ performanceData }: PerformanceProps) => {
  const t = useTranslations("analytics.performance");
  const chartData = performanceData.slice(-9);

  const { theme } = useTheme();

  const chartColors = useChartColors(
    theme as "charcoal" | "dark" | "obsidian" | "light"
  );

  return (
    <Card className="performanceCard">
      <div className="mb-0">
        <BlockTitle title={t("title")} />
        <p className="text-sm text-secondaryText">{t("subtitle")}</p>
      </div>
      <div className="h-[24rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" tick={<CustomXAxisTick />} />
            <YAxis
              tick={{ fill: "white", fontSize: "0.8rem" }}
              tickFormatter={(value: number) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
              domain={[
                0,
                (dataMax: number) => Math.ceil(dataMax / 1000) * 1000,
              ]}
            />
            <Tooltip
              content={<PerformanceTooltip />}
              isAnimationActive={false}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              content={<CustomLegend />}
            />
            <Bar
              dataKey="sales"
              name={t("sales")}
              fill="rgb(83,133,198)"
              radius={[4, 4, 0, 0]}
              barSize={24}
              minPointSize={5}
              isAnimationActive={false}
            />
            <Bar
              dataKey="profit"
              name={t("profit")}
              // fill="rgb(61,185,133)"
              fill={chartColors.primary.stroke}
              radius={[4, 4, 0, 0]}
              barSize={24}
              minPointSize={5}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
