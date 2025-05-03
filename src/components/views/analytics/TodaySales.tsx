import {
  Flex,
  Tab,
  TabList,
  Text,
  Metric,
  Legend,
  LineChart,
  TabPanels,
  TabPanel,
  TabGroup,
} from "@tremor/react";
import { useTranslations } from "next-intl";

import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { TodaySalesProps } from "./types";
import { Card } from "../../common/Card";

export const TodaySales = ({ todaySalesData }: TodaySalesProps) => {
  const t = useTranslations("analytics.todaySales");
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  const backendTranslations = useBackendTranslations("analytics.todaySales");
  const translatedData = useTranslateData(todaySalesData, backendTranslations);

  return (
    <Card
      className="w-full h-full recharts-tooltip-stable todaySalesContainer"
      id="todaysSales"
      customHeader
    >
      <Text>{t("title")}</Text>
      <Metric className="mt-1 text-xl 1xl:text-2xl 3xl:text-3xl">$ 2276</Metric>
      <TabGroup>
        <TabList defaultValue="average" className="mt-1 1xl:mt-2 3xl:mt-6">
          <Tab value="yesterday" className="!text-[12px] 1xl:!text-sm">
            {t("todayVsYesterday")}
          </Tab>
          <Tab value="average" className="!text-[12px] 1xl:!text-sm">
            {t("todayVsAverage")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LineChart
              data={translatedData}
              categories={[t("today"), t("yesterday")]}
              index="year"
              colors={["blue", "slate"]}
              showYAxis
              showLegend={false}
              valueFormatter={valueFormatter}
              className="mt-6 3xl:mt-6 h-52 lg:h-36 1xl:h-[11.5rem] 3xl:h-[16rem]"
            />
            <Flex justifyContent="end">
              <Legend
                categories={[t("today"), t("yesterday")]}
                colors={["blue", "slate"]}
                className="mt-0 1xl:mt-3"
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            <LineChart
              data={translatedData}
              categories={[t("today"), t("average")]}
              colors={["blue", "slate"]}
              index="year"
              showYAxis
              showLegend={false}
              valueFormatter={valueFormatter}
              className="mt-6 3xl:mt-6 h-52 lg:h-36 1xl:h-[11.5rem] 3xl:h-[16rem]"
            />
            <Flex justifyContent="end">
              <Legend
                categories={[t("today"), t("average")]}
                colors={["blue", "slate"]}
                className="mt-0 1xl:mt-3"
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
