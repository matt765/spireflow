import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ArrowDownIcon } from "../../assets/icons/ArrowDownIcon";
import { ArrowDownSimpleIcon } from "../../assets/icons/ArrowDownSimpleIcon";
import { ArrowUpSimpleIcon } from "../../assets/icons/ArrowUpSimpleIcon";
import { s } from "@fullcalendar/core/internal-common";

interface SelectProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  children?: ReactNode;
  customOnDesktop?: boolean;
  customOptions?: string[];
}

export const Select = ({
  value,
  onChange,
  placeholder,
  children,
  customOnDesktop,
  customOptions,
}: SelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number>(
    value ?? ""
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value ?? "");
  }, [value]);

  const handleCustomChange = (newValue: string) => {
    setSelectedValue(newValue);
    if (onChange) {
      onChange({
        target: { value: newValue },
      } as ChangeEvent<HTMLSelectElement>);
    }
    setIsSelectOpen(false);
  };

  useClickOutside(dropdownRef, () => setIsSelectOpen(false));

  const clearSelection = () => {
    setSelectedValue(""); // Reset local state
    if (onChange) {
      // Inform the parent component (simulate empty selection)
      onChange({
        target: { value: "" },
      } as ChangeEvent<HTMLSelectElement>);
    }
    setIsSelectOpen(false); // Optionally close the dropdown
  };
  console.log("value", value)
  console.log("selected", selectedValue)
  console.log("placeholder", placeholder)
  return (
    <>
      <div
        className={`relative   ${
          customOnDesktop ? "hidden lg:block" : "hidden"
        }`}
        ref={dropdownRef}
      >
        <div
          className="text-sm 1xl:text-base rounded-md p-2 pl-3 pr-3 w-full cursor-pointer border border-mainBorder dark:border-mainBorderDark bg-selectBg dark:bg-selectBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark hover:dark:!border-inputBorderHoverDark hover:dark:bg-inputBgHoverDark bg-selectBg dark:bg-selectBgDark hover:bg-selectBgHover dark:hover:bg-selectBgHoverDark"
          onClick={() => setIsSelectOpen(!isSelectOpen)}
        >
          {value || placeholder}
        </div>
        <div className="text-secondaryText absolute top-2 right-1 w-6 h-6">
          {isSelectOpen ? <ArrowUpSimpleIcon /> : <ArrowDownSimpleIcon />}
        </div>
        {/* Dropdown for custom select */}
        {isSelectOpen && (
          <div className="rounded-md backdrop-blur-lg absolute w-full top-[2.9rem] border border-inputBorder dark:border-inputBorderDark z-10 bg-dropdownBg dark:bg-dropdownBgDark text-primaryText dark:text-primaryTextDark">
            <>
              {customOptions?.map((option, index) => (
                <div
                  key={index}
                  className={`text-sm 2xl:text-base p-2 cursor-pointer hover:bg-dropdownBgHover dark:hover:bg-dropdownBgHoverDark
                ${
                  value === option &&
                  "bg-dropdownBgHover dark:bg-dropdownBgHoverDark pointer-events-none"
                }
                `}
                  onClick={() => handleCustomChange(option)}
                >
                  {option}
                </div>
              ))}
              <div
                className={`text-sm 2xl:text-base p-2 cursor-pointer hover:bg-dropdownBgHover dark:hover:bg-dropdownBgHoverDark
                ${
                  !selectedValue &&
                  "bg-dropdownBgHover dark:bg-dropdownBgHoverDark pointer-events-none"
                }
                `}
                onClick={clearSelection}             
              >
                {placeholder}
              </div>
            </>
          </div>
        )}
      </div>
      {/* Default select */}
      <select
        value={value}
        onChange={onChange}
        className={`text-sm 1xl:text-base  rounded-md p-2 pl-3 pr-3 w-full !cursor-pointer border border-inputBorder dark:border-inputBorderDark
  bg-selectBg dark:bg-selectBgDark  text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark
  hover:dark:!border-inputBorderHoverDark  hover:dark:bg-inputBgHoverDark bg-selectBg dark:bg-selectBgDark hover:bg-selectBgHover dark:hover:bg-selectBgHoverDark
        ${customOnDesktop ? "block lg:hidden" : "block"}
  `}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
    </>
  );
};
