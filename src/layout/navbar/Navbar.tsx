"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { LoginModal } from "../../components/auth/LoginModal";
import { Logo } from "../sideMenu/Logo";
import { SignUpModal } from "../../components/auth/SignUpModal";
import { SideMenuMobile } from "../sideMenu/SideMenuMobile";
import { Link as NavigationLink } from "../../i18n/navigation";
import { LogoutModal } from "../../components/auth/LogoutModal";
import { AboutModal } from "./AboutModal";
import { ChangelogModal } from "./ChangelogModal";
import { ThemeButton } from "./ThemeButton";
import { LanguageButton } from "./LanguageButton";
import { UserButton } from "./UserButton";
import { HamburgerButton } from "./HamburgerButton";
import { useNavbar } from "./hooks/useNavbar";
import { useNavbarModals } from "./hooks/useNavbarModals";
import { useNavbarTooltips } from "./hooks/useNavbarTooltips";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { SearchInput } from "./SearchInput";

export const Navbar = () => {
  const t = useTranslations("navbar");

  const {
    theme,
    currentLanguage,
    isMobileMenuOpen,
    toggleMobileMenu,
    isSideMenuOpen,
    closeMobileMenu,
    session,
    themes,
    themesDisplayNames,
    userIconBtnRef,
    themeDropdown,
    userDropdown,
    languageDropdown,
    selectTheme,
    cycleThemeUp,
    cycleThemeDown,
  } = useNavbar();

  const {
    isLoginModalOpen,
    isSignUpModalOpen,
    isLogoutModalOpen,
    isAboutModalOpen,
    isChangelogModalOpen,
    closeLoginModal,
    closeSignUpModal,
    closeLogoutModal,
    closeAboutModal,
    closeChangelogModal,
    showLogoutModal,
    showAboutModal,
    showChangelogModal,
    switchToSignUp,
    switchToSignIn,
    handleLoginButton,
  } = useNavbarModals();

  const { paletteTooltip, languageTooltip, userTooltip } = useNavbarTooltips();

  return (
    <>
      <div
        className={`w-screen flex items-center z-30  fixed h-[4.5rem]  3xl:h-20 bg-primaryBg dark:bg-primaryBgDark w-full border-b border-solid border-mainBorder dark:border-mainBorderDark pr-4 sm:pr-6 xl:pr-10 2xl:pr-12 lg:pl-0 pl-4 xsm:pl-5`}
      >
        <div
          className={`z-40 w-full flex justify-between items-center gap-4 xl:gap-7 pr-10
          ${isSideMenuOpen ? "pl-[19.8rem]" : "pl-[13.5rem]"}
          ${isSideMenuOpen ? "pr-[1.5rem]" : "pr-[8rem]"}
          `}
        >
          <SearchInput />
          <div className="flex items-center gap-4 xl:gap-7 z-[99]">
            <ThemeButton
              theme={theme}
              isMobileMenuOpen={isMobileMenuOpen}
              paletteTooltip={paletteTooltip}
              themeDropdown={themeDropdown}
              languageDropdown={languageDropdown}
              userDropdown={userDropdown}
              closeMobileMenu={closeMobileMenu}
              selectTheme={selectTheme}
              cycleThemeUp={cycleThemeUp}
              cycleThemeDown={cycleThemeDown}
              themes={themes}
              themesDisplayNames={themesDisplayNames}
              t={t}
            />
            <div className="hidden xl:flex">
              <LanguageButton
                currentLanguage={currentLanguage}
                languageTooltip={languageTooltip}
                languageDropdown={languageDropdown}
                themeDropdown={themeDropdown}
                userDropdown={userDropdown}
                t={t}
              />
            </div>
            <div className="-mr-2 xl:-mr-unset">
              {session && session.username ? (
                <UserButton
                  userIconBtnRef={userIconBtnRef}
                  closeMobileMenu={closeMobileMenu}
                  userDropdown={userDropdown}
                  themeDropdown={themeDropdown}
                  languageDropdown={languageDropdown}
                  userTooltip={userTooltip}
                  showLogoutModal={showLogoutModal}
                  showAboutModal={showAboutModal}
                  showChangelogModal={showChangelogModal}
                  session={session}
                  theme={theme}
                  t={t}
                />
              ) : (
                <button
                  onClick={handleLoginButton}
                  className="transition text-sm 2xl:text-base ml-2 hidden xl:block rounded-xl w-36 2xl:w-40 h-9 2xl:h-10 flex justify-center items-center font-medium border !border-mainColor dark:!border-mainColorDark text-primaryText dark:text-primaryTextDark  dark:hover:bg-navbarButtonBgHoverDark bg-navbarButtonBg text-white dark:bg-navbarButtonBgDark hover:bg-navbarButtonBgHover"
                >
                  {t("signIn")}
                </button>
              )}
            </div>
            <HamburgerButton
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>
        </div>

        <SideMenuMobile
          isMobileMenuOpen={isMobileMenuOpen}
          onLoginButtonClick={handleLoginButton}
        />
        {isMobileMenuOpen && (
          <div
            className="fixed top-[4.5rem] w-full h-full backdrop-blur-md z-10"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
      {isLogoutModalOpen && <LogoutModal closeModal={closeLogoutModal} />}
      {isAboutModalOpen && <AboutModal closeModal={closeAboutModal} />}
      {isChangelogModalOpen && (
        <ChangelogModal closeModal={closeChangelogModal} />
      )}
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
    </>
  );
};
