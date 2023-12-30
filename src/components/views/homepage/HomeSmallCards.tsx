"use client";

import { Card, DeltaType, BarChart, Color } from "@tremor/react";

interface HomeSmallCardChartData {
  date: string;
  metric: number;
}

interface HomeSmallCard {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: DeltaType;
  color: Color;
  increased: boolean;
  changeValue: number;
  changeText: string;
  chartData: HomeSmallCardChartData[];
}

interface HomeSmallCardsProps {
  homeSmallCardsData: HomeSmallCard[];
}

export const HomeSmallCards = ({ homeSmallCardsData }: HomeSmallCardsProps) => {

  return (
    <>
      {homeSmallCardsData.map((item, index) => {
        const chartArray = item.chartData;
        console.log(chartArray)
        return (
          <Card key={`${item.title}-${index}`} className="h-46 sm:h-28 lg:h-32">
            <div className="flex small-box max-[420px]:-ml-3 flex-col sm:flex-row">
              <div className="flex flex-col  w-full sm:w-1/2 gap-1 pl-1 sm:pl-0">
                <div className="flex flex-row lg:flex-col">
                  <div className="text-[#a3aed0] font-medium text-md sm:text-lg lg:text-sm tracking-tight flex sm:block items-center lg:mr-0 mr-2 mb-1">
                    {item.title}
                  </div>
                  <div className="text-md sm:text-lg xl:text-xl font-medium text-primaryText dark:text-primaryTextDark flex">
                    {item.metric}
                  </div>
                </div>
                <div className="flex">
                  {item.increased ? (
                    <div className="text-xs text-green-600">
                      +{item.changeValue}%
                    </div>
                  ) : (
                    <div className="text-xs text-red-500">
                      -{item.changeValue}%
                    </div>
                  )}
                  <div className="flex lg:hidden xl:flex text-xs text-gray-400 ml-1 whitespace-nowrap">
                    {item.changeText}
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2 sm:pl-3 ml-2 2xl:ml-0 sm:flex mt-4 sm:mt-0 pr-2 sm:pr-0">
                <Chart chartData={chartArray} color={item.color} />
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
};

interface ChartProps {
  color: Color;
  chartData: {}[];
}

const Chart = ({ color, chartData }: ChartProps) => (
  <BarChart
    data={chartData}
    index={Object.keys(chartData[0])[0]}
    categories={["metric"]}
    colors={[color]}
    showLegend={false}
    className="h-16"
    showTooltip={false}
    showXAxis={false}
    showYAxis={false}
  />
);
