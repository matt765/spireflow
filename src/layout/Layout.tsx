"use client";

import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { Navbar } from "./navbar/Navbar";
import { SideMenu } from "./sideMenu/SideMenu";
import { useAppStore } from "../store/appStore";
import { Loader } from "../components/common/Loader";
import { useSession } from "../hooks/auth/useSession";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { isMobileMenuOpen, toggleMobileMenu } = useAppStore();
  const { theme = "prismatic" } = useTheme();
  const [isLoadingScreenDisplayed, setIsLoadingScreenDisplayed] =
    useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingScreenDisplayed(false);
    }, 500);
  }, []);

  const currentPathname = usePathname();

  const pathsWithNoLayout = [
    "/login",
    "/pl/login",
    "/register",
    "/pl/register",
  ];

  return (
    <>
      <div className=" flex h-full w-full bg-secondaryBg dark:bg-secondaryBgDark overflow-x-hidden z-50">
        {isLoadingScreenDisplayed && <Loader />}
        {!pathsWithNoLayout.includes(currentPathname) && (
          <>
            <SideMenu />
            <Navbar />
          </>
        )}
        <div className="flex flex-col w-full xl:max-w-[80%] 1xl:max-w-[82%] 2xl:max-w-[85vw] 5xl:max-w-[102rem] h-full mx-auto">
          <div className="w-full flex justify-center max-w-full">
            {children}
          </div>
        </div>
        {isMobileMenuOpen && (
          <div
            className="block xl:hidden h-screen w-screen fixed top-0 left-0 dark:bg-[rgb(0,0,0,0.4)] z-[1]"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
      <div
        className={`${
          theme === "prismatic" &&
          "gradientBackground fixed bg-fixed bg-no-repeat bg-cover z-[-99] top-0 left-0 h-screen w-screen"
        }`}
      />
      <div className="w-screen fixed top-0 left-0 h-screen z-[-1]"></div>
    </>
  );
};
