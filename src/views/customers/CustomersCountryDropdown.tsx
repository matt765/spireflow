import { useEffect, useRef, useState } from "react";

import { CustomerFilters } from "./useCustomers";
import { FilterIcon } from "../../assets/icons/FilterIcon";

interface CustomersDropdownProps {
  options: string[];
  filterKey: keyof CustomerFilters;
  setFilter: (key: keyof CustomerFilters, value: string | undefined) => void;
}

export const CustomersCountryDropdown = ({
  options,
  filterKey,
  setFilter,
}: CustomersDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string | undefined>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block w-1/2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="border px-4 py-2 rounded form-element-styled flex items-center w-full md:w-auto justify-center"
      >
        <div className="mr-2 stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark">
          <FilterIcon />
        </div>
        <div className="text-sm md:text-md whitespace-nowrap">Filter by Country</div>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 left-0 w-52 md:w-56 bg-white border rounded shadow !outline-0 border border-inputBorder dark:border-inputBorderDark bg-inputBg dark:bg-inputBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark"
          ref={dropdownRef}
        >
          {options.map((option) => (
            <div
              key={option}
              className={`cursor-pointer px-4 hover:bg-inputBgHover hover:dark:bg-inputBgHoverDark py-2 ${
                activeFilter === option &&
                "bg-inputBgHover dark:bg-inputBgHoverDark"
              }  `}
              onClick={() => {
                setFilter(filterKey, option);
                setActiveFilter(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
          <div
            className="px-4 py-2 cursor-pointer hover:bg-inputBgHover hover:dark:bg-inputBgHoverDark"
            onClick={() => {
              setFilter(filterKey, undefined);
              setIsOpen(false);
            }}
          >
            Clear Filter
          </div>
        </div>
      )}
    </div>
  );
};
