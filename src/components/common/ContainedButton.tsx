import React from "react";

import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";

interface ContainedButtonProps {
  text?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaPressed?: boolean;
}

export const ContainedButton = ({
  text,
  children,
  handleClick,
  loading = false,
  disabled = false,
  type = "button",
  icon,
  className,
  ariaLabel,
  ariaPressed,
}: ContainedButtonProps) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel || text}
      aria-pressed={ariaPressed}
      className={`transition text-nowrap w-full h-full flex items-center justify-center disabled:opacity-75 bg-containedButtonBg 
      hover:bg-containedButtonBgHover text-white p-2 rounded-md focus:outline-none ${className}`}
    >
      {icon && <div className="mr-2"> {icon}</div>}
      {loading ? <SpinnerIcon /> : children || text}
    </button>
  );
};
