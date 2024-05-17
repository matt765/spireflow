import { useState, useRef, useEffect } from "react";

import { SortIcon } from "../../../assets/icons/SortIcon";
import { OutlinedButton } from "../../common/OutlinedButton";
import { Dropdown } from "../../common/Dropdown";
import { useDropdown } from "../../../hooks/useDropdown";
import { useTranslations } from "next-intl";
import { CheckIcon } from "../../../assets/icons/CheckIcon";

interface SortDropdownProps {
  options: { value: string; label: string }[];
  setSorting: (value: Array<{ id: string; desc: boolean }>) => void;
  currentSort: string | null;
  currentDirection: boolean;
}

export const CustomersSortDropdown = ({
  options,
  setSorting,
  currentSort,
  currentDirection,
}: SortDropdownProps) => {
  const t = useTranslations("customers");
  const [selectedSort, setSelectedSort] = useState<string | null>(currentSort);
  const [sortDirection, setSortDirection] = useState<boolean>(currentDirection); // false for Ascending, true for Descending
  const { isOpen, toggle, close, ref } = useDropdown();

  useEffect(() => {
    setSelectedSort(currentSort);
    setSortDirection(currentDirection);
  }, [currentSort, currentDirection]);

  const handleSortClick = (optionValue: string) => {
    setSelectedSort(optionValue);
    setSorting([{ id: optionValue, desc: sortDirection }]);
    close();
  };

  const handleDirectionClick = (desc: boolean) => {
    setSortDirection(desc);
    if (selectedSort) {
      setSorting([{ id: selectedSort, desc }]);
      close();
    }
  };

  return (
    <div className="relative inline-block w-[8rem]" ref={ref}>
      <OutlinedButton
        handleClick={toggle}
        text={t("button.sortBy")}
        icon={<SortIcon />}
        className="text-sm pr-4"
      />
      {isOpen && (
        <Dropdown className="right-0 top-[3.3rem] min-w-[12.5rem]">
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex justify-between cursor-pointer px-4 hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark px-4 py-2 ${
                selectedSort === option.value &&
                "bg-dropdownBgHover dark:bg-dropdownBgHoverDark"
              } `}
              onClick={() => handleSortClick(option.value)}
            >
              {option.label}
              {selectedSort === option.value && (
                <div className="text-secondaryText dark:text-secondaryTextDark">
                  <CheckIcon />
                </div>
              )}
            </div>
          ))}
          <div
            className="px-4 py-2 hover:bg-dropdownBgHover cursor-pointer border-t border-mainBorder dark:border-mainBorderDark"
            onClick={() => handleDirectionClick(false)}
          >
            {t("button.ascending")}
          </div>
          <div
            className="px-4 py-2 hover:bg-dropdownBgHover cursor-pointer"
            onClick={() => handleDirectionClick(true)}
          >
            {t("button.descending")}
          </div>
          <div
            className="px-4 py-2  hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark cursor-pointer"
            onClick={() => {
              setSelectedSort(null);
              setSorting([]);
              close();
            }}
          >
            {t("button.clearSorting")}
          </div>
        </Dropdown>
      )}
    </div>
  );
};
