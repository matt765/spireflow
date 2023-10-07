// import MoonLineIcon from "remixicon-react/MoonLineIcon";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";

import { EnglishIcon } from "../../assets/icons/EnglishIcon";
import { LoginModal } from "../../components/auth/LoginModal";
import { useLoginStore } from "../../store/loginStore";
import { Logo } from "../sideMenu/Logo";
import { SignUpModal } from "../../components/auth/SignUpModal";
import { SpinnerIcon } from "../../assets/icons/Spinner";
import { UserIcon } from "../../assets/icons/UserIcon";
import { MailIcon } from "../../assets/icons/MailIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { MoonIcon } from "../../assets/icons/MoonIcon";
import { SideMenuMobile } from "../sideMenu/SideMenuMobile";
import { useAppStore } from "../../store/appStore";

export const Navbar = () => {
  const { user, setUser, loading, initializeUser } = useLoginStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isMobileMenuOpen, toggleMobileMenu, isSideMenuOpen } = useAppStore();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { data: session } = useSession();
  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();

    localStorage.removeItem("user");
    setUser(null);
  };
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.getElementById("navbar-dropdown");
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between fixed h-20 bg-primaryBg dark:bg-primaryBgDark w-full z-30 border-b border-solid border-mainBorder dark:border-mainBorderDark pr-6 lg:pr-12 lg:pl-0 pl-4">
      <NextLink
        href="/"
        className={`w-[180px] lg:ml-8 xl:ml-0 xl:w-[220px] 2xl:w-[260px] pr-4 xl:border-r border-mainBorder dark:border-mainBorderDark ${
          !isSideMenuOpen && "xl:!w-[4.5rem] xl:pr-1"
        }`}
      >
        <Logo />
      </NextLink>
      <div className="flex justify-end items-center gap-4 lg:gap-6 relative">
        <button onClick={toggleTheme} className="">
          {theme === "dark" ? <MoonIcon /> : <MoonIcon />}
        </button>
        <div className="hidden xl:flex">
          <EnglishIcon />
        </div>
        {loading ? (
          <SpinnerIcon />
        ) : (
          <>
            {user || session?.user?.name ? (
              <button
                onClick={handleDropdownClick}
                className=" w-10 h-10 rounded-full border border-mainBorder dark:border-[rgb(255,255,255,0.3)] p-2 pl-[0.55rem] mr-[-0.5rem] ml-2 xl:ml-0 xl:mr-0 stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark form-element-styled"
              >
                <UserIcon />
              </button>
            ) : (
              <button
                onClick={handleLoginButton}
                className="hidden xl:block rounded-xl w-40 h-10 flex justify-center items-center font-medium font-['Inter'] border border-mainColor dark:border-mainColorDark text-primaryText dark:text-primaryTextDark bg-[rgb(255,255,255,0.02)] dark:hover:bg-[rgb(255,255,255,0.06)]"
              >
                Sign In
              </button>
            )}
            {isDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-76 border border-inputBorder dark:border-inputBorderDark bg-inputBg dark:bg-inputBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark border rounded shadow"
                id="navbar-dropdown"
              >
                <div className="px-4 pr-5 py-2 pl-[0.9rem] flex dark:hover:bg-inputBgHoverDark hover:bg-inputBgHover">
                  <div className="w-6 flex justify-center items-center mr-3 stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark">
                    <MailIcon />
                  </div>
                  {user?.email || session?.user?.email || "Email"}
                </div>
                <div
                  className="px-4 py-2 pr-5 pl-[1rem] flex dark:hover:bg-inputBgHoverDark hover:bg-inputBgHover cursor-pointer"
                  onClick={handleSignOut}
                >
                  <div className="w-6 flex justify-center items-center mr-[0.6rem] stroke-grayIcon dark:stroke-grayIconDark dark:fill-grayIconDark">
                    <LogoutIcon />
                  </div>
                  <button>Sign Out</button>
                </div>
              </div>
            )}
          </>
        )}
        <button className="relative block xl:hidden" onClick={toggleMobileMenu}>
          <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all  duration-200">
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
              <div
                className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "translate-x-10" : ""
                }`}
              ></div>
              <div
                className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 ${
                  isMobileMenuOpen ? "translate-x-10 delay-75" : ""
                }`}
              ></div>
              <div
                className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "translate-x-10 delay-150" : ""
                }`}
              ></div>
              <div
                className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${
                  isMobileMenuOpen ? "translate-x-0" : "-translate-x-10"
                } flex w-0 ${isMobileMenuOpen ? "w-12" : ""}`}
              >
                <div
                  className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 ${
                    isMobileMenuOpen ? "rotate-45 delay-300" : "rotate-0"
                  }`}
                ></div>
                <div
                  className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 ${
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
