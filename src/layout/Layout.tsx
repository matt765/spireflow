"use client";

import { ReactNode, useEffect } from "react";
import { useTheme } from "next-themes";

import { Navbar } from "./navbar/Navbar";
import { SideMenu } from "./sideMenu/SideMenu";
import { initializeLoadingState, useAppStore } from "../store/appStore";
import { Loader } from "../components/common/Loader";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { isMobileMenuOpen, toggleMobileMenu } = useAppStore();
  const isLoading = useAppStore((state) => state.isLoading);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Initialize the loading state only on the first mount of the Layout component
    initializeLoadingState();
  }, []);

  return (
    <>
      <div className=" flex h-full w-full bg-secondaryBg dark:bg-secondaryBgDark overflow-x-hidden">
        {isLoading && <Loader />}
        <SideMenu />
        <Navbar />
        <div className="flex flex-col w-full xl:max-w-[80%] 1xl:max-w-[82%] 2xl:max-w-[85vw] 5xl:max-w-[102rem] h-full mx-auto">
          <div className="w-full flex justify-center max-w-full">{children}</div>
        </div>
        {isMobileMenuOpen && (
          <div
            className="block xl:hidden h-screen w-screen fixed top-0 left-0 dark:bg-[rgb(0,0,0,0.4)] z-[1]"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
      {theme === "prismatic" && (
        <div className="bg-[url('/bg.jpg')] fixed bg-fixed bg-no-repeat bg-cover z-[-99] top-0 left-0 h-screen w-screen"></div>
      )}
      <div className="w-screen fixed top-0 left-0 h-screen backdrop-blur-xl z-[-1]"></div>
    </>
  );
};
