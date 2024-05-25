import React from "react";
import Link from "next/link";

import { OutlinedButton } from "../../components/common/OutlinedButton";
import { Tooltip } from "../../components/common/Tooltip";
import { UserButtonProps } from "./types";
import { UserIcon } from "../../assets/icons/UserIcon";
import { MailIcon } from "../../assets/icons/MailIcon";
import { HistoryIcon } from "../../assets/icons/HistoryIcon";
import { InfoIcon } from "../../assets/icons/InfoIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";

export const UserButton = ({
  userIconBtnRef,
  closeMobileMenu,
  userDropdown,
  themeDropdown,
  languageDropdown,
  userTooltip,
  showLogoutModal,
  showAboutModal,
  session,
  theme,
  t,
}: UserButtonProps) => (
  <div
    className="relative"
    ref={userDropdown.ref}
    onMouseEnter={userTooltip.showTooltip}
    onMouseLeave={userTooltip.hideTooltip}
  >
    <OutlinedButton
      ref={userIconBtnRef}
      handleClick={() => {
        closeMobileMenu();
        userDropdown.toggle();
        themeDropdown.close();
        languageDropdown.close();
      }}
      className="!rounded-full"
      icon={<UserIcon />}
      ariaLabel={t("openUserMenu")}
    />
    {userTooltip.isTooltipVisible &&
      !userDropdown.isOpen &&
      !themeDropdown.isOpen &&
      !languageDropdown.isOpen && (
        <div className="absolute top-12 right-4 pointer-events-none hidden xl:flex">
          <Tooltip
            text={t("openUserMenu")}
            className="h-8 px-2 min-w-[7rem] pointer-events-none"
          />
        </div>
      )}
    {userDropdown.isOpen && (
      <div
        className={`${
          theme === "prismatic" && "backdrop-blur-xl !bg-[rgb(255,255,255,0)]"
        } absolute right-[0.5rem] xl:right-0 top-10 xl:top-11 mt-2 w-[13rem] border border-inputBorder dark:border-inputBorderDark bg-dropdownBg dark:bg-dropdownBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark border rounded-md shadow`}
      >
        <div className="px-4 pr-5 py-2 pl-[0.9rem] border-b border-mainBorder dark:border-mainBorderDark flex dark:hover:bg-inputBgHoverDark hover:bg-dropdownBgHover bg-rgb(0,0,0,0.05)">
          <div className="w-6 flex justify-center items-center mr-3 stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark">
            <MailIcon />
          </div>
          {session?.username || "Email"}
        </div>
        <Link
          href="https://github.com/matt765/spireflow/blob/main/CHANGELOG.md"
          target="_blank"
          className="px-4 py-2 pr-5 pl-[1rem] flex dark:hover:bg-inputBgHoverDark hover:bg-dropdownBgHover cursor-pointer"
        >
          <div className="w-5 flex justify-center items-center text-grayIcon dark:text-grayIconDark mr-[0.8rem]">
            <HistoryIcon />
          </div>
          <button>{t("changelog")}</button>
        </Link>
        <div
          className="px-4 py-2 pr-5 pl-[1rem] flex dark:hover:bg-inputBgHoverDark hover:bg-dropdownBgHover cursor-pointer"
          onClick={() => {
            userDropdown.close();
            showAboutModal();
          }}
        >
          <div className="w-5 flex justify-center items-center text-grayIcon dark:text-grayIconDark mr-[0.8rem]">
            <InfoIcon />
          </div>
          <button aria-label={t("about")}>{t("about")}</button>
        </div>
        <div
          className="px-4 py-2 pr-5 pl-[1rem] flex dark:hover:bg-inputBgHoverDark hover:bg-dropdownBgHover cursor-pointer"
          onClick={() => {
            userDropdown.close();
            showLogoutModal();
          }}
        >
          <div className="w-6 flex justify-center items-center mr-[0.6rem] stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark">
            <LogoutIcon />
          </div>
          <button aria-label={t("signOut")}>{t("signOut")}</button>
        </div>
      </div>
    )}
  </div>
);
