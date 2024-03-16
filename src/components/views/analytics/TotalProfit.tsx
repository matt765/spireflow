"use client";

import {
  Card,
  ProgressBar,
  Text,
  Flex,
  Metric,
  BadgeDelta,
  AreaChart,
} from "@tremor/react";
import { useTranslations } from "next-intl";

import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { TotalProfitProps } from "./types";

export const TotalProfit = ({
  totalProfitProducts,
  totalProfitSales,
}: TotalProfitProps) => {
  const t = useTranslations("analytics.totalProfit");
  const backendTranslations = useBackendTranslations("analytics.totalProfit");
  const translatedData = useTranslateData(
    totalProfitSales,
    backendTranslations
  );

  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Card className="w-full mx-auto  recharts-tooltip-stable">
      <Flex alignItems="start">
        <Text>{t("title")}</Text>
        <BadgeDelta deltaType="moderateIncrease">23.1%</BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-3 truncate"
      >
        <Metric>$ 442,276</Metric>
        <Text>{t("thisYear")}</Text>
      </Flex>
      <AreaChart
        className="mt-10 h-48"
        data={translatedData}
        index="month"
        categories={[t("sales")]}
        colors={["blue"]}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        valueFormatter={valueFormatter}
      />
      {totalProfitProducts.map((item: any) => (
        <div key={item.title} className="mt-4 space-y-2">
          <Flex>
            <Text>{item.title}</Text>
            <Text>{`${item.value}% (${item.metric})`}</Text>
          </Flex>
          <ProgressBar value={item.value} />
        </div>
      ))}
    </Card>
  );
};
