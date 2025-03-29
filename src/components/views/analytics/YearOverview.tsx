import React from "react";
import { useTranslations } from "next-intl";
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
import { useTheme } from "next-themes";

import { Card } from "../../common/Card";
import { BlockTitle } from "../../common/BlockTitle";
import { BaseTooltip } from "../../common/BaseTooltip";
import { OverviewMonthData, YearOverviewProps } from "./types";
import { useChartColors } from "../../../hooks/useChartColors";

export interface DataPoint {
  name: string;
  Phones: number;
  Tablets: number;
  Laptops: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

interface CustomLegendProps {
  payload?: Array<{ value: string; color: string }>;
}

const YearOverviewTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const t = useTranslations("analytics.yearOverview");

  if (!active || !payload || !payload.length || !label) return null;

  return (
    <BaseTooltip title={label}>
      {payload.map((entry, index) => (
        <p
          key={`yearoverview-tooltip-${index}`}
          className="px-3 pb-1 text-primaryText dark:text-primaryTextDark flex items-center justify-between"
        >
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: entry.color }}
            />
            {`${t(entry.name.toLowerCase())}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(entry.value)}
          </span>
        </p>
      ))}
    </BaseTooltip>
  );
};

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  const tDevices = useTranslations("analytics.yearOverview");

  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6">
      {payload?.map((entry, index) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-primaryText dark:text-primaryTextDark">
            {tDevices(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const DataTable: React.FC<{ data: OverviewMonthData[] }> = ({ data }) => {
  const t = useTranslations("analytics.yearOverview");
  const lastSixMonths = data.slice(-8);

  return (
    <div className="overflow-auto h-[24rem] mr-8 mt-2">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-secondaryText dark:text-secondaryTextDark text-xs text-left text-base pl-4 py-3 border-b border-inputBorder dark:border-inputBorderDark">
              {t("month")}
            </th>
            <th className="text-secondaryText dark:text-secondaryTextDark text-xs text-left text-base pl-4 py-3 border-b border-inputBorder dark:border-inputBorderDark">
              {t("phones")}
            </th>
            <th className="text-secondaryText dark:text-secondaryTextDark text-xs text-left text-base pl-4 py-3 border-b border-inputBorder dark:border-inputBorderDark">
              {t("laptops")}
            </th>
          </tr>
        </thead>
        <tbody>
          {lastSixMonths.map((row) => (
            <tr key={row.name} className="hover:bg-[rgb(255,255,255,0.03)]">
              <td className="text-tableCellText dark:text-primaryTextDark font-medium text-sm p-2 pl-4 border-b border-inputBorder dark:border-inputBorderDark">
                {row.name}
              </td>
              <td className="text-tableCellText dark:text-primaryTextDark font-medium text-sm pl-4 border-b border-inputBorder dark:border-inputBorderDark text-left">
                ${Intl.NumberFormat("us").format(row.phones)}
              </td>
              <td className="text-tableCellText dark:text-primaryTextDark font-medium text-sm pl-4 border-b border-inputBorder dark:border-inputBorderDark text-left">
                ${Intl.NumberFormat("us").format(row.laptops)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const YearOverview: React.FC<YearOverviewProps> = ({
  yearOverviewData,
}) => {
  const t = useTranslations("analytics.yearOverview");

  const translatedData = yearOverviewData.map((item) => ({
    ...item,
    name: t(item.name.toLowerCase()),
  }));

  const { theme } = useTheme();

  const chartColors = useChartColors(
    theme as "charcoal" | "dark" | "obsidian" | "light"
  );

  return (
    <Card className="h-full" id="yearOverview">
      <BlockTitle title={t("title")} />
      <div className="flex gap-8">
        <div className="w-3/4 h-[24rem]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={translatedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPhones" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="rgb(83,133,198)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="rgb(83,133,198)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorLaptops" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartColors.primary.stroke}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartColors.primary.stroke}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.1)"
                tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              />
              <YAxis
                stroke="rgba(255,255,255,0.1)"
                tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
                tickFormatter={(value) =>
                  `${Intl.NumberFormat("us").format(value)}`
                }
                domain={[
                  0,
                  (dataMax: number) => Math.ceil(dataMax / 1000) * 1000,
                ]}
              />
              <Tooltip
                content={<YearOverviewTooltip />}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Legend
                verticalAlign="top"
                align="center"
                content={<CustomLegend />}
              />
              <Area
                name="phones"
                type="monotone"
                dataKey="phones"
                stroke="rgb(83,133,198)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPhones)"
              />
              <Area
                name="laptops"
                type="monotone"
                dataKey="laptops"
                stroke={chartColors.primary.stroke}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLaptops)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/4">
          <DataTable data={translatedData} />
        </div>
      </div>
    </Card>
  );
};
