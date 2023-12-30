"use client";

import {
  Card,
  Title,
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

import React, { useState } from "react";

const Categories = {
  Phones: "Phones",
  Tablets: "Tablets",
  Laptops: "Laptops",
};

interface SingleProductData {
  name: string;
  value: number;
}

interface OverviewCategoryData {
  name: string;
  sales: SingleProductData[];
  revenue: SingleProductData[];
  unitsSold: SingleProductData[];
  returns: SingleProductData[];
}

interface YearOverviewProps {
  yearOverviewData: OverviewCategoryData[];
}

export const YearOverview = ({ yearOverviewData }: YearOverviewProps) => {
  const [activeCategory, setActiveCategory] = useState(Categories.Phones);

  const salesRevenueFormatter = (number: number) =>
    Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      number
    );

  const defaultFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();

  function formatKey(key: string) {
    // Capitalize the first letter and add a space before each uppercase letter
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  return (
    <Card>
      <Title>Year Overview</Title>
      <TabGroup className="mt-8">
        <TabList variant="solid">
          <Tab onClick={() => setActiveCategory("Phones")}>Phones</Tab>
          <Tab onClick={() => setActiveCategory("Tablets")}>Tablets</Tab>
          <Tab onClick={() => setActiveCategory("Laptops")}>Laptops</Tab>
        </TabList>
        <TabPanels>
          {yearOverviewData.map((categoryData) => {
            return (
              <TabPanel key={categoryData.name}>
                <Grid numItemsMd={2} className="gap-x-8 gap-y-2 mt-6">
                  {Object.entries(categoryData).map(([key, value]) => {
                    if (key !== "name") {
                      const formattedKey = formatKey(key);
                      const formatter =
                        key === "sales" || key === "revenue"
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
