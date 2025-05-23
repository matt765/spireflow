import React from "react";
import { useTranslations } from "next-intl";
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
import { useTheme } from "next-themes";

import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import {
  PerformanceCustomLegendProps,
  PerformanceCustomXAxisTickProps,
  PerformanceProps,
  PerformanceTooltipProps,
} from "./types";
import { useChartColors } from "../../../hooks/useChartColors";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

const PerformanceTooltip = ({
  active,
  payload,
  label,
}: PerformanceTooltipProps) => {
  const t = useTranslations("analytics.performance");

  if (!active || !payload || !payload.length || !label) return null;

  const translatedLabel = t(label.toLowerCase());

  return (
    <BaseTooltip title={translatedLabel}>
      {payload.map((entry, index) => (
        <p
          key={`performance-tooltip-${index}`}
          className="px-3 pb-1 text-primaryText flex items-center justify-between"
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

const CustomLegend = ({ payload }: PerformanceCustomLegendProps) => {
  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-primaryText">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomXAxisTick = ({
  x,
  y,
  payload,
}: PerformanceCustomXAxisTickProps) => {
  const t = useTranslations("analytics.performance");

  const originalMonth = payload?.value || "";
  const translatedMonth = t(originalMonth.toLowerCase());

  return (
    <text
      x={x}
      y={y}
      dy={16}
      textAnchor="middle"
      fill="white"
      fontSize="0.8rem"
    >
      {translatedMonth}
    </text>
  );
};

export const Performance = ({ performanceData }: PerformanceProps) => {
  const t = useTranslations("analytics.performance");

  const { theme } = useTheme();

  const chartColors = useChartColors(
    theme as "charcoal" | "midnight" | "obsidian" | "snowlight"
  );

  const { width: windowWidth } = useWindowDimensions();

  const getBarSize = () => {
    if (windowWidth > 1180) return 24;
    if (windowWidth > 720) return 18;
    if (windowWidth > 600) return 15;
    return 10;
  };

  const chartData =
    windowWidth > 500 ? performanceData.slice(-9) : performanceData.slice(-4);

  return (
    <Card className="performanceCard" id="performance" title={t("title")}>
      {/* <p className="text-sm hidden sm:block text-secondaryText">
          {t("subtitle")}
        </p> */}

      <div className="h-[16rem] 1xl:h-[21rem] 3xl:h-[24rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: windowWidth > 500 ? 30 : 15,
              left: windowWidth > 500 ? 20 : 7,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke={chartColors.primary.grid}
            />
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
              barSize={getBarSize()}
              minPointSize={5}
              isAnimationActive={false}
            />
            <Bar
              dataKey="profit"
              name={t("profit")}
              // fill="rgb(61,185,133)"
              fill={chartColors.primary.stroke}
              radius={[4, 4, 0, 0]}
              barSize={getBarSize()}
              minPointSize={5}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
