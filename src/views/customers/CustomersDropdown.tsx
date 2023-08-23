import { useEffect, useRef, useState } from "react";
import { CustomerFilters } from "./useCustomers";

interface CustomersDropdownProps {
  options: string[];
  filterKey: keyof CustomerFilters;
  setFilter: (key: keyof CustomerFilters, value: string | undefined) => void;
}

export const CustomersDropdown = ({
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
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="border px-4 py-2 rounded"
      >
        Filter by {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
      </button>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 bg-white border rounded shadow"
          ref={dropdownRef}
        >
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 ${
                activeFilter === option ? "bg-gray-300" : ""
              } hover:bg-gray-100 cursor-pointer`}
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
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
