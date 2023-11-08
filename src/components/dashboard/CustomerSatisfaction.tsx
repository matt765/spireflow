import { ScatterChart } from "@tremor/react";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import {
  Title,
  Text,
  Card,
  Flex,
  Bold,
  BarList,
  Select,
  SelectItem,
} from "@tremor/react";

import { JSXElementConstructor, useEffect, useState } from "react";
import { BlockTitle } from "../common/BlockTitle";



const chartdata = [
  {
    Brand_name: "Apple iPhone 13",
    Customer_satisfaction: 92.3,
    Total_sales: 50437.1236,
    Number_of_orders: 17417,
  },
  {
    Brand_name: "Apple MacBook Air",
    Customer_satisfaction: 85.8,
    Total_sales: 16554.3876,
    Number_of_orders: 10589,
  },
  {
    Brand_name: "Dell XPS 13",
    Customer_satisfaction: 71.5,
    Total_sales: 33665.947,
    Number_of_orders: 8633,
  },
  {
    Brand_name: "Dell Inspiron 15",
    Customer_satisfaction: 97.4,
    Total_sales: 55024.0342,
    Number_of_orders: 2110,
  },
  {
    Brand_name: "Huawei MateBook 14",
    Customer_satisfaction: 82.3,
    Total_sales: 14974.243,
    Number_of_orders: 3705,
  },
  {
    Brand_name: "Huawei P30 Pro",
    Customer_satisfaction: 93.9,
    Total_sales: 40746.782,
    Number_of_orders: 1379,
  },
  {
    Brand_name: "Dell Alienware m15",
    Customer_satisfaction: 77.7,
    Total_sales: 55675.003,
    Number_of_orders: 5754,
  },
  {
    Brand_name: "Apple iPad Pro",
    Customer_satisfaction: 71.8,
    Total_sales: 5744.787,
    Number_of_orders: 9842,
  },
  {
    Brand_name: "Huawei MatePad Pro",
    Customer_satisfaction: 81.1,
    Total_sales: 42032.056,
    Number_of_orders: 5529,
  },
  {
    Brand_name: "Apple MacBook Pro",
    Customer_satisfaction: 71.0,
    Total_sales: 14680.009,
    Number_of_orders: 8279,
  },
  {
    Brand_name: "Dell Latitude 7410",
    Customer_satisfaction: 89.4,
    Total_sales: 45191.054,
    Number_of_orders: 1641,
  },
  {
    Brand_name: "Apple iPhone 12",
    Customer_satisfaction: 84.1,
    Total_sales: 40551.553,
    Number_of_orders: 1260,
  },
  {
    Brand_name: "Dell G5 15",
    Customer_satisfaction: 80.5,
    Total_sales: 47924.041,
    Number_of_orders: 5759,
  },
  {
    Brand_name: "Apple iPhone SE",
    Customer_satisfaction: 81.5,
    Total_sales: 49088.289,
    Number_of_orders: 1712,
  },
 
  {
    Brand_name: "LG 2T",
    Customer_satisfaction: 70.5,
    Total_sales: 12582.345,
    Number_of_orders: 3788,
  },
  {
    Brand_name: "Samsung Galaxy S30",
    Customer_satisfaction: 73.4,
    Total_sales: 26290.175,
    Number_of_orders: 4673,
  },
  {
    Brand_name: "Motorola M600",
    Customer_satisfaction: 91.1,
    Total_sales: 21345.678,
    Number_of_orders: 1047,
  },
];

export const CustomerSatisfaction = () => {
  const Number_of_ordersScaleFactor = 1.1;  
 
  const adjustedChartData = chartdata.map(item => ({
    ...item,
    "Number_of_orders": item.Number_of_orders * Number_of_ordersScaleFactor,
  }));
  
  return (
    <Card className="max-w-full h-full max-h-full flex flex-col ">
    <BlockTitle title="Customer satisfaction" />
    <ScatterChart
      className="h-72 md:h-full mt-8"
      yAxisWidth={50}
      data={adjustedChartData}
      category="Brand_name"
      x="Total_sales"
      y="Customer_satisfaction"
      size="Number_of_orders"
      showOpacity={true}
      minYValue={60}
      maxYValue={100}
      valueFormatter={{
        x: (amount) => `$${(amount / 1000).toFixed(1)}K`,
        y: (lifeExp) => `${lifeExp / 1 + "%"}`,
        size: (Number_of_orders) => `${(Number_of_orders / Number_of_ordersScaleFactor).toFixed(1)}M people`,
      }}
      showLegend={false}
      sizeRange={[111, 2500]}
    />
  </Card>
  );
};
