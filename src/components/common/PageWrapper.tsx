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
    <main
      className={`flex pb-0 flex-col min-h-screen max-w-full h-full w-full pt-[4.5rem] md:pt-[4.5rem] xl:pt-[6rem] 1xl:pt-[6.5rem] 3xl:pt-28 pb-0 md:pb-0 xl:pb-8 items-center
     
      ${hidePaper && "pt-[4.5rem] md:!pt-[6rem] xl:!pt-[6rem] 3xl:!pt-[7rem] md:px-6 xl:px-0 pb-0 md:!pb-8 xl:pb-8"}
      `}
      role="main"
    >
      <div className="flex flex-col gap-y-6 max-w-full w-full min-h-full lg:h-unset">
        {hidePaper ? (
          <div
            className="flex flex-col w-full gap-y-4 1xl:gap-y-6 max-w-full h-full p-4 pt-6 sm:p-6 md:p-0"
            aria-hidden="true"
          >
            {children}
          </div>
        ) : (
          <div
            className="flex w-full max-w-full p-8 1xl:p-10 bg-primaryBg xl:rounded-[12px] shadow-lg xl:border border-mainBorder min-h-[100vh] xl:min-h-unset xl:rounded-[12px] xl:border"
          >
            {children}
          </div>
        )}
      </div>
    </main>
  );
};
