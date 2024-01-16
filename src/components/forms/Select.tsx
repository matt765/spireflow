import React, { ChangeEvent, ReactNode } from "react";

interface SelectProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  children: ReactNode;
}

export const Select = ({
  value,
  onChange,
  placeholder,
  children,
}: SelectProps) => (
  <select
    value={value}
    onChange={onChange}
    className="text-sm 1xl:text-base  rounded-md p-2 pl-3 pr-3 w-full !cursor-pointer border border-inputBorder dark:border-inputBorderDark
    bg-selectBg dark:bg-selectBgDark  text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark
    hover:dark:!border-inputBorderHoverDark  hover:dark:bg-inputBgHoverDark bg-selectBg dark:bg-selectBgDark hover:bg-selectBgHover dark:hover:bg-selectBgHoverDark"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {children}
  </select>
);
