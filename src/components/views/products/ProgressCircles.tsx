import { ProgressCircle } from "@tremor/react";
import { useTranslations } from "next-intl";

interface ProgressCirclesProps {
  metrics: {
    title: string;
    firstValue: number;
    secondValue: number;
  }[];
}

export const ProgressCircles = ({ metrics }: ProgressCirclesProps) => {
  const t = useTranslations("products.metrics");

  const titles = [
    t("inventoryStatus"),
    t("monthlyTarget"),
    t("orderFullfillment"),
    t("conversionRate"),
  ];

  return (
    <div className="mt-16 w-full flex flex-wrap justify-between items-between gap-0 gap-y-10 px-0">
      {metrics.map(({ title, firstValue, secondValue }, index) => {
        const percentage = Math.round((firstValue / secondValue) * 100);
        return (
          <div
            key={index}
            className="w-[48%] px-8 flex justify-center items-center border border-mainBorder dark:border-mainBorderDark py-12 rounded-md"
          >
            <div className="flex gap-8 items-center">
              <ProgressCircle value={percentage} size="xl" color="slate">
                <span className="text-xl text-secondaryText dark:text-secondaryTextDark font-medium">
                  {percentage}%
                </span>
              </ProgressCircle>
              <div className="flex flex-col">
                <div className="font-medium text-2xl text-primaryText dark:text-primaryTextDark">
                  {index === 1 && "$"} {firstValue}
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
