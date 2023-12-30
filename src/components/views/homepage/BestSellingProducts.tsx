"use client";

import { Card, BarChart } from "@tremor/react";

import { BlockTitle } from "../../common/BlockTitle";

interface BestSellingProduct {
  name: string;
  profit: number;
}

interface BestSellingProductsProps {
  bestSellingProductsData: BestSellingProduct[];
}

interface TransformedBestSellingProduct {
  name: string;
  "Profit from last week": number;
}

export const BestSellingProducts = ({
  bestSellingProductsData,
}: BestSellingProductsProps) => {
  const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

  const transformDataKeys = (
    data: BestSellingProduct[]
  ): TransformedBestSellingProduct[] => {
    return data.map((item) => ({
      name: item.name,
      "Profit from last week": item.profit,
    }));
  };

  const transformedData = transformDataKeys(bestSellingProductsData);
  return (
    <Card className="h-full">
      <BlockTitle title="Best selling products" />
      <BarChart
        data={transformedData}
        index="name"
        categories={["Profit from last week"]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        className="mt-6"
      />
    </Card>
  );
};
