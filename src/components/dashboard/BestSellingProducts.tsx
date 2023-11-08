import {
  LineChart,
  BadgeDelta,
  Card,
  DeltaType,
  DonutChart,
  Flex,
  Legend,
  List,
  ListItem,
  Title,
  Col,
  BarChart,
  Subtitle,
  AreaChart,
} from "@tremor/react";
import { BlockTitle } from "../common/BlockTitle";

const chartdata = [
  {
    name: "iPad Pro",
    "Profit from last week": 7800,
  },
  {
    name: "Apple TV 4K",
    "Profit from last week": 6445,
  },
  {
    name: "Macbook Pro",
    "Profit from last week": 3743,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export const BestSellingProducts = () => {
  return (
    <Card className="h-full">
      <BlockTitle title="Best selling products" />
      <BarChart
        data={chartdata}
        index="name"
        categories={["Profit from last week"]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        className="mt-6"
      />
    </Card>
  );
};
