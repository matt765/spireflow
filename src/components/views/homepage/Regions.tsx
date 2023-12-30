"use client";

import {
  BadgeDelta,
  Card,
  DonutChart,
  Flex,
  Legend,
  List,
  ListItem,
} from "@tremor/react";
import { useEffect, useState } from "react";

import { BlockTitle } from "../../common/BlockTitle";

interface Region {
  name: string;
  region: string;
  sales: number;
  delta: string;
  deltaType: string;
}

interface RegionsProps {
  regionsData: Region[];
}

export const Regions = ({ regionsData }: RegionsProps) => {
  const [selectedRegion, setSelectedRegion] = useState("asia");
  const [filteredData, setFilteredData] = useState(regionsData);

  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()} $`;

  const filterByRegion = (region: string, data: Region[]) =>
    region === "all" ? data : data.filter((city) => city.region === region);

  useEffect(() => {
    const data = regionsData;
    setFilteredData(filterByRegion(selectedRegion, data));
  }, [selectedRegion]);

  return (
    <Card>
      <Flex className="space-x-8" justifyContent="start" alignItems="center">
        <BlockTitle title="Regions" />
      </Flex>
      <Legend
        categories={regionsData.map((city) => city.name)}
        className="mt-6"
      />
      <DonutChart
        data={regionsData}
        category="sales"
        index="name"
        valueFormatter={valueFormatter}
        className="mt-6"
      />
      <List className="mt-6">
        {regionsData.map((city) => (
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
