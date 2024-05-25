"use client";

import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  hidePaper?: boolean;
}

export const PageWrapper = ({
  children,
  hidePaper = false,
}: PageWrapperProps) => {
  return (
    <div
      className={`flex pb-0 flex-col min-h-screen max-w-full h-full w-full pt-[4.5rem] md:pt-[6rem] xl:pt-[6.5rem] 3xl:pt-28 pb-0 md:pb-6 xl:pb-8 items-center
      px-0 md:px-6  xl:pl-3 xl:pr-2 2xl:px-8
      ${hidePaper && ""}
      `}
    >
      <div className="flex flex-col gap-y-6 max-w-full w-full min-h-full lg:h-unset ">
        {hidePaper ? (
          <div className="flex flex-col w-full  gap-y-6 max-w-full h-full p-4 pt-6 sm:p-6 md:p-0">
            {children}
          </div>
        ) : (
          <div
            className="flex w-full  max-w-full p-6 pt-8 sm:p-10 bg-primaryBg xl:rounded-[12px]
            shadow-lg dark:bg-primaryBgDark md:border dark:border-mainBorderDark border-mainBorder min-h-[100vh] xl:min-h-unset       
            bg-primaryBg md:rounded-[12px] shadow-lg dark:bg-primaryBgDark border dark:border-mainBorderDark border-mainBorder"
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
