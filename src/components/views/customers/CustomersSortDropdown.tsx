import { useState, useRef, useEffect } from "react";

import { SortIcon } from "../../../assets/icons/SortIcon";
import { OutlinedButton } from "../../common/OutlinedButton";

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
  const [selectedSort, setSelectedSort] = useState<string | null>(currentSort);
  const [sortDirection, setSortDirection] = useState<boolean>(currentDirection); // false for Ascending, true for Descending
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedSort(currentSort);
    setSortDirection(currentDirection);
  }, [currentSort, currentDirection]);
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

  const handleSortClick = (optionValue: string) => {
    setSelectedSort(optionValue);
    setSorting([{ id: optionValue, desc: sortDirection }]);
    setIsOpen(false);
  };

  const handleDirectionClick = (desc: boolean) => {
    setSortDirection(desc);
    if (selectedSort) {
      setSorting([{ id: selectedSort, desc }]);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block w-[7.5rem]">
      <OutlinedButton
        handleClick={() => setIsOpen((prev) => !prev)}
        text="Sort By"
        icon={<SortIcon />}
        className="text-sm pr-4"
      />
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 bg-dropdownBg border rounded shadow !outline-0 border border-inputBorder dark:border-inputBorderDark dark:bg-inputBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark"
          ref={dropdownRef}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer px-4 hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark px-4 py-2 ${
                selectedSort === option.value &&
                "bg-dropdownBgHover dark:bg-dropdownBgHoverDark"
              } `}
              onClick={() => handleSortClick(option.value)}
            >
              {option.label}
            </div>
          ))}
          <div
            className="px-4 py-2 hover:bg-dropdownBgHover cursor-pointer"
            onClick={() => handleDirectionClick(false)}
          >
            Ascending
          </div>
          <div
            className="px-4 py-2 hover:bg-dropdownBgHover cursor-pointer"
            onClick={() => handleDirectionClick(true)}
          >
            Descending
          </div>
          <div
            className="px-4 py-2  hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark cursor-pointer"
            onClick={() => {
              setSelectedSort(null);
              setSorting([]);
              setIsOpen(false);
            }}
          >
            Clear Sorting
          </div>
        </div>
      )}
    </div>
  );
};
