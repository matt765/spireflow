import {
  LineChart,
  BadgeDelta,
  Card,
  DeltaType,
  DonutChart,
  Dropdown,
  DropdownItem,
  Flex,
  Legend,
  List,
  ListItem,
  Title,
  ColGrid,
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
    <Card>
      <BlockTitle title="Number of species" />
      <BarChart
        data={chartdata}
        dataKey="name"
        categories={["Number of species"]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        marginTop="mt-6"
        yAxisWidth="w-12"
      />
    </Card>
  );
};
