import { Col, Card, Title, AreaChart } from "@tremor/react";

import { PageContainer } from "../components/PageContainer";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export default function Area() {
  return (
    <PageContainer title="Area">
      <div className="w-full h-full paper max-w-full">
        <div className="single-chart-wrapper">
          <div className="single-chart-title">
            Newsletter revenue over time (USD)
          </div>
          <AreaChart
            className="h-96 mt-4"
            data={chartdata}
            index="date"
            categories={["SemiAnalysis", "The Pragmatic Engineer"]}
            colors={["indigo", "cyan"]}
            valueFormatter={dataFormatter}
          />
        </div>
      </div>
    </PageContainer>
  );
}
