"use client";

import { BarChart } from "@tremor/react";
import { useTranslations } from "next-intl";

import { BlockTitle } from "../../common/BlockTitle";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { BestSellingProductsProps } from "./types";
import { Card } from "../../common/Card";

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
