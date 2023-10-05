import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ title, className, children }: Props) => {
  return (
    <div
      className={`flex pb-0 flex-col min-h-screen h-full w-full pt-20 xl:pt-28 xl:pb-8 items-center px-0 xl:px-8  xl:px-12 bg-secondaryBg dark:bg-secondaryBgDark ${
        className || ""
      }`}
    >
      <div className="flex flex-col gap-y-6 max-w-full w-full min-h-full lg:h-unset">
        {children}
      </div>
    </div>
  );
};
