import { useTranslations } from "next-intl";

import { CustomerFilters } from "./useCustomers";
import { FilterIcon } from "../../../assets/icons/FilterIcon";
import { OutlinedButton } from "../../common/OutlinedButton";
import { Dropdown } from "../../common/Dropdown";
import { useDropdown } from "../../../hooks/useDropdown";
import { CheckIcon } from "../../../assets/icons/CheckIcon";

interface CustomersDropdownProps {
  options: string[];
  filterKey: keyof CustomerFilters;
  setFilter: (key: keyof CustomerFilters, value: string | undefined) => void;
  filters: CustomerFilters;
}

export const CustomersCountryDropdown = ({
  options,
  filterKey,
  setFilter,
  filters,
}: CustomersDropdownProps) => {
  const t = useTranslations("customers");
  const { isOpen, toggle, close, ref } = useDropdown();

  const activeFilter = filters[filterKey];

  return (
    <div className="relative inline-block w-44" ref={ref}>
      <OutlinedButton
        handleClick={toggle}
        icon={<FilterIcon />}
        text={t("button.filterByCountry")}
        className="text-sm"
      />
      {isOpen && (
        <Dropdown className="-right-4 md:-right-4  w-[12rem] top-[3.3rem]">
          {options.map((option) => (
            <div
              key={option}
              className={`flex justify-between cursor-pointer px-4 hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark py-2 ${
                activeFilter === option &&
                "bg-dropdownBgHover dark:bg-dropdownBgHoverDark"
              }  `}
              onClick={() => {
                setFilter(filterKey, option);
                close();
              }}
            >
              {option}
              {activeFilter === option && (
                <div className="text-secondaryText dark:text-secondaryTextDark">
                  <CheckIcon />
                </div>
              )}
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
