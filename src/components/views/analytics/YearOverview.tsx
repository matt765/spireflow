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
  Button,
  Flex,
  BarList,
  Grid,
} from "@tremor/react";

// import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { LogoIcon } from "../../../assets/icons/LogoIcon";
import React, { useState } from "react";

type Bar = { name: string; value: number };

const Categories = {
  Phones: "Phones",
  Tablets: "Tablets",
  Laptops: "Laptops",
};

const data = [
  {
    name: "Phones",
    Sales: [
      { name: "iPhone 13", value: 32040 },
      { name: "Samsung Galaxy S22", value: 28704 },
      { name: "Google Pixel 6", value: 15045 },
      { name: "OnePlus 9", value: 13205 },
      { name: "Xiaomi Mi 11", value: 12400 },
    ],
    Revenue: [
      { name: "iPhone 13", value: 25600 },
      { name: "Samsung Galaxy S22", value: 22400 },
      { name: "Google Pixel 6", value: 12000 },
      { name: "OnePlus 9", value: 10405 },
      { name: "Xiaomi Mi 11", value: 9600 },
    ],
    "Units sold": [
      { name: "iPhone 13", value: 800 },
      { name: "Samsung Galaxy S22", value: 700 },
      { name: "Google Pixel 6", value: 375 },
      { name: "OnePlus 9", value: 325 },
      { name: "Xiaomi Mi 11", value: 300 },
    ],
    Returns: [
      { name: "iPhone 13", value: 25 },
      { name: "Samsung Galaxy S22", value: 22 },
      { name: "Google Pixel 6", value: 15 },
      { name: "OnePlus 9", value: 13 },
      { name: "Xiaomi Mi 11", value: 12 },
    ],
  },
  {
    name: "Tablets",
    Sales: [
      { name: "iPad Pro", value: 29400 },
      { name: "Samsung Galaxy Tab S8", value: 28700 },
      { name: "Microsoft Surface Pro 7", value: 25600 },
      { name: "Amazon Fire HD 10", value: 22400 },
      { name: "Lenovo Tab P11", value: 19200 },
    ],
    Revenue: [
      { name: "iPad Pro", value: 25600 },
      { name: "Samsung Galaxy Tab S8", value: 23040 },
      { name: "Microsoft Surface Pro 7", value: 20480 },
      { name: "Amazon Fire HD 10", value: 17920 },
      { name: "Lenovo Tab P11", value: 15360 },
    ],
    "Units sold": [
      { name: "iPad Pro", value: 500 },
      { name: "Samsung Galaxy Tab S8", value: 450 },
      { name: "Microsoft Surface Pro 7", value: 400 },
      { name: "Amazon Fire HD 10", value: 350 },
      { name: "Lenovo Tab P11", value: 300 },
    ],
    Returns: [
      { name: "iPad Pro", value: 20 },
      { name: "Samsung Galaxy Tab S8", value: 18 },
      { name: "Microsoft Surface Pro 7", value: 16 },
      { name: "Amazon Fire HD 10", value: 14 },
      { name: "Lenovo Tab P11", value: 12 },
    ],
  },
  {
    name: "Laptops",
    Sales: [
      { name: "MacBook Pro", value: 30000 },
      { name: "Dell XPS 13", value: 26900 },
      { name: "HP Spectre x360", value: 23800 },
      { name: "Lenovo ThinkPad X1 Carbon", value: 20700 },
      { name: "ASUS ZenBook 13", value: 17600 },
    ],
    Revenue: [
      { name: "MacBook Pro", value: 24000 },
      { name: "Dell XPS 13", value: 21500 },
      { name: "HP Spectre x360", value: 19000 },
      { name: "Lenovo ThinkPad X1 Carbon", value: 16500 },
      { name: "ASUS ZenBook 13", value: 14000 },
    ],
    "Units sold": [
      { name: "MacBook Pro", value: 250 },
      { name: "Dell XPS 13", value: 225 },
      { name: "HP Spectre x360", value: 208 },
      { name: "Lenovo ThinkPad X1 Carbon", value: 183 },
      { name: "ASUS ZenBook 13", value: 167 },
    ],
    Returns: [
      { name: "MacBook Pro", value: 15 },
      { name: "Dell XPS 13", value: 13 },
      { name: "HP Spectre x360", value: 12 },
      { name: "Lenovo ThinkPad X1 Carbon", value: 11 },
      { name: "ASUS ZenBook 13", value: 10 },
    ],
  },
];

const salesRevenueFormatter = (number: number) =>
  Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    number
  );

const defaultFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const YearOverview = () => {
  const [activeCategory, setActiveCategory] = useState(Categories.Phones);

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
          {data.map((categoryData) => (
            <TabPanel key={categoryData.name}>
              <Grid numItemsMd={2} className="gap-x-8 gap-y-2 mt-6">
                {Object.entries(categoryData).map(([key, value]) => {
                  if (key !== "name") {
                    const formatter =
                      key === "Sales" || key === "Revenue"
                        ? salesRevenueFormatter
                        : defaultFormatter;
                    return (
                      <div key={key}>
                        <Text className="mt-8">
                          <Bold>{key}</Bold>
                        </Text>
                        <BarList
                          className="mt-4"
                          data={value as Bar[]}
                          valueFormatter={formatter}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </Grid>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
