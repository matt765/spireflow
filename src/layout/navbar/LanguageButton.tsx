import React from "react";

import { Tooltip } from "../../components/common/Tooltip";
import { Dropdown } from "../../components/common/Dropdown";
import { LanguageButtonProps } from "./types";
import { Link as NavigationLink } from "../../i18n/navigation";
import { LanguageIcon } from "../../assets/icons/LanguageIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";

export const LanguageButton = ({
  currentLanguage,
  languageTooltip,
  languageDropdown,
  themeDropdown,
  userDropdown,
  t,
}: LanguageButtonProps) => (
  <div
    className="relative"
    ref={languageDropdown.ref}
    onMouseEnter={languageTooltip.showTooltip}
    onMouseLeave={languageTooltip.hideTooltip}
  >
    <button
      onClick={() => {
        themeDropdown.close();
        languageDropdown.toggle();
        userDropdown.close();
      }}
      className="flex justify-center items-center text-secondaryText dark:text-secondaryTextDark dark:hover:text-primaryTextDark hover:text-primaryText"
    >
      <LanguageIcon />
    </button>
    {languageTooltip.isTooltipVisible &&
      !themeDropdown.isOpen &&
      !userDropdown.isOpen &&
      !languageDropdown.isOpen && (
        <div className="absolute top-10 right-3 hidden xl:flex">
          <Tooltip text={t("changeLanguage")} className="h-8 px-3 min-w-32" />
        </div>
      )}
    {languageDropdown.isOpen && (
      <Dropdown className="flex flex-col right-0 top-11 w-36">
        <NavigationLink
          href="/"
          locale="en"
          className="h-10 cursor-pointer px-4 hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark py-2 flex justify-between"
        >
          {t("english")}
          {currentLanguage === "en" && (
            <div className="text-secondaryText dark:text-secondaryTextDark">
              <CheckIcon />
            </div>
          )}
        </NavigationLink>
        <NavigationLink
          href="/"
          locale="pl"
          className="h-10 cursor-pointer px-4 hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark py-2 flex justify-between"
        >
          {t("polish")}
          {currentLanguage === "pl" && (
            <div className="text-secondaryText dark:text-secondaryTextDark">
              <CheckIcon />
            </div>
          )}
        </NavigationLink>
      </Dropdown>
    )}
  </div>
);
