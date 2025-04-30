import {
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
import { ProductProfit, TotalProfitProps } from "./types";
import { Card } from "../../common/Card";

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
    <Card className="w-full mx-auto recharts-tooltip-stable" id="totalProfit" customHeader>
      <Flex alignItems="start">
        <Text>{t("title")}</Text>
        <BadgeDelta deltaType="moderateIncrease">23.1%</BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-3 truncate"
      >
        <Metric className="text-2xl 3xl:text-3xl">$ 442,276</Metric>
        <Text>{t("thisYear")}</Text>
      </Flex>
      <AreaChart
        className="mt-8 3xl:mt-10 h-48 1xl:h-44 3xl:h-48"
        data={translatedData}
        index="month"
        categories={[t("sales")]}
        colors={["blue"]}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        valueFormatter={valueFormatter}
      />
      {totalProfitProducts.map((item: ProductProfit, index: number) => (
        <div
          key={item.title}
          className={`mt-4 space-y-2 
            ${index === 0 ? "hidden 1xl:block" : ""}
            ${index === 1 ? "hidden 1xl:block" : ""}
            ${index === 2 ? "hidden 3xl:block" : ""}
          `}
        >
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
