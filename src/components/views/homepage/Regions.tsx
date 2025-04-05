import { useEffect, useState } from "react";
import { BadgeDelta, DonutChart, Flex, List, ListItem } from "@tremor/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { BlockTitle } from "../../common/BlockTitle";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { RegionData, RegionsProps } from "./types";
import { Card } from "../../common/Card";
import { useChartColors } from "../../../hooks/useChartColors";

const CustomRegionsLegend = ({ data }: { data: RegionData[] }) => {
  const { theme } = useTheme();
  const chartColors = useChartColors(
    theme as "charcoal" | "midnight" | "obsidian" | "snowlight"
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getColorForRegion = (regionKey: string) => {
    if (regionKey === "northamerica") {
      return chartColors.primary.fill;
    } else if (regionKey === "europe") {
      return chartColors.secondary.fill;
    }
    return "#A0AEC0";
  };

  return (
    <div className="flex flex-row justify-start gap-8 text-white w-full mb-12 mt-8 text-xs">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          {isMounted ? (
            <div
              className="w-3 h-3 mr-2 rounded"
              style={{
                backgroundColor: getColorForRegion(
                  item.regionKey.toLowerCase()
                ),
              }}
            />
          ) : (
            <div className="w-3 h-3 mr-2 rounded bg-transparent"></div>
          )}
          <span className="text-sm text-primaryText">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export const Regions = ({ regionsData }: RegionsProps) => {
  const t = useTranslations("homepage.regions");

  const processedData = regionsData.map((item) => ({
    ...item,
    regionKey: item.name.replace(/\s+/g, "").toLowerCase(),
  }));

  const translations = {
    "North America": t("northAmerica"),
    Europe: t("europe"),
  };

  const translatedData = useTranslateData(processedData, translations);

  return (
    <Card className="regionsCard" id="regions">
      <Flex className="space-x-8" justifyContent="start" alignItems="center">
        <BlockTitle title={t("title")} />
      </Flex>
      <CustomRegionsLegend data={translatedData} />
      <DonutChart
        data={translatedData}
        category="sales"
        index="name"
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat("us").format(number)} $`
        }
        className="mt-6"
      />
      <List className="mt-6">
        {translatedData.map((city) => (
          <ListItem key={city.name}>
            {city.name}
            <BadgeDelta deltaType={city.deltaType} size="xs">
              {city.delta}
            </BadgeDelta>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
