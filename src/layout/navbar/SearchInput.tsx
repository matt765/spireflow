"use client";

import { SearchIcon } from "../../assets/icons/SearchIcon";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useSearchInput } from "./hooks/useSearchInput";

export const SearchInput = () => {
  const {
    searchText,
    isDropdownOpen,
    dropdownRef,
    filteredSections,
    searchPlaceholder,
    noResultsText,
    handleSearchChange,
    handleInputFocus,
    handleSectionClick,
    closeDropdown,
  } = useSearchInput();

  useClickOutside(dropdownRef, closeDropdown);

  return (
    <>
      <div
        className="w-[15rem] h-[2.5rem] alternativeScrollbar"
        ref={dropdownRef}
      >
        <div className="relative w-full h-full">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchText}
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
            className="z-30 pl-8 text-primaryText dark:text-primaryTextDark pt-[0.1rem] bg-[rgb(255,255,255,0.01)] w-full h-full border dark:border-mainBorderDark border-mainBorder hover:dark:border-mainBorderDarkHover hover:border-mainBorderHover rounded-md"
          />
          <div className="absolute stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark top-[0.5rem] xl:top-[0.55rem] 2xl:top-[0.65rem] left-2">
            <SearchIcon />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-[200%] mt-1 bg-dropdownBg dark:bg-dropdownBgDark border dark:border-inputBorderDark border-inputBorder rounded-md shadow-md z-40 max-h-64 overflow-y-auto">
              {filteredSections.length > 0 ? (
                filteredSections.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSectionClick(item)}
                    className="flex justify-between items-center px-5 py-4 hover:bg-dropdownBgHover dark:hover:bg-dropdownBgHoverDark cursor-pointer border-b dark:border-mainBorderDark border-mainBorder last:border-b-0"
                  >
                    <span className="text-primaryText dark:text-primaryTextDark font-medium">
                      {item.translatedSection}
                    </span>
                    <div className="bg-outlinedButtonBg dark:bg-outlinedButtonBgDark text-secondaryText dark:text-secondaryTextDark text-xs px-2 py-1 rounded border border-mainBorder dark:border-mainBorderDark">
                      {item.translatedPage}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-5 py-5 text-center text-secondaryText dark:text-secondaryTextDark">
                  {noResultsText}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
