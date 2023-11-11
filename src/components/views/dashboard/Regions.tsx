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
} from "@tremor/react";
import { useEffect, useState } from "react";
import { BlockTitle } from "../../common/BlockTitle";

interface CityData {
  name: string;
  region: string;
  sales: number;
  delta: string;
  deltaType: DeltaType;
}

const conversions: CityData[] = [
  {
    name: "North America",
    region: "us",
    sales: 875000,
    delta: "5.7%",
    deltaType: "increase",
  },
  {
    name: "Europe",
    region: "europe",
    sales: 560000,
    delta: "2.8%",
    deltaType: "moderateDecrease",
  },
 
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} $`;

const filterByRegion = (region: string, data: CityData[]) =>
  region === "all" ? data : data.filter((city) => city.region === region);

export const Regions = () => {
  const [selectedRegion, setSelectedRegion] = useState("asia");
  const [filteredData, setFilteredData] = useState(conversions);

  useEffect(() => {
    const data = conversions;
    setFilteredData(filterByRegion(selectedRegion, data));
  }, [selectedRegion]);

  return (
    <Card>
      <Flex className="space-x-8" justifyContent="start" alignItems="center">
        <BlockTitle title="Regions" />
      </Flex>
      <Legend
        categories={conversions.map((city) => city.name)}
        className="mt-6"
      />
      <DonutChart
        data={conversions}
        category="sales"
        index="name"
        valueFormatter={valueFormatter}
        className="mt-6"
      />
      <List className="mt-6">
        {conversions.map((city) => (
          <ListItem key={city.name}>
            {city.name}
            <BadgeDelta deltaType={city.deltaType} size="xs">
              {city.delta}
            </BadgeDelta>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
