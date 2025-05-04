import { ProductParameterProps } from "./types";

export const ProductParameter = ({ title, value }: ProductParameterProps) => {
  return (
    <div className="flex flex-col pb-0 gap-2 h-[4.5rem] md:h-[4rem] 1xl:h-[4.5rem]">
      <span className="text-[13px] lg:text-[14px] 2xl:text-sm text-secondaryText">
        {title}
      </span>
      <span className="text-[13px] lg:text-[14px] 2xl:text-base overflow-hidden">
        {value}
      </span>
    </div>
  );
};
