"use client";

import { Card, AreaChart } from "@tremor/react";

import { BlockTitle } from "../../common/BlockTitle";

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

  return (
    <Card className="h-full">
      <div className="p-1">
        <BlockTitle title="Revenue over time" />
      </div>
      <AreaChart
        data={transformedData}
        categories={["Website sales", "In store sales"]}
        index="date"
        colors={["indigo", "cyan"]}
        valueFormatter={dataFormatter}
        className="mt-4 h-72"
      />
    </Card>
  );
};
