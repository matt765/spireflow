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

const chartdata = [
  {
    name: "Amphibians",
    "Number of species": 2488,
  },
  {
    name: "Birds",
    "Number of species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of species": 743,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export const Dash4 = () => {
  return (
    <Card className="h-full">
      <BlockTitle title="Number of species" />
      <BarChart
        data={chartdata}
        index="name"
        categories={["Number of species"]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        className="mt-6"
      />
    </Card>
  );
};
