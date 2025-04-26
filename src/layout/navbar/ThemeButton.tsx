import React from "react";

import { Tooltip } from "../../components/common/Tooltip";
import { Dropdown } from "../../components/common/Dropdown";
import { ThemeButtonProps } from "./types";
import { PaletteIcon } from "../../assets/icons/PaletteIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";
import { ArrowDownIcon } from "../../assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../assets/icons/ArrowUpIcon";

export const ThemeButton = ({
  theme,
  paletteTooltip,
  themeDropdown,
  languageDropdown,
  userDropdown,
  closeMobileMenu,
  selectTheme,
  cycleThemeUp,
  cycleThemeDown,
  themes,
  themesDisplayNames,
  t,
  searchClose
}: ThemeButtonProps) => (
  <div
    className="relative"
    ref={themeDropdown.ref}
    onMouseEnter={paletteTooltip.showTooltip}
    onMouseLeave={paletteTooltip.hideTooltip}
  >
    <div
      className="text-white fill-white stroke-secondaryText cursor-pointer hover:stroke-primaryText transition"
      onClick={() => {
        themeDropdown.toggle();
        closeMobileMenu();
        languageDropdown.close();
        userDropdown.close();
        searchClose();
      }}
    >
      <PaletteIcon />
    </div>
    {paletteTooltip.isTooltipVisible &&
      !userDropdown.isOpen &&
      !themeDropdown.isOpen &&
      !languageDropdown.isOpen && (
        <div className="absolute top-10 right-2 pointer-events-none hidden xl:flex">
          <Tooltip
            text={t("changeTheme")}
            className="h-8 px-2 min-w-[7rem] pointer-events-none"
          />
        </div>
      )}
    {themeDropdown.isOpen && (
      <Dropdown className="w-[11rem] min-w-[11rem] right-0 top-11">
        {themes.map((themeName, index) => (
          <div
            key={themeName}
            className="h-10 text-sm 1xl:text-sm 2xl:text-base cursor-pointer px-4 hover:bg-dropdownBgHover py-2 flex justify-between"
            onClick={() => selectTheme(themeName)}
          >
            {themesDisplayNames[index]}
            {theme === themeName && (
              <div className="text-secondaryText">
                <CheckIcon />
              </div>
            )}
          </div>
        ))}
        <div className="h-10 flex w-full border-t border-mainBorder">
          <div
            onClick={cycleThemeDown}
            className="cursor-pointer w-1/2 flex justify-center items-center hover:bg-dropdownBgHover"
          >
            <ArrowDownIcon />
          </div>
          <div
            onClick={cycleThemeUp}
            className="cursor-pointer w-1/2 flex justify-center items-center hover:bg-dropdownBgHover"
          >
            <ArrowUpIcon />
          </div>
        </div>
      </Dropdown>
    )}
  </div>
);
