"use client";

import { Card, BarChart, Title, Text } from "@tremor/react";

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

  return (
    <Card>
      <Title>Performance</Title>
      <Text>Comparison between Sales and Profit</Text>
      <BarChart
        className="mt-4 h-80"
        data={performanceData}
        index="month"
        categories={["sales", "profit"]}
        colors={["indigo", "fuchsia"]}
        stack={false}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
};
