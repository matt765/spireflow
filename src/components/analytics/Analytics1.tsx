/* This code snippet uses tailwind css for for additional layout optimizations */

import {
  Card,
  Col,
  DeltaType,
  DeltaBar,
  DonutChart,
  Dropdown,
  DropdownItem,
  Flex,
  List,
  ListItem,
  Text,
  Title,
  Bold,
  ColGrid,
  Color,
} from "@tremor/react";
import { useEffect, useState } from "react";

const industries = [
  { key: "all", name: "All industries" },
  { key: "tech", name: "Tech" },
  { key: "health", name: "Health" },
  { key: "manufacturing", name: "Manufacturing" },
];

interface AssetData {
  name: string;
  industry: string;
  sales: number;
  delta: number;
  deltaType: DeltaType;
  status: Color;
}

const cities: AssetData[] = [
  {
    name: "Off Running Inc.",
    industry: "tech",
    sales: 984888,
    delta: 61.3,
    deltaType: "increase",
    status: "emerald",
  },
  {
    name: "Black Swan Holding",
    industry: "health",
    sales: 456700,
    delta: 32.8,
    deltaType: "moderateDecrease",
    status: "emerald",
  },
  {
    name: "Blingtech Inc.",
    industry: "Tech",
    sales: 390800,
    delta: -18.3,
    deltaType: "moderateDecrease",
    status: "rose",
  },
  {
    name: "Cortina Steal AG",
    industry: "manufacturing",
    sales: 240000,
    delta: 19.4,
    deltaType: "moderateIncrease",
    status: "emerald",
  },
  {
    name: "Rain Drop Holding",
    industry: "health",
    sales: 190800,
    delta: -19.4,
    deltaType: "moderateIncrease",
    status: "rose",
  },
  {
    name: "Pas Crazy Inc.",
    industry: "tech",
    sales: 164400,
    delta: -32.8,
    deltaType: "decrease",
    status: "rose",
  },
  {
    name: "Hype Room Inc.",
    industry: "manufacturing",
    sales: 139800,
    delta: -40.1,
    deltaType: "moderateIncrease",
    status: "rose",
  },
  {
    name: "Black Swan Holding",
    industry: "health",
    sales: 456700,
    delta: 32.8,
    deltaType: "moderateDecrease",
    status: "emerald",
  },
];

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} $`;

const filterByindustry = (industry: string, data: AssetData[]) =>
  industry === "all" ? data : data.filter((city) => city.industry === industry);

export const Analytics1 = () => {
  const [selectedindustry, setSelectedindustry] = useState("all");
  const [filteredData, setFilteredData] = useState(cities);

  useEffect(() => {
    const data = cities;
    setFilteredData(filterByindustry(selectedindustry, data));
  }, [selectedindustry]);

  return (
    <Card maxWidth="max-w-5xl">
      <div className="hidden sm:block">
        <Flex
          spaceX="space-x-4"
          justifyContent="justify-start"
          alignItems="items-center"
        >
          <Title truncate={true}>Asset Performance</Title>
          <Dropdown
            handleSelect={(value) => setSelectedindustry(value)}
            placeholder="Industry Selection"
            maxWidth="max-w-xs"
          >
            {industries.map((industry) => (
              <DropdownItem
                key={industry.key}
                value={industry.key}
                text={industry.name}
              />
            ))}
          </Dropdown>
        </Flex>
      </div>
      {/* --- Same code snippet as above but with no flex to optmize mobile view --- */}
      <div className="sm:hidden">
        <Title truncate={true}>Asset Performance</Title>
        <Dropdown
          handleSelect={(value) => setSelectedindustry(value)}
          placeholder="Industry Selection"
          maxWidth="max-w-full"
          marginTop="mt-2"
        >
          {industries.map((industry) => (
            <DropdownItem
              key={industry.key}
              value={industry.key}
              text={industry.name}
            />
          ))}
        </Dropdown>
      </div>
      <ColGrid numColsLg={3} marginTop="mt-8" gapX="gap-x-14" gapY="gap-y-10">
        <Flex>
          <DonutChart
            data={filteredData}
            category="sales"
            dataKey="name"
            variant="donut"
            valueFormatter={valueFormatter}
            height="h-52"
          />
        </Flex>
        <Col numColSpan={1} numColSpanLg={2}>
          <Flex>
            <Text truncate={true}>
              <Bold>Asset</Bold>
            </Text>
            <Text>
              <Bold>+/-% since transaction </Bold>
            </Text>
          </Flex>
          <div className="hidden sm:block">
            <List marginTop="mt-2">
              {filteredData.map((city) => (
                <ListItem key={city.name}>
                  <Text truncate={true}> {city.name} </Text>
                  <div>
                    <Flex justifyContent="justify-end" spaceX="space-x-4">
                      <Text color={city.status} truncate={true}>
                        {city.delta}%{" "}
                      </Text>
                      <div className="w-44">
                        <DeltaBar
                          percentageValue={city.delta}
                          isIncreasePositive={true}
                          tooltip=""
                          showAnimation={true}
                        />
                      </div>
                    </Flex>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
          {/* --- Same code snippet as above but with less width for data bars to optmize mobile view --- */}
          <div className="sm:hidden">
            <List marginTop="mt-2">
              {filteredData.map((city) => (
                <ListItem key={city.name}>
                  <Text truncate={true}> {city.name} </Text>
                  <div>
                    <Flex justifyContent="justify-end" spaceX="space-x-4">
                      <Text color={city.status} truncate={true}>
                        {city.delta}%{" "}
                      </Text>
                      <div className="w-20">
                        <DeltaBar
                          percentageValue={city.delta}
                          isIncreasePositive={true}
                          tooltip=""
                          showAnimation={true}
                        />
                      </div>
                    </Flex>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </Col>
      </ColGrid>
    </Card>
  );
};
