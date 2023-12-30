"use client";

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

interface Asset {
  name: string;
  industry: string;
  sales: number;
  delta: number;
  deltaType: DeltaType;
  status: Color;
}
interface AssetPerformanceProps {
  assetPerformanceData: Asset[];
}

export const AssetPerformance = ({
  assetPerformanceData,
}: AssetPerformanceProps) => {
  const [selectedindustry, setSelectedindustry] = useState("all");
  const [filteredData, setFilteredData] = useState(assetPerformanceData);

  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()} $`;

  const filterByindustry = (industry: string, data: Asset[]) =>
    industry === "all"
      ? data
      : data.filter((asset) => asset.industry === industry);

  useEffect(() => {
    const data = assetPerformanceData;
    setFilteredData(filterByindustry(selectedindustry, data));
  }, [selectedindustry, assetPerformanceData]);

  return (
    <Card className=" h-full">
      <div className="hidden sm:block">
        <Flex className="space-x-4" justifyContent="start" alignItems="center">
          <Title>Asset Performance</Title>
        </Flex>
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
              {filteredData.map((asset) => (
                <ListItem key={asset.name}>
                  <Text> {asset.name} </Text>
                  <div>
                    <Flex justifyContent="end" className="space-x-4">
                      <Text color={asset.status} className="ml-2">
                        {asset.delta}%{" "}
                      </Text>
                      <div className="w-44">
                        <DeltaBar
                          value={asset.delta}
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
