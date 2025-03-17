"use client";
import React from "react";
import { Card } from "../../common/Card";
import { useTranslations } from "next-intl";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { BestSellingProductsProps } from "./types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BlockTitle } from "../../common/BlockTitle";
import { BaseTooltip } from "../../common/BaseTooltip";
import { useTheme } from "next-themes";
import { useChartColors } from "../../../hooks/useChartColors";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    color?: string;
    dataKey?: string;
  }>;
  label?: string;
}

const CustomLegend: React.FC<{
  payload?: Array<{ value: string; color?: string }>;
}> = ({ payload }) => {
  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6">
      {payload?.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-primaryText dark:text-primaryTextDark">{entry.value.split(" ")[0]}</span>
        </div>
      ))}
    </div>
  );
};

const BestSellingTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || !payload.length || !label) return null;

  return (
    <BaseTooltip title={label}>
      {payload.map((entry, index) => (
        <p
          key={`item-${index}`}
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
            ${Intl.NumberFormat("us").format(entry.value ?? 0)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

export const BestSellingProducts: React.FC<BestSellingProductsProps> = ({
  bestSellingProductsData,
}) => {
  const t = useTranslations("homepage.bestSellingProducts");

  const translations = {
    "Profit from last week": t("profitFromLastWeek"),
    "Revenue from last week": t("revenueFromLastWeek"),
  };

  const translatedData = useTranslateData(
    bestSellingProductsData,
    translations
  );

  const chartData = translatedData.map((product: any) => ({
    name: product.name,
    [t("profitFromLastWeek")]: product.profit,
    [t("revenueFromLastWeek")]: product.revenue,
  }));

  const { theme } = useTheme();

  const chartColors = useChartColors(
    theme as "charcoal" | "dark" | "obsidian" | "light"
  );

  return (
    <Card className="h-full" id="bestsellingProducts">
      <BlockTitle title={t("title")} />
      <div className="h-[350px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <Legend
              verticalAlign="top"
              align="center"
              content={<CustomLegend />}
            />
            <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "white", fontSize: "0.8rem" }}
            />
            <YAxis
              tick={{ fill: "white", fontSize: "0.8rem" }}
              tickFormatter={(value) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
              domain={[
                0,
                (dataMax: number) => Math.ceil(dataMax / 1000) * 1000,
              ]}
            />
            <Tooltip
              content={<BestSellingTooltip />}
              isAnimationActive={false}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar
              dataKey={t("profitFromLastWeek")}
              fill={chartColors.secondary.fill}
              radius={[4, 4, 0, 0]}
              barSize={30}
              isAnimationActive={false}
            />
            <Bar
              dataKey={t("revenueFromLastWeek")}
              fill={chartColors.primary.fill}
              radius={[4, 4, 0, 0]}
              barSize={30}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
