import { ReactNode } from "react";
import { Navbar } from "./navbar/Navbar";
import { SideMenu } from "./sideMenu/SideMenu";
import { Footer } from "../layout/footer/Footer";
import { useAppStore } from "../store/appStore";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { isMobileMenuOpen, toggleMobileMenu } = useAppStore();

  return (
    <>
      <div className="flex h-full w-full  bg-secondaryBg dark:bg-secondaryBgDark overflow-x-hidden ">
        <SideMenu />
        <Navbar />
        {/* Variety of fixed max width is present here because otherwise Tremor graphs rerender on width change,
        causing flickering effect when SideMenu is hidden */}
        <div className="flex flex-col w-full xl:max-w-[71rem] 1xl:max-w-[75rem] 2xl:max-w-[85vw] 5xl:max-w-[102rem] h-full mx-auto">
          <div className="w-full "> {children}</div>
        </div>
        {isMobileMenuOpen && (
          <div
            className="block xl:hidden h-screen w-screen fixed top-0 left-0 dark:bg-[rgb(0,0,0,0.4)] z-[1]"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
    </>
  );
};
