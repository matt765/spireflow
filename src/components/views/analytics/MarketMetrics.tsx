import React from "react";
import { useTheme } from "next-themes";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { BlockTitle } from "../../common/BlockTitle";
import { BaseTooltip } from "../../common/BaseTooltip";
import { MarketMetricsProps, MarketMetricsTooltipProps } from "./types";
import { useChartColors } from "../../../hooks/useChartColors";

const MarketMetricsTooltip: React.FC<MarketMetricsTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const tMetrics = useTranslations("analytics.marketMetrics.metrics");

  const translateMetric = (key: string): string => {
    const cleanKey = key.replace("analytics.marketMetrics.metrics.", "");
    return tMetrics(cleanKey);
  };

  if (!active || !payload || !payload.length || !label) return null;

  const tooltipTitle = translateMetric(label);

  return (
    <BaseTooltip title={tooltipTitle}>
      {payload.map((entry, index) => {
        const entryName = entry.name ? translateMetric(entry.name) : "";
        const formattedValue = `${entry.value}%`;
        return (
          <p
            key={`marketmetrics-tooltip-${index}`}
            className="px-3 pb-1 text-primaryText dark:text-primaryTextDark flex items-center justify-between"
          >
            <span>
              <span
                className="w-2 h-2 mr-2 rounded inline-block"
                style={{ backgroundColor: entry.color }}
              />
              {`${entryName}:   `}
            </span>
            <span className="pl-[0.7rem]">{formattedValue}</span>
          </p>
        );
      })}
    </BaseTooltip>
  );
};

const CustomLegend: React.FC<any> = (props) => {
  const { payload } = props;
  const tMetrics = useTranslations("analytics.marketMetrics.metrics");

  const translateMetric = (key: string) => {
    const cleanKey = key.replace("analytics.marketMetrics.metrics.", "");
    return tMetrics(cleanKey);
  };

  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-primaryText dark:text-primaryTextDark">
            {translateMetric(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export const MarketMetrics: React.FC<MarketMetricsProps> = ({
  marketMetricsData,
}) => {
  const t = useTranslations("analytics.marketMetrics");
  const tMetrics = useTranslations("analytics.marketMetrics.metrics");

  const translateMetric = (key: string) => {
    const cleanKey = key.replace("analytics.marketMetrics.metrics.", "");
    return tMetrics(cleanKey);
  };

  const { theme } = useTheme();

  const chartColors = useChartColors(
    theme as "charcoal" | "dark" | "obsidian" | "light"
  );

  return (
    <Card className="h-full" id="marketMetrics">
      <BlockTitle title={t("title")} />
      <div className="w-full h-[24rem]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={marketMetricsData}
          >
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={translateMetric}
            />
            <Tooltip content={<MarketMetricsTooltip />} />
            <Radar
              name="profitMargin"
              dataKey="phones"
              stroke="rgb(83,133,198)"
              fill="rgb(83,133,198)"
              fillOpacity={0.3}
            />
            <Radar
              name="salesVolume"
              dataKey="laptops"
              stroke={chartColors.primary.stroke}
              fill={chartColors.primary.stroke}
              fillOpacity={0.3}
            />
            <Legend
              verticalAlign="top"
              align="center"
              content={<CustomLegend />}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
