import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export const PageContainer = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col w-full h-full pt-24 items-center px-2 sm:px-6 lg:px-6 xl:px-12 bg-[#F0F0F5]">
      <div className="flex flex-col gap-y-6 max-w-full w-full">{children}</div>
    </div>
  );
};
