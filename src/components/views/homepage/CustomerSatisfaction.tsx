"use client";

import { ScatterChart } from "@tremor/react";
import { Card } from "@tremor/react";
import { useTranslations } from "next-intl";

import { BlockTitle } from "../../common/BlockTitle";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { CustomerSatisfactionProps } from "./types";

export const CustomerSatisfaction = ({
  customerSatisfactionData,
}: CustomerSatisfactionProps) => {
  const t = useTranslations("homepage.customerSatisfaction");

  const translations = {
    totalSales: t("totalSales"),
    customerSatisfaction: t("customerSatisfaction"),
    numberOfOrders: t("numberOfOrders"),
  };

  const translatedData = useTranslateData(
    customerSatisfactionData,
    translations
  );

  const numberOfOrdersScaleFactor = 1.1;

  return (
    <Card className="max-w-full h-full max-h-full flex flex-col ">
      <BlockTitle title={t("title")} />
      <ScatterChart
        className="h-72 md:h-full mt-8"
        yAxisWidth={50}
        data={translatedData}
        category="brandName"
        x={t("totalSales")}
        y={t("customerSatisfaction")}
        size={t("numberOfOrders")}
        showOpacity={true}
        minYValue={60}
        maxYValue={100}
        valueFormatter={{
          x: (amount) => `$${(amount / 1000).toFixed(1)}K`,
          y: (lifeExp) => `${lifeExp}%`,
          size: (numberOfOrders) =>
            `${Math.round(numberOfOrders / numberOfOrdersScaleFactor)}`,
        }}
        showLegend={false}
        sizeRange={[111, 2500]}
      />
    </Card>
  );
};
