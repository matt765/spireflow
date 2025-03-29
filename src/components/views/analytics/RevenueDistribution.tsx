import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { BlockTitle } from "../../common/BlockTitle";
import { BaseTooltip } from "../../common/BaseTooltip";
import {
  RevenueDistributionProps,
  RevenueDistributionTooltipProps,
} from "./types";

const RevenueDistributionTooltip: React.FC<RevenueDistributionTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  const inStoreEntry = payload.find((p) => p.dataKey === "inStore");
  const onlineEntry = payload.find((p) => p.dataKey === "online");

  return (
    <BaseTooltip title={label}>
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
            ${Intl.NumberFormat("us").format(inStoreEntry.value ?? 0)}
          </span>
        </p>
      )}
      {onlineEntry && (
        <p className="px-3 pb-1 text-primaryText dark:text-primaryTextDark flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: onlineEntry.color }}
            />
            {`${onlineEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(onlineEntry.value ?? 0)}
          </span>
        </p>
      )}
    </BaseTooltip>
  );
};

const CustomLegend: React.FC<any> = (props) => {
  const { payload } = props;
  const tDevices = useTranslations("analytics.revenueDistribution");

  return (
    <div className="flex flex-row justify-end gap-8 text-white w-full mb-6">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{tDevices(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

export const RevenueDistribution: React.FC<RevenueDistributionProps> = ({
  revenueDistributionData,
}) => {
  const t = useTranslations("analytics.revenueDistribution");

  const translatedData = revenueDistributionData.map((item) => ({
    ...item,
    category: t(item.category.toLowerCase()),
  }));

  return (
    <Card className="h-full" id="revenueDistribution">
      <BlockTitle title={t("title")} />
      <div className="w-full h-[20rem] mt-8 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={translatedData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke="rgba(255,255,255,0.1)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
            />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <Tooltip
              content={<RevenueDistributionTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar
              dataKey="inStore"
              name={t("inStore")}
              stackId="a"
              fill="rgb(83,133,198)"
              radius={[0, 4, 4, 0]}
              barSize={30}
            />
            <Bar
              dataKey="online"
              name={t("online")}
              stackId="a"
              fill="rgb(86,92,101)"
              radius={[0, 4, 4, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
