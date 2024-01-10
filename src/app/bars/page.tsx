"use client";

import { BarChart } from "@tremor/react";

import { CenteredPageWrapper } from "../../components/common/CenteredPageWrapper";

const barChartData = [
  {
    name: "Q1 2023",
    Widgets: 745,
    Gadgets: 523,
    Modules: 634,
    Components: 478,
    Kits: 365,
    Accessories: 598,
  },
  {
    name: "Q2 2023",
    Widgets: 812,
    Gadgets: 436,
    Modules: 587,
    Components: 519,
    Kits: 402,
    Accessories: 670,
  },
  {
    name: "Q3 2023",
    Widgets: 670,
    Gadgets: 489,
    Modules: 456,
    Components: 432,
    Kits: 389,
    Accessories: 722,
  },
  {
    name: "Q4 2023",
    Widgets: 693,
    Gadgets: 575,
    Modules: 563,
    Components: 499,
    Kits: 416,
    Accessories: 655,
  },
];

export default function Bars() {
  const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <CenteredPageWrapper>
      <>
        <div className="single-chart-title">Product Sales Over Time (USD)</div>
        <BarChart
          className="mt-6"
          data={barChartData}
          index="name"
          categories={[
            "Widgets",
            "Gadgets",
            "Modules",
            "Components",
            "Kits",
            "Accessories",
          ]}
          colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </>
    </CenteredPageWrapper>
  );
}
