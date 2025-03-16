"use client";
import React from "react";
import { Card } from "../../common/Card";
import { BlockTitle } from "../../common/BlockTitle";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RevenueOverTimeProps } from "./types";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { useTranslations } from "next-intl";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useTheme } from "next-themes";
import { useChartColors } from "../../../hooks/useChartColors";

interface RevenueOverTimeTooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  dataKey?: string;
}

interface RevenueOverTimeTooltipProps {
  active?: boolean;
  payload?: RevenueOverTimeTooltipPayloadItem[];
  label?: string;
}

const RevenueOverTimeTooltip: React.FC<RevenueOverTimeTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  const websiteEntry =
    payload.find((p) => p.dataKey === "websiteSales") || payload[0];
  const inStoreEntry =
    payload.find((p) => p.dataKey === "inStoreSales") || payload[1];

  return (
    <BaseTooltip title={label}>
      {websiteEntry && (
        <p className="px-3 pb-1 text-primaryText dark:text-primaryTextDark flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: websiteEntry.color }}
            />
            {`${websiteEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(websiteEntry.value)}
          </span>
        </p>
      )}
      {inStoreEntry && (
        <p className="px-3 pb-1 text-primaryText dark:text-primaryTextDark flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: inStoreEntry.color }}
            />
            {`${inStoreEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(inStoreEntry.value)}
          </span>
        </p>
      )}
    </BaseTooltip>
  );
};

interface CustomLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
  }>;
}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6">
      {payload?.map(
        (entry: { value: string; color?: string }, index: number) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 mr-2 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.value}</span>
          </div>
        )
      )}
    </div>
  );
};

export const RevenueOverTime: React.FC<RevenueOverTimeProps> = ({
  revenueOverTimeData,
}) => {
  const t = useTranslations("homepage.revenueOverTime");
  const backendTranslations = useBackendTranslations(
    "homepage.revenueOverTime"
  );

  const translatedData = useTranslateData(
    revenueOverTimeData,
    backendTranslations
  );

  const { theme } = useTheme();

  const chartColors = useChartColors(
    theme as "charcoal" | "dark" | "obsidian" | "light"
  );

  return (
    <Card className="h-full" id="revenueOverTime">
      <div className="p-1">
        <BlockTitle title={t("title")} />
      </div>
      <div className="h-[20rem] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={translatedData}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorWebsite" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartColors.primary.disabled}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={chartColors.primary.disabled}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorInStore" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartColors.primary.fill}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={chartColors.primary.fill}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
            />
            <Tooltip
              content={<RevenueOverTimeTooltip />}
              isAnimationActive={false}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              content={<CustomLegend />}
            />
            <Area
              type="linear"
              dataKey="websiteSales"
              name={t("websiteSales")}
              stroke={chartColors.primary.disabled}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorWebsite)"
              isAnimationActive={false}
            />
            <Area
              type="linear"
              dataKey="inStoreSales"
              name={t("inStoreSales")}
              stroke={chartColors.primary.fill}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInStore)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
