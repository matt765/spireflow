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
        className={`absolute  z-10 border rounded-md shadow !outline-0 border border-inputBorder bg-dropdownBg text-primaryText placeholder-secondaryText
      ${className}
      `}
      >
        {children}
      </div>
    );
  }
);
