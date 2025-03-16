import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { ProgressCirclesProps } from "./types";

// Dynamically import ProgressCircle with SSR disabled
const ProgressCircle = dynamic(
  () => import("@tremor/react").then((mod) => mod.ProgressCircle),
  { ssr: false }
);

export const ProgressCircles = ({ metrics }: ProgressCirclesProps) => {
  const t = useTranslations("products.metrics");
  const titles = [
    t("inventoryStatus"),
    t("monthlyTarget"),
    t("orderFullfillment"),
    t("conversionRate"),
  ];
  const { width: windowWidth } = useWindowDimensions();
  const getCircleSize = () => {
    if (windowWidth < 490) {
      return "md";
    } else if (windowWidth < 640) {
      return "xl";
    } else if (windowWidth < 1400) {
      return "md";
    } else {
      return "xl";
    }
  };

  return (
    <div className="mt-16 w-full flex flex-wrap justify-between items-between gap-0 gap-y-10 px-0">
      {metrics.map(({ firstValue, secondValue }, index) => {
        const percentage = Math.round((firstValue / secondValue) * 100);
        return (
          <div
            key={index}
            className="hover:bg-[rgb(255,255,255,0.01)] transition mx-auto sm:mx-unset w-[90%] sm:w-[48%] px-4 flex justify-center items-center border border-mainBorder dark:border-mainBorderDark py-12 rounded-md"
          >
            <div className="flex gap-8 sm:gap-4 md:gap-8 items-center">
              <ProgressCircle
                value={percentage}
                size={getCircleSize()}
                color="slate"
              >
                <span className="text-md 1xl:text-xl text-secondaryText dark:text-secondaryTextDark font-medium">
                  {percentage}%
                </span>
              </ProgressCircle>
              <div className="flex flex-col">
                <div className="font-medium text-xl sm:text-md md:text-xl 2xl:text-2xl text-primaryText dark:text-primaryTextDark">
                  {index === 1 && "$"}
                  {firstValue}
                  {index === 1 && "k"} / {index === 1 && "$"}
                  {secondValue}
                  {index === 1 && "k"}
                </div>
                <div className="text-sm text-secondaryText dark:text-secondaryTextDark">
                  {titles[index]}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
