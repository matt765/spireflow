import { ReactNode } from "react";

interface CenteredPageWrapperProps {
  children: ReactNode;
}

export const CenteredPageWrapper = ({ children }: CenteredPageWrapperProps) => {
  return (
    <div className="flex pb-0 flex-col min-h-screen h-full w-full pt-20 xl:pt-28 xl:pb-8 items-center px-0 xl:px-6  dark:bg-secondaryBgDark">
      <div className="flex justify-center items-center flex-col w-full pt-8 md:p-10 md:pt-0 paper min-h-[80vh] xl:min-h-unset bg-primaryBg xl:rounded-[12px] shadow-lg dark:bg-primaryBgDark border dark:border-mainBorderDark border-mainBorder">
        <div className="w-4/5 mb-4"> {children}</div>
      </div>
    </div>
  );
};
