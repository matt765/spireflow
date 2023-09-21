import {
  Card,
  TabList,
  Tab,
  ProgressBar,
  Text,
  Flex,
  Button,
  Metric,
  BadgeDelta,
  AreaChart,
  TabGroup,
} from "@tremor/react";
import { useState } from "react";

const products = [
  {
    title: "Product A",
    value: 38,
    metric: "$ 100,838",
    location: "A",
  },
  {
    title: "Product B",
    value: 34,
    metric: "$ 90,224",
    location: "A",
  },
  {
    title: "Product C",
    value: 28,
    metric: "$ 74,301",
    location: "A",
  },
  {
    title: "Product Z",
    value: 82,
    metric: "$ 108,799",
    location: "B",
  },
  {
    title: "Product E",
    value: 10,
    metric: "$ 13,268",
    location: "B",
  },
  {
    title: "Product N",
    value: 8,
    metric: "$ 10,614",
    location: "B",
  },
];

const sales = [
  {
    Month: "Jan 21",
    Sales: 2890,
  },
  {
    Month: "Feb 21",
    Sales: 2009,
  },
  {
    Month: "Mar 21",
    Sales: 2200,
  },
  {
    Month: "Apr 21",
    Sales: 2550,
  },
  {
    Month: "May 21",
    Sales: 2800,
  },
  {
    Month: "Jun 21",
    Sales: 3050,
  },
  {
    Month: "Jul 21",
    Sales: 2000,
  },
  {
    Month: "Aug 21",
    Sales: 3100,
  },
  {
    Month: "Sep 21",
    Sales: 3000,
  },
  {
    Month: "Oct 21",
    Sales: 3150,
  },
  {
    Month: "Nov 21",
    Sales: 2800,
  },
  {
    Month: "Dec 21",
    Sales: 3350,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export const Analytics6 = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedLocation = selectedIndex === 0 ? "A" : "B";

  return (
    <Card className="w-full mx-auto ">
      <Flex alignItems="start">
        <Text>Total Sales</Text>
        <BadgeDelta deltaType="moderateIncrease">23.1%</BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-3 truncate"
      >
        <Metric>$ 442,276</Metric>
        <Text>from $ 382,482</Text>
      </Flex>
      <AreaChart
        className="mt-10 h-48"
        data={sales}
        index="Month"
        categories={["Sales"]}
        colors={["blue"]}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        valueFormatter={valueFormatter}
      />
      <TabGroup
        className="mt-4"
        index={selectedIndex}
        onIndexChange={setSelectedIndex}
      >
        <TabList>
          <Tab>Location A</Tab>
          <Tab>Location B</Tab>
        </TabList>
      </TabGroup>
      {products
        .filter((item: any) => item.location === selectedLocation)
        .map((item: any) => (
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
