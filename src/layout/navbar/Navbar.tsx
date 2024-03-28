"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { LoginModal } from "../../components/auth/LoginModal";
import { Logo } from "../sideMenu/Logo";
import { SignUpModal } from "../../components/auth/SignUpModal";
import { UserIcon } from "../../assets/icons/UserIcon";
import { MailIcon } from "../../assets/icons/MailIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { SideMenuMobile } from "../sideMenu/SideMenuMobile";
import { useAppStore } from "../../store/appStore";
import { PaletteIcon } from "../../assets/icons/PaletteIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";
import { ArrowDownIcon } from "../../assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../assets/icons/ArrowUpIcon";
import { OutlinedButton } from "../../components/common/OutlinedButton";
import { useDropdown } from "../../hooks/useDropdown";
import { Dropdown } from "../../components/common/Dropdown";
import { Link } from "../../i18n/navigation";
import { LanguageIcon } from "../../assets/icons/LanguageIcon";
import { useSession } from "../../hooks/auth/useSession";
import { useHandleLogout } from "../../hooks/auth/useHandleLogout";
import { useTooltip } from "../../hooks/useTooltip";
import { Tooltip } from "../../components/common/Tooltip";

export const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { isMobileMenuOpen, toggleMobileMenu, isSideMenuOpen } = useAppStore();
  const t = useTranslations("navbar");
  const { handleLogout } = useHandleLogout();
  const [isPrismaticTheme, setIsPrismaticTheme] = useState(true);

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const { session } = useSession();

  const themes = [
    "light",
    "dark",
    "charcoal",
    "sapphire",
    "oceanic",
    "sandstone",
    "prismatic",
  ];
  const themesDisplayNames = [
    "Snowlight",
    "Midnight",
    "Charcoal",
    "Sapphire",
    "Oceanic",
    "Sandstone",
    "Prismatic",
  ];

  const paletteTooltip = useTooltip();
  const languageTooltip = useTooltip();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1280 && isMobileMenuOpen) {
        toggleMobileMenu();
      }
    }
  }, []);

  const userIconBtnRef = useRef<HTMLButtonElement | null>(null);

  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  const handleLoginButton = () => {
    setIsLoginModalOpen(true);
  };

  const switchToSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const switchToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const themeDropdown = useDropdown();
  const userDropdown = useDropdown();
  const languageDropdown = useDropdown();

  useEffect(() => {
    const getCurrentLanguage = () => {
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        return pathname.startsWith("/pl") ? "pl" : "en";
      }
      return "en";
    };

    setCurrentLanguage(getCurrentLanguage());
  }, []);

  const selectTheme = (themeName: string) => {
    setTheme(themeName);
    if (theme && themeName === "prismatic") {
      setIsPrismaticTheme(true);
    } else {
      setIsPrismaticTheme(false);
    }
  };

  // This hook and setIsPrismaticTheme state exist because standard conditional
  // rendering based on useTheme causes hydration errors in a browser
  useEffect(() => {
    if (theme && theme === "prismatic") {
      setIsPrismaticTheme(true);
    } else {
      setIsPrismaticTheme(false);
    }
  }, [theme]);

  const cycleThemeUp = () => {
    if (typeof theme === "string") {
      let currentThemeIndex = themes.indexOf(theme);
      let previousThemeIndex =
        (currentThemeIndex - 1 + themes.length) % themes.length;
      setTheme(themes[previousThemeIndex]);
    }
  };

  const cycleThemeDown = () => {
    if (typeof theme === "string") {
      let currentThemeIndex = themes.indexOf(theme);
      let nextThemeIndex = (currentThemeIndex + 1) % themes.length;
      setTheme(themes[nextThemeIndex]);
    }
  };

  return (
    <div
      className={`flex items-center justify-between fixed h-[5rem] xl:h-[4rem] 2xl:h-20 bg-primaryBg dark:bg-primaryBgDark w-full z-30 border-b border-solid border-mainBorder dark:border-mainBorderDark pr-4 sm:pr-6 xl:pr-10 2xl:pr-12 lg:pl-0 pl-4 xsm:pl-5`}
    >
      <div
        className={`${
          isPrismaticTheme
            ? "backdrop-blur-md top-0 left-0 fixed w-screen h-20 z-[-50] border-b border-solid border-mainBorder dark:border-mainBorderDark"
            : "hidden"
        }`}
      />
      <Link
        href="/"
        className={`w-[180px] lg:ml-8 xl:ml-0 xl:w-[220px] 2xl:w-[260px] pr-4 xl:border-r border-mainBorder dark:border-mainBorderDark  ${
          !isSideMenuOpen && "xl:!w-[4.5rem] xl:pr-1"
        }     
        `}
      >
        <Logo />
      </Link>
      <div className="flex justify-end items-center gap-4 lg:gap-7 relative">
        <div
          className="relative"
          ref={themeDropdown.ref}
          onMouseEnter={paletteTooltip.showTooltip}
          onMouseLeave={paletteTooltip.hideTooltip}
        >
          <div
            className="text-white fill-white stroke-secondaryText dark:stroke-secondaryTextDark cursor-pointer hover:stroke-primaryText hover:dark:stroke-primaryTextDark transition"
            onClick={() => {
              themeDropdown.toggle();
              closeMobileMenu();
              languageDropdown.close()
            }}
          >
            <PaletteIcon />
          </div>
          {paletteTooltip.isTooltipVisible &&
            !themeDropdown.isOpen &&
            !languageDropdown.isOpen && (
              <div className="absolute top-10 right-2 pointer-events-none">
                <Tooltip
                  text="Change theme"
                  className=" h-8 px-2  min-w-[7rem] pointer-events-none"
                />
              </div>
            )}
          {themeDropdown.isOpen && (
            <Dropdown className="w-[11rem] min-w-[11rem] right-0 top-11">
              {themes.map((themeName, index) => (
                <div
                  key={themeName}
                  className=" h-10 cursor-pointer px-4 hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark py-2 flex justify-between"
                  onClick={() => selectTheme(themeName)}
                >
                  {themesDisplayNames[index]}
                  {theme === themeName && (
                    <div className="text-secondaryText dark:text-secondaryTextDark">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              ))}
              <div className="h-10 flex w-full border-t border-mainBorder dark:border-mainBorderDark">
                <div
                  onClick={cycleThemeDown}
                  className=" cursor-pointer w-1/2 flex justify-center items-center hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark"
                >
                  <ArrowDownIcon />
                </div>
                <div
                  onClick={cycleThemeUp}
                  className=" cursor-pointer w-1/2 flex justify-center items-center hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark"
                >
                  <ArrowUpIcon />
                </div>
              </div>
            </Dropdown>
          )}
        </div>
        <div className="hidden xl:flex">
          <div
            className="relative"
            ref={languageDropdown.ref}
            onMouseEnter={languageTooltip.showTooltip}
            onMouseLeave={languageTooltip.hideTooltip}
          >
            <button
              onClick={() =>  {
                themeDropdown.close()
                languageDropdown.toggle()
              }}
              className="flex justify-center items-center text-secondaryText dark:text-secondaryTextDark dark:hover:text-primaryTextDark hover:text-primaryText"
            >
              <LanguageIcon />
            </button>
            {languageTooltip.isTooltipVisible &&
              !themeDropdown.isOpen &&
              !languageDropdown.isOpen && (
                <div className="absolute top-10 right-3">
                  <Tooltip
                    text="Change language"
                    className=" h-8 px-3  min-w-32"
                  />
                </div>
              )}
            {languageDropdown.isOpen && (
              <Dropdown className="flex flex-col right-0 top-11 w-36">
                <Link
                  href="/"
                  locale="en"
                  className=" h-10 cursor-pointer px-4 hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark py-2 flex justify-between"
                >
                  {t("english")}
                  {currentLanguage === "en" && (
                    <div className="text-secondaryText dark:text-secondaryTextDark">
                      <CheckIcon />
                    </div>
                  )}
                </Link>
                <Link
                  href="/"
                  locale="pl"
                  className=" h-10 cursor-pointer px-4 hover:bg-dropdownBgHover hover:dark:bg-dropdownBgHoverDark py-2 flex justify-between"
                >
                  {t("polish")}
                  {currentLanguage === "pl" && (
                    <div className="text-secondaryText dark:text-secondaryTextDark">
                      <CheckIcon />
                    </div>
                  )}
                </Link>
              </Dropdown>
            )}
          </div>
        </div>

        <div ref={userDropdown.ref} className="-mr-2 xl:-mr-unset">
          {session && session.username ? (
            <OutlinedButton
              ref={userIconBtnRef}
              handleClick={() => {
                closeMobileMenu();
                userDropdown.toggle();
              }}
              className="!rounded-full"
              icon={<UserIcon />}
            />
          ) : (
            <button
              onClick={handleLoginButton}
              className="transition text-sm 2xl:text-base ml-2 hidden xl:block rounded-xl w-36 2xl:w-40 h-9 2xl:h-10 flex justify-center items-center font-medium border !border-mainColor dark:!border-mainColorDark text-primaryText dark:text-primaryTextDark  dark:hover:bg-navbarButtonBgHoverDark bg-navbarButtonBg text-white dark:bg-navbarButtonBgDark hover:bg-navbarButtonBgHover"
            >
              {t("signIn")}
            </button>
          )}
          {userDropdown.isOpen && (
            <div
              className={`${
                theme === "prismatic" &&
                "backdrop-blur-xl !bg-[rgb(255,255,255,0)]"
              }              
                absolute right-[4.5rem] xl:right-0 top-12 xl:top-10 mt-2 w-76 border border-inputBorder dark:border-inputBorderDark bg-dropdownBg dark:bg-dropdownBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark border rounded shadow`}
            >
              <div className="px-4 pr-5 py-2 pl-[0.9rem] flex dark:hover:bg-inputBgHoverDark hover:bg-dropdownBgHover bg-rgb(0,0,0,0.05)">
                <div className="w-6 flex justify-center items-center mr-3 stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark">
                  <MailIcon />
                </div>
                {session?.username || "Email"}
              </div>
              <div
                className="px-4 py-2 pr-5 pl-[1rem] flex dark:hover:bg-inputBgHoverDark hover:bg-dropdownBgHover  cursor-pointer"
                onClick={() => {
                  handleLogout();
                  userDropdown.toggle();
                }}
              >
                <div className="w-6 flex justify-center items-center mr-[0.6rem] stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark">
                  <LogoutIcon />
                </div>
                <button>{t("signOut")}</button>
              </div>
            </div>
          )}
        </div>

        <button className="relative block xl:hidden" onClick={toggleMobileMenu}>
          <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all  duration-200">
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
              <div
                className={`bg-secondaryText dark:bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "translate-x-10" : ""
                }`}
              ></div>
              <div
                className={`bg-secondaryText dark:bg-white h-[2px] w-7 rounded transform transition-all duration-300 ${
                  isMobileMenuOpen ? "translate-x-10 delay-75" : ""
                }`}
              ></div>
              <div
                className={`bg-secondaryText dark:bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "translate-x-10 delay-150" : ""
                }`}
              ></div>
              <div
                className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${
                  isMobileMenuOpen ? "translate-x-0" : "-translate-x-10"
                } flex w-0 ${isMobileMenuOpen ? "w-12" : ""}`}
              >
                <div
                  className={`absolute bg-secondaryText dark:bg-white h-[2px] w-5 transform transition-all duration-500 ${
                    isMobileMenuOpen ? "rotate-45 delay-300" : "rotate-0"
                  }`}
                ></div>
                <div
                  className={`absolute bg-secondaryText dark:bg-white h-[2px] w-5 transform transition-all duration-500 ${
                    isMobileMenuOpen ? "-rotate-45 delay-300" : "-rotate-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </button>
      </div>
      {isLoginModalOpen && (
        <LoginModal
          closeModal={closeLoginModal}
          switchToSignUp={switchToSignUp}
        />
      )}
      {isSignUpModalOpen && (
        <SignUpModal
          closeModal={closeSignUpModal}
          switchToSignIn={switchToSignIn}
        />
      )}
      <SideMenuMobile
        isMobileMenuOpen={isMobileMenuOpen}
        onLoginButtonClick={handleLoginButton}
      />
    </div>
  );
};
