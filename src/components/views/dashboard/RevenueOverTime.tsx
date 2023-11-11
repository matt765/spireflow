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
import { BlockTitle } from "../../common/BlockTitle";

const chartdata2 = [
  {
    date: "Apr 23",
    "Website Sales": 2200,
    "In-Store Sales": 3700,
  },
  {
    date: "May 23",
    "Website Sales": 5400,
    "In-Store Sales": 2000,
  },
  {
    date: "Jun 23",
    "Website Sales": 2000,
    "In-Store Sales": 4600,
  },
  {
    date: "Jul 23",
    "Website Sales": 7200,
    "In-Store Sales": 4900,
  },
  {
    date: "Aug 23",
    "Website Sales": 5500,
    "In-Store Sales": 2100,
  },
  {
    date: "Sep 23",
    "Website Sales": 6900,
    "In-Store Sales": 5300,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export const RevenueOverTime = () => {
  return (
    <Card className="h-full">
      <div className="p-1">
        <BlockTitle title="Revenue over time" />
      </div>
      <AreaChart
        data={chartdata2}
        categories={["Website Sales", "In-Store Sales"]}
        index="date"
        colors={["indigo", "cyan"]}
        valueFormatter={dataFormatter}
        className="mt-4 h-72"
      />
    </Card>
  );
};
