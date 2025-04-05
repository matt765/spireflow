import { BarChart, Color } from "@tremor/react";
import { useTranslations } from "next-intl";

import { useTranslateData } from "../../../hooks/useTranslateData";
import { HomeSmallCardsProps } from "./types";
import { Card } from "../../common/Card";

export const HomeSmallCards = ({ homeSmallCardsData }: HomeSmallCardsProps) => {
  const t = useTranslations("homepage.homeSmallCards");
  const translations = {
    Sales: t("sales"),
    Profit: t("profit"),
    Traffic: t("traffic"),
    Customers: t("customers"),
    "Last 3 weeks": t("Last 3 weeks"),
    "Last month": t("Last month"),
    Yesterday: t("Yesterday"),
    "Last week": t("Last week"),
  };

  const translatedData = useTranslateData(homeSmallCardsData, translations);

  const cardIds = ["salesCard", "profitCard", "trafficCard", "customersCard"];

  return (
    <>
      {translatedData.map((item, index) => {
        const chartArray = item.chartData;
        return (
          <Card
            key={`${item.title}-${index}`}
            id={cardIds[index]}
            className="h-46 sm:h-28 lg:h-32 pr-[0.8rem] md:!pr-[0.5rem] lg:!pr-[0.8rem] xl:!pr-[0.1rem] 2xl:!pr-[1.2rem] pl-5 2xl:pl-7"
          >
            <div className="flex small-box max-[420px]:-ml-3 flex-col sm:flex-row">
              <div className="flex flex-col w-full sm:w-1/2 gap-1 pl-1 sm:pl-0">
                <div className="flex flex-row lg:flex-col">
                  <div className="text-[#a3aed0] font-medium text-md sm:text-lg lg:text-sm tracking-tight flex sm:block items-center lg:mr-0 mr-2 mb-1">
                    {item.title}
                  </div>
                  <div className="text-md sm:text-lg xl:text-xl font-semibold text-primaryText flex">
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
              <div className="w-full md:w-[45%] lg:w-[50%] xl:w-[40%] 2xl:w-1/2 md:pl-3 md:ml-2 2xl:ml-0 sm:flex mt-4 sm:mt-0 pr-0 2xl:pr-2 sm:pr-0">
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
