import { ReactNode } from "react";

interface CenteredPageWrapperProps {
  children: ReactNode;
}

export const CenteredPageWrapper = ({ children }: CenteredPageWrapperProps) => {
  return (
    <main
      className="flex pb-0 flex-col h-screen w-full pt-0 md:pt-8 lg:pt-16 xl:pt-[6.5rem] 3xl:pt-28 xl:pb-8 items-center px-0 xl:px-8 bg-secondaryBg"
      role="main"
    >
      <div className="flex h-full xl:h-auto justify-center items-center flex-col w-full md:p-10 md:pt-12 3xl:pt-0 bg-primaryBg xl:rounded-[12px] shadow-lg xl:border border-mainBorder min-h-[85vh] 3xl:min-h-[80vh] xl:min-h-unset border">
        <div className="-mt-12 xsm:-mt-0 w-10/12 md:w-4/5 mb-4">{children}</div>
      </div>
    </main>
  );
};
