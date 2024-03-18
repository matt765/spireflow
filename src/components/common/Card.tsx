import { useTheme } from "next-themes";
import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={`border border-mainBorder rounded-md dark:!border-mainBorderDark bg-primaryBg dark:bg-primaryBgDark
                relative w-full text-left p-6 h-full ${className}
                ${theme === "prismatic" && `shadow-xl`}
                ${theme === "light" && `shadow-md`}
                `}
    >
      {children}
    </div>
  );
};
