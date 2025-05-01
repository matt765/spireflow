"use client";

import { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { DownloadIcon } from "../../assets/icons/DownloadIcon";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  hidePaper?: boolean;
  pageName?: string;
}

export const PageWrapper = ({
  children,
  hidePaper = false,
  pageName,
}: PageWrapperProps) => {
  return (
    <main
      className={`flex pb-0 flex-col min-h-screen max-w-full h-full w-full pt-[4.5rem] md:pt-[4.5rem] xl:pt-[6rem] 1xl:pt-[6.5rem] 3xl:pt-[6rem] pb-0 md:pb-0 xl:pb-8 items-center
     
      ${
        hidePaper &&
        "pt-[4.5rem] md:!pt-[6rem] xl:!pt-[6rem] 3xl:!pt-[6rem] md:px-6 xl:px-0 pb-0 md:!pb-8 xl:pb-8"
      }
      `}
      role="main"
    >
      <div className="flex flex-col max-w-full w-full min-h-full lg:h-unset">
        {!hidePaper && (
          <div className="w-full flex justify-between items-center">
            <Breadcrumbs pageName={pageName} />
            <div className="w-[6rem] h-[2.4rem]">
              <button className="-mt-[0.1rem] text-xs xsm:text-sm 3xl:text-base cursor-pointer flex rounded-md justify-center items-center gap-2 w-full h-full p-2 px-4 !outline-0 border border-mainBorder hover:border-mainBorderHover text-primaryText stroke-grayIcon fill-grayIcon">
                <DownloadIcon /> CSV
              </button>
            </div>
          </div>
        )}
        {hidePaper ? (
          <div
            className="flex flex-col w-full  max-w-full h-full p-4 pt-6 sm:p-6 md:p-0"
            aria-hidden="true"
          >
            <div className="w-full flex justify-between items-center">
              <Breadcrumbs pageName={pageName} />
              <div className="w-[6rem] h-[2.4rem]">
                <button className="-mt-[0.1rem] text-xs xsm:text-sm 3xl:text-base cursor-pointer flex rounded-md justify-center items-center gap-2 w-full h-full p-2 px-4 !outline-0 border border-mainBorder hover:border-mainBorderHover text-primaryText stroke-grayIcon fill-grayIcon">
                  <DownloadIcon /> CSV
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full gap-y-4 1xl:gap-y-6 max-w-full h-full pt-3">
              {children}
            </div>
          </div>
        ) : (
          <div className="mt-3 flex w-full max-w-full p-8 1xl:p-10 bg-primaryBg xl:rounded-[10px] shadow-lg xl:border border-mainBorder min-h-[100vh] xl:min-h-unset xl:rounded-[12px] xl:border">
            {children}
          </div>
        )}
      </div>
    </main>
  );
};
