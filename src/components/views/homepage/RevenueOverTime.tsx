"use client";

import { Card, AreaChart } from "@tremor/react";

import { BlockTitle } from "../../common/BlockTitle";
import { useTheme } from "next-themes";

interface Revenue {
  date: string;
  websiteSales: number;
  inStoreSales: number;
}

interface TransformedRevenue {
  date: string;
  "Website sales": number;
  "In store sales": number;
}
interface RevenueOverTimeProps {
  revenueOverTimeData: Revenue[];
}

export const RevenueOverTime = ({
  revenueOverTimeData,
}: RevenueOverTimeProps) => {
  const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

  const transformDataKeys = (data: Revenue[]): TransformedRevenue[] => {
    return data.map(
      (item: Revenue): TransformedRevenue => ({
        date: item.date,
        "Website sales": item.websiteSales,
        "In store sales": item.inStoreSales,
      })
    );
  };

  const transformedData = transformDataKeys(revenueOverTimeData);
  const { theme } = useTheme();

  const colorSchemes: { [key: string]: string[] } = {
    sandstone: ["gray", "yellow"],
    midnight: ["indigo", "cyan"],
    oceanic: ["gray", "blue"],
    charcoal: ["gray", "green"],
    sapphire: ["gray", "purple"]
  };

  const defaultTheme = "midnight";

  const selectedColors = colorSchemes[theme || defaultTheme];

  return (
    <Card className="h-full">
      <div className="p-1">
        <BlockTitle title="Revenue over time" />
      </div>
      <AreaChart
        data={transformedData}
        categories={["Website sales", "In store sales"]}
        index="date"
        colors={selectedColors}
        valueFormatter={dataFormatter}
        className="mt-4 h-72"
      />
    </Card>
  );
};
