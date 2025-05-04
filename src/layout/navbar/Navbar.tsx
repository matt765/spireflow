"use client";

import { useTranslations } from "next-intl";

import { LoginModal } from "../../components/auth/LoginModal";
import { SignUpModal } from "../../components/auth/SignUpModal";
import { SideMenuMobile } from "../sideMenu/SideMenuMobile";
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
import { SearchInput } from "./SearchInput";
import { Logo } from "../sideMenu/Logo";

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
    searchDropdown,
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
        className={`w-screen flex items-center z-30  fixed h-[4.5rem]  3xl:h-20 bg-primaryBg w-full border-b border-solid border-mainBorder `}
      >
        {/* Placeholder for maintaining consistent spacing with page wrapper  */}
        <div
          className={`hidden xl:block xl:w-[210px] 1xl:min-w-[220px] 3xl:min-w-[270px] h-[3rem]  ${
            !isSideMenuOpen && "xl:!max-w-[3rem] !w-[3rem] xl:!min-w-[4.5rem] "
          }   
          `}
        ></div>
        <div
          className={`px-6 pr-4 md:px-6  xl:pl-3 xl:pr-2 2xl:px-4 z-40 w-full flex justify-between xl:mx-auto items-center gap-4 xl:gap-7 
         xl:max-w-[82%] 1xl:max-w-[82%] 2xl:max-w-[83vw] 3xl:max-w-[82vw] 5xl:max-w-[102rem]
          `}
        >
          <div className="flex items-center gap-10">
            <div className="flex xsm:pl-2  xl:hidden">
              <Logo />
            </div>
            <SearchInput
              isOpen={searchDropdown.isOpen}
              ref={searchDropdown.ref}
              open={searchDropdown.open}
              close={searchDropdown.close}
              closeOthers={() => {
                themeDropdown.close();
                languageDropdown.close();
                userDropdown.close();
                closeMobileMenu();
              }}
            />
          </div>
          <div className="flex items-center gap-[0.5rem] md:gap-2 xl:gap-7 z-[99]">
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
              searchClose={searchDropdown.close}
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
            <div className="mr-1 2xl:-mr-unset">
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
                  searchClose={searchDropdown.close}
                  t={t}
                />
              ) : (
                <button
                  onClick={handleLoginButton}
                  className="transition text-sm 2xl:text-base ml-2 hidden xl:block rounded-xl w-36 2xl:w-40 h-9 2xl:h-10 flex justify-center items-center font-medium border !border-mainColor text-primaryText hover:bg-navbarButtonBgHover bg-navbarButtonBg text-white"
                >
                  {t("signIn")}
                </button>
              )}
            </div>
            <HamburgerButton
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={() => {
                searchDropdown.close();
                toggleMobileMenu();
              }}
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
