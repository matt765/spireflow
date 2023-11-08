import React, { ChangeEvent, FC, ReactNode } from "react";

interface SelectProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
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
    className="text-base  rounded-md p-2 pl-3 pr-3 w-full !cursor-pointer form-element-styled transition "
  >
    <option value="">{placeholder}</option>
    {children}
  </select>
);
