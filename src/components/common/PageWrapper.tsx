"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  hidePaper?: boolean;
}

export const PageWrapper = ({
  className,
  children,
  hidePaper = false,
}: Props) => {
  return (
    <div className="  flex pb-0 flex-col min-h-screen h-full w-full pt-20 xl:pt-28 xl:pb-8 items-center px-0 xl:px-8  xl:px-12">
      <div className="flex flex-col gap-y-6 max-w-full w-full min-h-full lg:h-unset ">
        {!hidePaper ? (
          <div
            className={`flex w-full p-4 pt-8 md:p-10 bg-primaryBg xl:rounded-[12px] shadow-lg dark:bg-primaryBgDark border dark:border-mainBorderDark border-mainBorder min-h-[100vh] xl:min-h-unset
           ${
             !hidePaper &&
             "bg-primaryBg xl:rounded-[12px] shadow-lg dark:bg-primaryBgDark border dark:border-mainBorderDark border-mainBorder"
           }
         `}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
