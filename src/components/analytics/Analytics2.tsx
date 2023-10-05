import {
  Card,
  Callout,
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

interface Data {
  hour: string;
  today: number;
  average: number;
  yesterday: number;
}

const sales: Data[] = [
  {
    hour: "00:00",
    today: 90,
    average: 66,
    yesterday: 23,
  },
  {
    hour: "02:00",
    today: 45,
    average: 40,
    yesterday: 32,
  },
  {
    hour: "04:00",
    today: 68,
    average: 55,
    yesterday: 29,
  },
  {
    hour: "06:00",
    today: 73,
    average: 83,
    yesterday: 68,
  },
  {
    hour: "08:00",
    today: 79,
    average: 102,
    yesterday: 43,
  },
  {
    hour: "10:00",
    today: 70,
    average: 75,
    yesterday: 39,
  },
  {
    hour: "12:00",
    today: 50,
    average: 20,
    yesterday: 34,
  },
  {
    hour: "14:00",
    today: 81,
    average: 66,
    yesterday: 59,
  },
  {
    hour: "16:00",
    today: 90,
    average: 92,
    yesterday: 78,
  },
  {
    hour: "18:00",
    today: 101,
    average: 88,
    yesterday: 65,
  },
  {
    hour: "20:00",
    today: 50,
    average: 63,
    yesterday: 34,
  },
  {
    hour: "22:00",
    today: 35,
    average: 25,
    yesterday: 21,
  },
  {
    hour: "23:59",
    today: 43,
    average: 23,
    yesterday: 12,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export const Analytics2 = () => {
  const [selectedComparison, setSelectedComparison] = useState("today");
  return (
    <Card className="w-full h-full">
      <Text>Today&apos;s Sales</Text>
      <Metric className="mt-1">$ 276</Metric>
      <TabGroup>
        <TabList defaultValue="average" className="mt-6">
          <Tab value="average">Today vs. average</Tab>
          <Tab value="yesterday">Today vs. yesterday</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LineChart
              data={sales}
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
              data={sales}
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
          </TabPanel>{" "}
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
