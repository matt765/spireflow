"use client";

import { AreaChart } from "@tremor/react";

import { CenteredPageWrapper } from "../../components/common/CenteredPageWrapper";
import { useTheme } from "next-themes";

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

  const { theme } = useTheme();

  const colorSchemes: { [key: string]: string[] } = {
    sandstone: ["gray", "yellow"],
    midnight: ["indigo", "cyan"],
    oceanic: ["gray", "blue"],
    charcoal: ["gray", "green"],
    sapphire: ["gray", "purple"],
  };

  const defaultTheme = "midnight";

  const selectedColors = colorSchemes[theme || defaultTheme];
  
  return (
    <CenteredPageWrapper>
      <>
        <div className="single-chart-title">Online store traffic</div>
        <AreaChart
          className="h-96 mt-4"
          data={chartdata}
          index="date"
          categories={["Views", "Unique visitors"]}
          colors={selectedColors}
          valueFormatter={dataFormatter}
        />
      </>
    </CenteredPageWrapper>
  );
}
