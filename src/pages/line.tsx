import { Card, Title, BarChart, Subtitle, LineChart } from "@tremor/react";

import { PageContainer } from "../components/PageContainer";

const chartdata = [
  {
    year: 1970,
    "Export Growth Rate": 2.04,
    "Import Growth Rate": 1.53,
  },
  {
    year: 1971,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.58,
  },
  {
    year: 1972,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1973,
    "Export Growth Rate": 1.93,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1974,
    "Export Growth Rate": 1.88,
    "Import Growth Rate": 1.67,
  },
  //...
];

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}%`;

export default function Line() {
  return (
    <PageContainer title="Line">
      <div className="w-full h-full paper max-w-full">
        <div className="single-chart-wrapper">
          <div className="single-chart-title">
            Newsletter revenue over time (USD)
          </div>
          <LineChart
            className="mt-6"
            data={chartdata}
            index="year"
            categories={["Export Growth Rate", "Import Growth Rate"]}
            colors={["emerald", "gray"]}
            valueFormatter={dataFormatter}
            yAxisWidth={40}
          />
        </div>
      </div>
    </PageContainer>
  );
}
