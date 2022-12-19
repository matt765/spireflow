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
      <div className="flex h-full w-full">
        <SideMenu />
        <div className="flex flex-col w-full h-full ml-64">
          <Navbar />
          {children}   
          <Footer />     
        </div>
      </div>
    </>
  );
};
