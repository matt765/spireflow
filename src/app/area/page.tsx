"use client";

import { Col, Card, Title, AreaChart } from "@tremor/react";

import { PageContainer } from "../../components/common/PageContainer";
import { CenteredPageWrapper } from "../../components/common/CenteredPageWrapper";

const chartdata = [
  {
    date: "Jan 22",
    Views: 1983,
    "Unique visitors": 1654,
  },
  {
    date: "Feb 22",
    Views: 2543,
    "Unique visitors": 1320,
  },
  {
    date: "Mar 22",
    Views: 3221,
    "Unique visitors": 1845,
  },
  {
    date: "Apr 22",
    Views: 2896,
    "Unique visitors": 1990,
  },
  {
    date: "May 22",
    Views: 3577,
    "Unique visitors": 1530,
  },
  {
    date: "Jun 22",
    Views: 3188,
    "Unique visitors": 2421,
  },
];

export default function Area() {
  const dataFormatter = (number: number) => {
    return Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <CenteredPageWrapper>
      <>
        <div className="single-chart-title">Online store traffic</div>
        <AreaChart
          className="h-96 mt-4"
          data={chartdata}
          index="date"
          categories={["Views", "Unique visitors"]}
          colors={["indigo", "cyan"]}
          valueFormatter={dataFormatter}
        />
      </>
    </CenteredPageWrapper>
  );
}
