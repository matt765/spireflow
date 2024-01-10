"use client";

import {
  Card,
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

import { useState } from "react";

interface TodaySalesDataUnit {
  hour: string;
  today: number;
  average: number;
  yesterday: number;
}

interface TodaySalesProps {
  todaySalesData: TodaySalesDataUnit[]
}
export const TodaySales = ({ todaySalesData }: TodaySalesProps ) => {
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Card className="w-full h-full recharts-tooltip-stable">
      <Text>Today&apos;s Sales</Text>
      <Metric className="mt-1">$ 2276</Metric>
      <TabGroup>
        <TabList defaultValue="average" className="mt-6">
          <Tab value="average">Today vs. average</Tab>
          <Tab value="yesterday">Today vs. yesterday</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LineChart
              data={todaySalesData}
              categories={["today", "yesterday"]}
              index="year"
              colors={["blue", "slate"]}
              showYAxis={false}
              showLegend={false}
              valueFormatter={valueFormatter}
              className="mt-4 h-56"
              showAnimation={true}
            />
            <Flex justifyContent="end">
              <Legend
                categories={["Today", "Yesterday"]}
                colors={["blue", "slate"]}
                className="mt-3"
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            <LineChart
              data={todaySalesData}
              categories={["today", "average"]}
              colors={["blue", "slate"]}
              index="year"
              showYAxis={false}
              showLegend={false}
              valueFormatter={valueFormatter}
              className="mt-4 h-56"
              showAnimation={true}
            />
            <Flex justifyContent="end">
              <Legend
                categories={["Today", "Peer average"]}
                colors={["blue", "slate"]}
                className="mt-3"
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
