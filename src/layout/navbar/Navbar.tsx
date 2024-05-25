"use client";

import { useTranslations } from "next-intl";

import { LoginModal } from "../../components/auth/LoginModal";
import { Logo } from "../sideMenu/Logo";
import { SignUpModal } from "../../components/auth/SignUpModal";
import { SideMenuMobile } from "../sideMenu/SideMenuMobile";
import { Link as NavigationLink } from "../../i18n/navigation";
import { LogoutModal } from "../../components/auth/LogoutModal";
import { AboutModal } from "./AboutModal";
import { ThemeButton } from "./ThemeButton";
import { LanguageButton } from "./LanguageButton";
import { UserButton } from "./UserButton";
import { HamburgerButton } from "./HamburgerButton";
import { useNavbar } from "./hooks/useNavbar";
import { useNavbarModals } from "./hooks/useNavbarModals";
import { useNavbarTooltips } from "./hooks/useNavbarTooltips";

export const Navbar = () => {
  const t = useTranslations("navbar");

  const {
    theme,
    currentLanguage,
    isMobileMenuOpen,
    toggleMobileMenu,
    isSideMenuOpen,
    isPrismaticTheme,
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
    closeLoginModal,
    closeSignUpModal,
    closeLogoutModal,
    closeAboutModal,
    showLogoutModal,
    showAboutModal,
    switchToSignUp,
    switchToSignIn,
    handleLoginButton,
  } = useNavbarModals();

  const { paletteTooltip, languageTooltip, userTooltip } = useNavbarTooltips();

  return (
    <>
      <div
        className={`flex items-center justify-between fixed h-[4.5rem]  3xl:h-20 bg-primaryBg dark:bg-primaryBgDark w-full z-30 border-b border-solid border-mainBorder dark:border-mainBorderDark pr-4 sm:pr-6 xl:pr-10 2xl:pr-12 lg:pl-0 pl-4 xsm:pl-5`}
      >
        <div
          className={`${
            isPrismaticTheme
              ? "backdrop-blur-md top-0 left-0 fixed w-screen h-[4.5rem] 3xl:h-20 z-[-50] border-b border-solid border-mainBorder dark:border-mainBorderDark"
              : "hidden"
          }`}
        />
        <NavigationLink
          href="/"
          className={`w-[180px] lg:ml-8 xl:ml-0 xl:w-[220px] 3xl:w-[260px] pr-4 xl:border-r border-mainBorder dark:border-mainBorderDark  ${
            !isSideMenuOpen && "xl:!w-[4.5rem] xl:pr-1 pl-2"
          }     
        `}
        >
          <Logo />
        </NavigationLink>
        <div className="flex justify-end items-center gap-4 xl:gap-7 relative">
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
        {isMobileMenuOpen && (
          <div
            className="fixed top-[4.5rem] w-full h-full backdrop-blur-md z-10"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
      {isLogoutModalOpen && <LogoutModal closeModal={closeLogoutModal} />}
      {isAboutModalOpen && <AboutModal closeModal={closeAboutModal} />}
    </>
  );
};
