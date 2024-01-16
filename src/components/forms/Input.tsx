import React, { ReactNode } from "react";

interface InputProps {
  icon?: ReactNode;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
}

export const Input = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  id,
  name,
}: InputProps) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark top-[0.65rem] left-3">
        {icon}
      </div>
      <input
        className={`p-2 text-sm 1xl:text-base w-full h-full border rounded-md border-inputBorder dark:border-inputBorderDark bg-inputBg dark:bg-inputBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark hover:dark:border-inputBorderHoverDark transition hover:dark:bg-inputBgHoverDark hover:bg-outlinedButtonBgHover
        ${icon ? "pl-11" : "pl-3"}        
        `}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
      />
    </div>
  );
};
