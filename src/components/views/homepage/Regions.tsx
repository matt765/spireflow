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
import { useTranslations } from "next-intl";

import { BlockTitle } from "../../common/BlockTitle";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { RegionsProps, Region } from "./types";


export const Regions = ({ regionsData }: RegionsProps) => {
  const [selectedRegion, setSelectedRegion] = useState("asia");
  const [filteredData, setFilteredData] = useState(regionsData);
  const t = useTranslations("homepage.regions");

  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()} $`;

  const filterByRegion = (region: string, data: Region[]) =>
    region === "all" ? data : data.filter((city) => city.region === region);

  useEffect(() => {
    const data = regionsData;
    setFilteredData(filterByRegion(selectedRegion, data));
  }, [selectedRegion]);

  const translations = {
    "North America": t("northAmerica"),
    Europe: t("europe"),
  };

  const translatedData = useTranslateData(regionsData, translations);

  return (
    <Card>
      <Flex className="space-x-8" justifyContent="start" alignItems="center">
        <BlockTitle title={t("title")} />
      </Flex>
      <Legend
        categories={translatedData.map((city) => city.name)}
        className="mt-6"
      />
      <DonutChart
        data={translatedData}
        category="sales"
        index="name"
        valueFormatter={valueFormatter}
        className="mt-6"
      />
      <List className="mt-6">
        {translatedData.map((city) => (
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
