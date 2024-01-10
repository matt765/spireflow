"use client";

import { Card, BarChart, Title, Text } from "@tremor/react";
import { useTheme } from "next-themes";

interface MonthPerformance {
  month: string;
  sales: number;
  profit: number;
}

interface PerformanceProps {
  performanceData: MonthPerformance[];
}

export const Performance = ({ performanceData }: PerformanceProps) => {
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;
  const { theme } = useTheme();

  const colorSchemes: { [key: string]: string[] } = {
    sandstone: ["stone", "amber"],
    midnight: ["indigo", "cyan"],
    oceanic: ["purple", "slate"],
  };

  const defaultTheme = "midnight";

  const selectedColors = colorSchemes[theme || defaultTheme];

  return (
    <Card>
      <Title>Performance</Title>
      <Text>Comparison between Sales and Profit</Text>
      <BarChart
        className="mt-4 h-80"
        data={performanceData}
        index="month"
        categories={["sales", "profit"]}
        colors={selectedColors}
        stack={false}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
};
