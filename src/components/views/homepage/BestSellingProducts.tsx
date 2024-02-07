"use client";

import { Card, BarChart } from "@tremor/react";

import { BlockTitle } from "../../common/BlockTitle";
import { useTranslations } from "next-intl";
import { useTranslateData } from "../../../hooks/useTranslateData";

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
  const t = useTranslations("homepage.bestSellingProducts");

  const translations = {
    "Profit from last week": t("profitFromLastWeek"),
  };

  const translatedData = useTranslateData(
    bestSellingProductsData,
    translations
  );

  const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <Card className="h-full">
      <BlockTitle title={t("title")} />
      <BarChart
        data={translatedData.map((product) => ({
          ...product,
          [t("profitFromLastWeek")]: product.profit,
        }))}
        index="name"
        categories={[t("profitFromLastWeek")]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        className="mt-6"
      />
    </Card>
  );
};
