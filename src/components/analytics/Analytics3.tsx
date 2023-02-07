import { Card, Metric, Text, Divider, AreaChart } from "@tremor/react";

const data = [
  {
    Month: "Jan 21",
    "Gross Volume": 2890,
    "Successful Payments": 2400,
    Customers: 4938,
  },
  {
    Month: "Feb 21",
    "Gross Volume": 1890,
    "Successful Payments": 1398,
    Customers: 2938,
  },
  // ...
  {
    Month: "Jan 22",
    "Gross Volume": 3890,
    "Successful Payments": 2980,
    Customers: 2645,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export const Analytics3 = () => {
  return (
    <Card>
      <Text>Gross Volume</Text>
      <Metric>$ 12,699</Metric>
      <AreaChart
        marginTop="mt-8"
        data={data}
        categories={["Gross Volume"]}
        dataKey="Month"
        colors={["indigo"]}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
        height="h-44"
      />

      <Divider />

      <Text>Successful Payments</Text>
      <Metric>$ 10,300</Metric>
      <AreaChart
        marginTop="mt-8"
        data={data}
        categories={["Successful Payments"]}
        dataKey="Month"
        colors={["indigo"]}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
        height="h-44"
      />

      <Divider />

      <Text>Customers</Text>
      <Metric>645</Metric>
      <AreaChart
        marginTop="mt-8"
        data={data}
        categories={["Customers"]}
        dataKey="Month"
        colors={["indigo"]}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
        height="h-44"
      />
    </Card>
  );
};
