import React, { forwardRef } from "react";

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
  ariaLabelledby?: string;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, ariaLabelledby }, ref) => {
    return (
      <div
        ref={ref}
        role="menu"
        aria-labelledby={ariaLabelledby}
        className={`absolute  z-10 border rounded-md shadow !outline-0 border border-inputBorder dark:border-inputBorderDark bg-dropdownBg dark:bg-dropdownBgDark text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark
      ${className}
      `}
      >
        {children}
      </div>
    );
  }
);
