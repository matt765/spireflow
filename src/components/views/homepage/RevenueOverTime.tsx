"use client";

import { AreaChart } from "@tremor/react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { BlockTitle } from "../../common/BlockTitle";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { RevenueOverTimeProps } from "./types";
import { Card } from "../../common/Card";

export const RevenueOverTime = ({
  revenueOverTimeData,
}: RevenueOverTimeProps) => {
  const t = useTranslations("homepage.revenueOverTime");

  const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

  const translations = {
    Jan: t("jan"),
    Feb: t("feb"),
    Mar: t("mar"),
    Apr: t("apr"),
    May: t("may"),
    Jun: t("jun"),
    Jul: t("jul"),
    Aug: t("aug"),
    Sep: t("sep"),
    Oct: t("oct"),
    Nov: t("nov"),
    Dec: t("dec"),
    websiteSales: t("websiteSales"),
    inStoreSales: t("inStoreSales"),
  };

  const translatedData = useTranslateData(revenueOverTimeData, translations);

  const { theme } = useTheme();

  const colorSchemes: { [key: string]: string[] } = {
    sandstone: ["gray", "yellow"],
    midnight: ["indigo", "cyan"],
    oceanic: ["gray", "blue"],
    charcoal: ["gray", "green"],
    sapphire: ["gray", "purple"],
  };

  const defaultTheme = "midnight";

  const selectedColors = colorSchemes[theme || defaultTheme];

  return (
    <Card className="h-full chart-text-class">
      <div className="p-1">
        <BlockTitle title={t("title")} />
      </div>
      <AreaChart
        data={translatedData}
        categories={[t("websiteSales"), t("inStoreSales")]}
        index="date"
        colors={selectedColors}
        valueFormatter={dataFormatter}
        className="mt-4 h-72"
        lang="PL"
        translate="yes"
        intervalType="preserveStartEnd"
      />
    </Card>
  );
};
