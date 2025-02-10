"use client";

import { BarChart, Title, Text } from "@tremor/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { PerformanceProps } from "./types";
import { Card } from "../../common/Card";

export const Performance = ({ performanceData }: PerformanceProps) => {
  const t = useTranslations("analytics.performance");
  const backendTranslations = useBackendTranslations("analytics.performance");
  const translatedData = useTranslateData(performanceData, backendTranslations);

  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;
  const { theme } = useTheme();

  const colorSchemes: { [key: string]: string[] } = {
    obsidian: ["emerald", "blue"],
    midnight: ["indigo", "slate"],
    charcoal: ["purple", "gray"],
  };

  const defaultTheme = "midnight";

  const selectedColors = colorSchemes[theme || defaultTheme];

  return (
    <Card className="performanceCard">
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
