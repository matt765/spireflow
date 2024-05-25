"use client";

import { LineChart } from "@tremor/react";
import { useTranslations } from "next-intl";

import { CenteredPageWrapper } from "../../../components/common/CenteredPageWrapper";

const Line = () => {
  const t = useTranslations("singleCharts.line");

  const dragonPopulationInWesteros = [
    {
      year: "0 AC",
      title: t("aegonsConquest"),
      [t("houseTargaryen")]: 3,
      [t("houseVelaryon")]: 0,
    },
    {
      year: "60 AC",
      title: t("theLongReignOfJaehaerysI"),
      [t("houseTargaryen")]: 19,
      [t("houseVelaryon")]: 2,
    },
    {
      year: "120 AC",
      title: t("houseOfTheDragonSeries"),
      [t("houseTargaryen")]: 15,
      [t("houseVelaryon")]: 3,
    },
    {
      year: "180 AC",
      title: t("theConquestOfDorne"),
      [t("houseTargaryen")]: 4,
      [t("houseVelaryon")]: 0,
    },
    {
      year: "240 AC",
      title: t("theBlackfyreRebellions"),
      [t("houseTargaryen")]: 0,
      [t("houseVelaryon")]: 0,
    },
    {
      year: "300 AC",
      title: t("timeOfTheShowBooksStart"),
      [t("houseTargaryen")]: 3,
      [t("houseVelaryon")]: 0,
    },
  ];
  const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <CenteredPageWrapper>
      <div className="text-2xl w-full text-left mb-6 text-primaryText dark:text-primaryTextDark">
        {t("title")}
      </div>
      <LineChart
        className="mt-6"
        data={dragonPopulationInWesteros}
        index="year"
        categories={[t("houseTargaryen"), t("houseVelaryon")]}
        colors={["emerald", "slate"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
        intervalType="preserveStartEnd"
      />
      <div className="w-full hidden sm:flex justify-between mx-auto mt-8 ml-8">
        {dragonPopulationInWesteros.map((item, index) => (
          <div
            key={index}
            className="text-xs text-primaryText dark:text-primaryTextDark"
          >
            {item.title}
          </div>
        ))}
      </div>
    </CenteredPageWrapper>
  );
};

export default Line;
