"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Navbar } from "./navbar/Navbar";
import { SideMenu } from "./sideMenu/SideMenu";
import { useAppStore } from "../store/appStore";
import { Loader } from "../components/common/Loader";
import { useSession } from "../hooks/auth/useSession";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isMobileMenuOpen, toggleMobileMenu } = useAppStore();
  const [isLoadingScreenDisplayed, setIsLoadingScreenDisplayed] =
    useState(true);

  const { session } = useSession();

  useEffect(() => {
    if (session !== null) {
      setTimeout(() => {
        setIsLoadingScreenDisplayed(false);
      }, 300);
    }
  }, [session]);

  const currentPathname = usePathname();

  const pathsWithNoLayout = [
    "/login",
    "/pl/login",
    "/register",
    "/pl/register",
  ];

  return (
    <>
      <div className=" flex h-full w-full bg-secondaryBg dark:bg-secondaryBgDark overflow-x-hidden">
        {isLoadingScreenDisplayed && <Loader />}
        {!pathsWithNoLayout.includes(currentPathname) && (
          <>
            <SideMenu />
            <Navbar />
          </>
        )}
        <div className="flex flex-col w-full xl:max-w-[80%] 1xl:max-w-[82%] 2xl:max-w-[82vw] 5xl:max-w-[102rem] h-full mx-auto relative">
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
      <div className="w-screen fixed top-0 left-0 h-screen z-[-1]"></div>
    </>
  );
};
