import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`border border-mainBorder rounded-[12px] dark:!border-mainBorderDark bg-primaryBg dark:bg-primaryBgDark
                relative w-full text-left p-6 h-full   
                ${className} `}
    >
      {children}
    </div>
  );
};
