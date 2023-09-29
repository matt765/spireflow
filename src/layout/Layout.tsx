import { ReactNode } from "react";
import { Navbar } from "./navbar/Navbar";
import { SideMenu } from "./sideMenu/SideMenu";
import { Footer } from "../layout/footer/Footer";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex h-full w-full  bg-primaryBg dark:bg-primaryBgDark">
        <SideMenu />
        <Navbar />
        <div className="flex flex-col w-full h-full  ">
         
          {children}   
          {/* <Footer />      */}
        </div>
      </div>
    </>
  );
};
