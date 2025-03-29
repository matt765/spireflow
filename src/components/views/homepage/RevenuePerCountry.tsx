import React, { Suspense, lazy } from "react";
import { Geographies, Geography } from "react-simple-maps";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import "react-tooltip/dist/react-tooltip.css";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { BlockTitle } from "../../common/BlockTitle";
import { EnglishIcon } from "../../../assets/icons/EnglishIcon";
import { PolishIcon } from "../../../assets/icons/PolishIcon";
import { UnitedStatesIcon } from "../../../assets/icons/UnitedStatesIcon";
import { FranceIcon } from "../../../assets/icons/FranceIcon";
import { NorwayIcon } from "../../../assets/icons/NorwayIcon";
import { AustraliaIcon } from "../../../assets/icons/AustraliaIcon";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { Card } from "../../common/Card";
import { SpinnerIcon } from "../../../assets/icons/SpinnerIcon";
import { RevenuePerCountryProps } from "./types";
import { useChartColors } from "../../../hooks/useChartColors";

const ComposableMapLazy = lazy(() =>
  import("react-simple-maps").then((module) => ({
    default: module.ComposableMap,
  }))
);

export const RevenuePerCountry = ({
  revenuePerCountryData,
}: RevenuePerCountryProps) => {
  const t = useTranslations("homepage.revenuePerCountry");
  const backendTranslations = useBackendTranslations(
    "homepage.revenuePerCountry"
  );
  const translatedData = useTranslateData(
    revenuePerCountryData,
    backendTranslations
  );

  const countryIconMap: {
    [key: string]: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
  } = {
    [t("unitedStates")]: UnitedStatesIcon,
    [t("france")]: FranceIcon,
    [t("unitedKingdom")]: EnglishIcon,
    [t("norway")]: NorwayIcon,
    [t("australia")]: AustraliaIcon,
    [t("poland")]: PolishIcon,
  };

  const dataWithIcons = translatedData
    .filter((country) => countryIconMap[country.name])
    .map((country) => ({
      ...country,
      FlagIcon: countryIconMap[country.name],
    }));

  const { theme } = useTheme();

  const chartColors = useChartColors(
    theme as "charcoal" | "dark" | "obsidian" | "light"
  );

  const HIGHLIGHT_COLOR = chartColors.primary.fill;

  return (
    <Card
      className="h-full relative overflow-hidden flex flex-col"
      id="revenuePerCountry"
    >
      <BlockTitle title={t("title")} />
      <div className="flex justify-between -ml-8 2xl:-ml-48 gap-16  mt-10 pr-12 -mb-4 ">
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center pb-10">
              <SpinnerIcon width={100} height={100} />
            </div>
          }
        >
          <ComposableMapLazy
            width={1100}
            height={450}
            stroke="rgb(255,255,255, 0.1)"
          >
            <Geographies geography="/geographies.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  if (countryName === "Antarctica") {
                    return null;
                  }
                  const countryData = revenuePerCountryData.find(
                    (s) => s.name === countryName
                  );
                  const tooltipContent = countryData
                    ? `${countryName} - ${countryData.price}$`
                    : `${countryName}`;

                  return (
                    <Tooltip
                      placement="top"
                      overlay={<span>{tooltipContent}</span>}
                      key={geo.rsmKey}
                    >
                      <Geography
                        geography={geo}
                        fill={
                          countryData
                            ? HIGHLIGHT_COLOR
                            : "rgba(255, 255, 255, 0.1)"
                        }
                        style={{
                          default: { outline: "none" },
                          hover: { fill: HIGHLIGHT_COLOR, outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    </Tooltip>
                  );
                })
              }
            </Geographies>
          </ComposableMapLazy>
        </Suspense>
        <div className="flex flex-col p-0 overflow-auto min-w-[20rem] gap-3 overflow-hidden  px-2  mr-20">
          <div className="w-full flex justify-between">
            <h3 className="font-semibold text-primaryText dark:text-primaryTextDark">
              {t("country")}
            </h3>
            <h3 className="font-semibold text-primaryText dark:text-primaryTextDark">
              {t("sales")}
            </h3>
          </div>
          {dataWithIcons.map((data, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-1 border-t dark:border-mainBorderDark border-mainBorder pt-4"
            >
              <div className="flex items-center space-x-3">
                <div className="flex ">
                  {data.FlagIcon && <data.FlagIcon />}
                </div>
                <span className="text-sm text-primaryText dark:text-primaryTextDark">
                  {data.name}
                </span>
              </div>
              <span className="font-semibold text-sm text-primaryText dark:text-primaryTextDark">
                ${data.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
