import { ProductParameterProps } from "./types";

export const ProductParameter = ({ title, value }: ProductParameterProps) => {
  return (
    <div className="flex flex-col pb-0 gap-2 h-[5rem] md:h-[4.5rem] ">
      <span className="text-sm lg:text-[12px] 2xl:text-sm text-secondaryText dark:text-secondaryTextDark">
        {title}
      </span>
      <span className="text-sm lg:text-[12px] 2xl:text-base overflow-hidden">
        {value}
      </span>
    </div>
  );
};
