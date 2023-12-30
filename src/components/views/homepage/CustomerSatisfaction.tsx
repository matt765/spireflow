"use client";

import { ScatterChart } from "@tremor/react";
import { Card } from "@tremor/react";

import { BlockTitle } from "../../common/BlockTitle";

interface ProductSatisfaction {
  brandName: string;
  customerSatisfaction: number;
  totalSales: number;
  numberOfOrders: number;
}

interface CustomerSatisfactionProps {
  customerSatisfactionData: ProductSatisfaction[];
}

interface TransformedProductSatisfaction {
  brandName: string;
  "Customer Satisfaction": number;
  "Total Sales": number;
  "Number of Orders": number;
}
export const CustomerSatisfaction = ({
  customerSatisfactionData,
}: CustomerSatisfactionProps) => {
  const numberOfOrdersScaleFactor = 1.1;

  const transformDataKeys = (
    data: ProductSatisfaction[]
  ): TransformedProductSatisfaction[] => {
    return data.map((item) => ({
      brandName: item.brandName,
      "Customer Satisfaction": item.customerSatisfaction,
      "Total Sales": item.totalSales,
      "Number of Orders": item.numberOfOrders * numberOfOrdersScaleFactor,
    }));
  };

  const transformedData = transformDataKeys(customerSatisfactionData);

  return (
    <Card className="max-w-full h-full max-h-full flex flex-col ">
      <BlockTitle title="Customer satisfaction" />
      <ScatterChart
        className="h-72 md:h-full mt-8"
        yAxisWidth={50}
        data={transformedData}
        category="brandName"
        x="Total Sales"
        y="Customer Satisfaction"
        size="Number of Orders"
        showOpacity={true}
        minYValue={60}
        maxYValue={100}
        valueFormatter={{
          x: (amount) => `$${(amount / 1000).toFixed(1)}K`,
          y: (lifeExp) => `${lifeExp}%`,
          size: (numberOfOrders) =>
            `${Math.round(numberOfOrders / numberOfOrdersScaleFactor)}`,
        }}
        showLegend={false}
        sizeRange={[111, 2500]}
      />
    </Card>
  );
};
