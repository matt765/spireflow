"use client";

import {
  Bold,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanels,
  TabPanel,
  BarList,
  Grid,
} from "@tremor/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { BlockTitle } from "../../common/BlockTitle";
import { SingleProductData, YearOverviewProps } from "./types";
import { Card } from "../../common/Card";

const Categories = {
  Phones: "Phones",
  Tablets: "Tablets",
  Laptops: "Laptops",
};

export const YearOverview = ({ yearOverviewData }: YearOverviewProps) => {
  const [activeCategory, setActiveCategory] = useState(Categories.Phones);
  const t = useTranslations("analytics.yearOverview");
  const backendTranslations = useBackendTranslations("analytics.yearOverview");
  const translatedData = useTranslateData(
    yearOverviewData,
    backendTranslations
  );

  const salesRevenueFormatter = (number: number) =>
    Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      number
    );

  const defaultFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();

  const formatKey = (key: string) => {
    // Capitalize the first letter and add a space before each uppercase letter
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <Card>
      <BlockTitle title={t("title")} />
      <TabGroup className="mt-6 yearOverview">
        <TabList variant="solid">
          <Tab onClick={() => setActiveCategory(t("phones"))}>
            {t("phones")}
          </Tab>
          <Tab onClick={() => setActiveCategory(t("tablets"))}>
            {t("tablets")}
          </Tab>
          <Tab onClick={() => setActiveCategory(t("laptops"))}>
            {t("laptops")}
          </Tab>
        </TabList>
        <TabPanels>
          {translatedData.map((categoryData) => {
            return (
              <TabPanel key={categoryData.name}>
                <Grid numItemsMd={2} className="gap-x-8 gap-y-2 mt-4">
                  {Object.entries(categoryData).map(([key, value]) => {
                    if (key !== "name") {
                      const formattedKey = formatKey(key);
                      const formatter =
                        key === t("sales") || key === t("revenue")
                          ? salesRevenueFormatter
                          : defaultFormatter;
                      return (
                        <div key={key}>
                          <Text className="mt-8">
                            <Bold>{formattedKey}</Bold>
                          </Text>
                          <BarList
                            className="mt-4"
                            data={value as SingleProductData[]}
                            valueFormatter={formatter}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </Grid>
              </TabPanel>
            );
          })}
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
