"use client";

import { Card, BarChart, Title, Text } from "@tremor/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";

interface MonthPerformance {
  month: string;
  sales: number;
  profit: number;
}

interface PerformanceProps {
  performanceData: MonthPerformance[];
}

export const Performance = ({ performanceData }: PerformanceProps) => {
  const t = useTranslations("analytics.performance");
  const backendTranslations = useBackendTranslations("analytics.performance");
  const translatedData = useTranslateData(performanceData, backendTranslations);

  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;
  const { theme } = useTheme();

  const colorSchemes: { [key: string]: string[] } = {
    sandstone: ["stone", "amber"],
    midnight: ["indigo", "cyan"],
    oceanic: ["purple", "slate"],
  };

  const defaultTheme = "midnight";

  const selectedColors = colorSchemes[theme || defaultTheme];

  return (
    <Card>
      <Title>{t("title")}</Title>
      <Text>{t("subtitle")}</Text>
      <BarChart
        className="mt-4 h-80"
        data={translatedData}
        index="month"
        categories={[t("sales"), t("profit")]}
        colors={selectedColors}
        stack={false}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
};
