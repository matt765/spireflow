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
}

export const ContainedButton = ({
  text,
  children,
  handleClick,
  loading = false,
  disabled = false,
  type = "button",
  icon,
}: ContainedButtonProps) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      disabled={disabled || loading}
      className="transition w-full h-full flex items-center justify-center disabled:opacity-75 bg-containedButtonBg dark:bg-containedButtonBgDark dark:hover:bg-containedButtonBgHoverDark hover:bg-containedButtonBgHover text-white p-2 rounded-md focus:outline-none"
    >
      {icon && <div className="mr-2"> {icon}</div>}
      {loading ? <SpinnerIcon /> : children || text}
    </button>
  );
};
