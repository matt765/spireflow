"use client";

import React, { Suspense, lazy } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

import "react-tooltip/dist/react-tooltip.css";
import { BlockTitle } from "../../common/BlockTitle";
import { EnglishIcon } from "../../../assets/icons/EnglishIcon";
import { PolishIcon } from "../../../assets/icons/PolishIcon";
import { UnitedStatesIcon } from "../../../assets/icons/UnitedStatesIcon";
import { FranceIcon } from "../../../assets/icons/FranceIcon";
import { NorwayIcon } from "../../../assets/icons/NorwayIcon";
import { AustraliaIcon } from "../../../assets/icons/AustraliaIcon";
import { useTranslations } from "next-intl";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { RevenuePerCountryProps } from "./types";
import { Card } from "../../common/Card";

const HIGHLIGHT_COLOR = "rgb(59, 130, 246)";

const ComposableMapLazy = lazy(() =>
  import("react-simple-maps").then((module) => ({
    default: module.ComposableMap,
  }))
);

export const RevenuePerCountry = ({
  revenuePerCountryData,
}: RevenuePerCountryProps) => {
  const t = useTranslations("analytics.revenuePerCountry");
  const backendTranslations = useBackendTranslations(
    "analytics.revenuePerCountry"
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

  const dataWithIcons = translatedData.map((country) => ({
    ...country,
    FlagIcon: countryIconMap[country.name],
  }));

  return (
    <Card className="h-full relative overflow-hidden flex flex-col">
      <BlockTitle title={t("title")} />
      <div className="flex -ml-8 2xl:-ml-10 gap-16 max-h-[25rem] pt-8 mt-4 ">
        <Suspense fallback={<div>Loading map...</div>}>
          <ComposableMapLazy width={800} height={440}>
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
                        fill={countryData ? HIGHLIGHT_COLOR : "#D6D6DA"}
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
        <div className="flex flex-col p-0 overflow-auto min-w-[18rem] gap-3 overflow-hidden -mt-8 px-2">
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
