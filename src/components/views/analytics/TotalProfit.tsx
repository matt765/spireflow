"use client";

import {
  Card,
  ProgressBar,
  Text,
  Flex,
  Metric,
  BadgeDelta,
  AreaChart,
} from "@tremor/react";

interface ProductProfit {
  title: string;
  value: number;
  metric: string;
}

interface TotalMonthProfit {
  month: string;
  sales: number;
}

interface TotalProfitProps {
  totalProfitProducts: ProductProfit[];
  totalProfitSales: TotalMonthProfit[];
}

export const TotalProfit = ({
  totalProfitProducts,
  totalProfitSales,
}: TotalProfitProps) => {
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Card className="w-full mx-auto ">
      <Flex alignItems="start">
        <Text>Total Profit</Text>
        <BadgeDelta deltaType="moderateIncrease">23.1%</BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-3 truncate"
      >
        <Metric>$ 442,276</Metric>
        <Text>this year</Text>
      </Flex>
      <AreaChart
        className="mt-10 h-48"
        data={totalProfitSales}
        index="month"
        categories={["sales"]}
        colors={["blue"]}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        valueFormatter={valueFormatter}
      />
      {totalProfitProducts.map((item: any) => (
        <div key={item.title} className="mt-4 space-y-2">
          <Flex>
            <Text>{item.title}</Text>
            <Text>{`${item.value}% (${item.metric})`}</Text>
          </Flex>
          <ProgressBar value={item.value} />
        </div>
      ))}
    </Card>
  );
};
