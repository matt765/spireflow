import {
  Card,
  Col,
  DeltaType,
  DeltaBar,
  DonutChart,
  Select,
  SelectItem,
  Flex,
  List,
  ListItem,
  Text,
  Title,
  Bold,
  Grid,
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
    name: "Swan Holding",
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
    <Card className=" h-full">
      <div className="hidden sm:block">
        <Flex className="space-x-4" justifyContent="start" alignItems="center">
          <Title>Asset Performance</Title>
        </Flex>
      </div>
      <div className="sm:hidden">
        <Title>Asset Performance</Title>
        <Select
          onValueChange={setSelectedindustry}
          placeholder="Industry Selection"
          className="mt-2 max-w-full"
        >
          {industries.map((industry, index) => (
            <SelectItem key={`${industry.key}-${index}`} value={industry.key} />
          ))}
        </Select>
      </div>
      <Grid numItemsLg={3} className="mt-8 gap-x-10 gap-y-10">
        <Flex>
          <DonutChart
            data={filteredData}
            category="sales"
            variant="donut"
            valueFormatter={valueFormatter}
            className="h-52"
          />
        </Flex>
        <Col numColSpan={1} numColSpanLg={2}>
          <Flex className="block sm:hidden lg:block">
            <Text className="pb-1">
              <Bold>Asset</Bold>
            </Text>
            <Text>
              <Bold>+/-% since transaction </Bold>
            </Text>
          </Flex>
          <div className="sm:max-h-32 lg:max-h-full overflow-auto pr-2 ">
            <List className="mt-2">
              {filteredData.map((city) => (
                <ListItem key={city.name}>
                  <Text> {city.name} </Text>
                  <div>
                    <Flex justifyContent="end" className="space-x-4">
                      <Text color={city.status} className="ml-2">{city.delta}% </Text>
                      <div className="w-44">
                        <DeltaBar
                          value={city.delta}
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
      </Grid>
    </Card>
  );
};
