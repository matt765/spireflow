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
import { BlockTitle } from "../BlockTitle";

const chartdata2 = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export const Dash5 = () => {
  return (
    <Card className="h-full">
      <div className="p-1">
        <BlockTitle title="Revenue over time" />
      </div>
      <AreaChart
        data={chartdata2}
        categories={["SemiAnalysis", "The Pragmatic Engineer"]}
        index="date"
        colors={["indigo", "cyan"]}
        valueFormatter={dataFormatter}
        className="mt-4 h-72"
      />
    </Card>
  );
};
