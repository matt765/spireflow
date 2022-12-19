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
} from "@tremor/react";
import { useEffect, useState } from "react";
import { BlockTitle } from "../BlockTitle";

const regions = [
  { key: "all", name: "All Regions" },
  { key: "us", name: "United States" },
  { key: "europe", name: "Europe" },
  { key: "asia", name: "Asia" },
];

interface CityData {
  name: string;
  region: string;
  sales: number;
  delta: string;
  deltaType: DeltaType;
}

const cities: CityData[] = [
  {
    name: "New York",
    region: "us",
    sales: 984888,
    delta: "6.1%",
    deltaType: "increase",
  },
  {
    name: "London",
    region: "europe",
    sales: 456700,
    delta: "1.2%",
    deltaType: "moderateDecrease",
  },
  {
    name: "San Francisco",
    region: "us",
    sales: 240000,
    delta: "2.3%",
    deltaType: "moderateIncrease",
  },
  {
    name: "Hong Kong",
    region: "asia",
    sales: 390800,
    delta: "0.5%",
    deltaType: "moderateDecrease",
  },
  {
    name: "Singapore",
    region: "asia",
    sales: 190800,
    delta: "1.8%",
    deltaType: "moderateIncrease",
  },
  {
    name: "Zurich",
    region: "europe",
    sales: 164400,
    delta: "3.4%",
    deltaType: "decrease",
  },
  {
    name: "Vienna",
    region: "europe",
    sales: 139800,
    delta: "3.1%",
    deltaType: "moderateIncrease",
  },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} $`;

const filterByRegion = (region: string, data: CityData[]) =>
  region === "all" ? data : data.filter((city) => city.region === region);

export const Dash3 = () => {
  const [selectedRegion, setSelectedRegion] = useState("asia");
  const [filteredData, setFilteredData] = useState(cities);

  useEffect(() => {
    const data = cities;
    setFilteredData(filterByRegion(selectedRegion, data));
  }, [selectedRegion]);

  return (
    <Card maxWidth="max-w-md">
      <Flex
        spaceX="space-x-8"
        justifyContent="justify-start"
        alignItems="items-center"
      >
        <BlockTitle title="Sales" />
        <Dropdown
          handleSelect={(value) => setSelectedRegion(value)}
          placeholder="Region Selection"
        >
          {regions.map((region) => (
            <DropdownItem
              key={region.key}
              value={region.key}
              text={region.name}
            />
          ))}
        </Dropdown>
      </Flex>
      <Legend
        categories={filteredData.map((city) => city.name)}
        marginTop="mt-6"
      />
      <DonutChart
        data={filteredData}
        category="sales"
        dataKey="name"
        valueFormatter={valueFormatter}
        marginTop="mt-6"
      />
      <List marginTop="mt-6">
        {filteredData.map((city) => (
          <ListItem key={city.name}>
            {city.name}
            <BadgeDelta
              deltaType={city.deltaType}
              text={city.delta}
              size="xs"
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
