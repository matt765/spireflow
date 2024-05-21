import React, { ReactNode } from "react";

interface InputProps {
  icon?: ReactNode;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  className?: string;
  autoComplete?: string;
}

export const Input = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  onInput,
  id,
  name,
  className,
  autoComplete
}: InputProps) => {
  return (
    <div className="relative w-full h-full ">
      <div className="absolute stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark top-[0.5rem] xl:top-[0.55rem] 2xl:top-[0.65rem] left-3 ">
        {icon}
      </div>
      <input
        className={`p-2 text-sm 1xl:text-base bg-inputBg dark:bg-inputBgDark  hover:dark:bg-inputBgHoverDark hover:bg-InputBgHover w-full h-full border rounded-md border-inputBorder dark:border-inputBorderDark  text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark hover:dark:border-inputBorderHoverDark hover:border-inputBorderHover transition
        ${icon ? "pl-11" : "pl-3"}  
        ${className}   
        autofill:!bg-inputBg
        shadow-none
        `}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={onInput}
        id={id}
        name={name}
        autoComplete={autoComplete}
      />
      <style jsx>{`
      
      `}</style>
    </div>
  );
};
