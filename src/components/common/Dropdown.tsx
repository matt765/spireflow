import { useTheme } from "next-themes";
import React, { forwardRef } from "react";

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
  ariaLabelledby?: string;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, ariaLabelledby }, ref) => {
    const { theme } = useTheme();

    return (
      <div
        ref={ref}
        role="menu"
        aria-labelledby={ariaLabelledby}
        className={`${
          theme === "prismatic" && "backdrop-blur-xl !bg-[rgb(255,255,255,0)]"
        } absolute  z-10 border rounded-md shadow !outline-0 border border-inputBorder dark:border-inputBorderDark bg-dropdownBg dark:bg-dropdownBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark
      ${className}
      `}
      >
        {children}
      </div>
    );
  }
);
