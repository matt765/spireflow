import { useState, useRef, useEffect } from "react";

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
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="border px-4 py-2 rounded flex"
      >
        <div className="">Sort By </div>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 bg-white border rounded shadow"
          ref={dropdownRef}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 ${
                selectedSort === option.value ? "bg-gray-300" : ""
              } hover:bg-gray-100 cursor-pointer`}
              onClick={() => handleSortClick(option.value)}
            >
              {option.label}
            </div>
          ))}
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleDirectionClick(false)}
          >
            Ascending
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleDirectionClick(true)}
          >
            Descending
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSelectedSort(null); // Clear the selected sort
              setSorting([]); // Clear the sorting criteria
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
