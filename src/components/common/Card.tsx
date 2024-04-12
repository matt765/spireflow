import { useTheme } from "next-themes";
import React, { ReactNode, useEffect, useState } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  const { theme } = useTheme();
  const [shadow, setShadow] = useState("shadow-xl");

  // Solution necessary to show box shadow on prismatic theme on first render
  useEffect(() => {
    if (theme === "prismatic") {
      setShadow("shadow-xl");
    } else {
      setShadow("");
    }
  }, [theme]);

  return (
    <div
      className={`border border-mainBorder rounded-md dark:!border-mainBorderDark bg-primaryBg dark:bg-primaryBgDark
                relative w-full text-left p-6 h-full   ${className} ${shadow}       
                `}
    >
      {children}
    </div>
  );
};
