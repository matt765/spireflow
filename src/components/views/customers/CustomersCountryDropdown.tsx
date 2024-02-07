import { useEffect, useRef, useState } from "react";

import { CustomerFilters } from "./useCustomers";
import { FilterIcon } from "../../../assets/icons/FilterIcon";
import { OutlinedButton } from "../../common/OutlinedButton";
import { Dropdown } from "../../common/Dropdown";
import { useDropdown } from "../../../hooks/useDropdown";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("customers");
  const { isOpen, toggle, close, ref } = useDropdown();
  const [activeFilter, setActiveFilter] = useState<string | undefined>();

  return (
    <div className="relative inline-block w-44" ref={ref}>
      <OutlinedButton
        handleClick={toggle}
        icon={<FilterIcon />}
        text={t("button.filterByCountry")}
        className="text-sm"
      />
      {isOpen && (
        <Dropdown className="-right-8 sm:right-0 w-[12rem] top-[3.3rem]">
          {options.map((option) => (
            <div
              key={option}
              className={`cursor-pointer px-4 hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark py-2 ${
                activeFilter === option &&
                "bg-dropdownBgHover dark:bg-dropdownBgHoverDark"
              }  `}
              onClick={() => {
                setFilter(filterKey, option);
                setActiveFilter(option);
                close();
              }}
            >
              {option}
            </div>
          ))}
          <div
            className="px-4 py-2 cursor-pointer hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark border-t border-mainBorder dark:border-mainBorderDark"
            onClick={() => {
              setFilter(filterKey, undefined);
              close();
            }}
          >
            {t("button.clearFilter")}
          </div>
        </Dropdown>
      )}
    </div>
  );
};
