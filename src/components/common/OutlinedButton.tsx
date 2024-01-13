import { ReactElement, Ref } from "react";

interface OutlinedButtonProps {
  text?: string;
  icon?: ReactElement;
  handleClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

export const OutlinedButton = ({
  text,
  icon,
  handleClick,
  className,
  children,
  ref,
}: OutlinedButtonProps) => {
  const buttonClassName = `flex rounded-md justify-center items-center gap-2 w-full h-full p-2 !outline-0 border border-mainBorder dark:border-mainBorderDark bg-outlinedButtonBg dark:bg-outlinedButtonBgDark hover:bg-outlinedButtonBgHover dark:hover:bg-outlinedButtonBgHoverDark text-primaryText dark:text-primaryTextDark dark:stroke-grayIconDark dark:fill-grayIconDark fill-grayIcon stroke-grayIcon ${className}`;

  return (
    <button onClick={handleClick} className={buttonClassName} ref={ref}>
      {children || (
        <>
          {icon} {text}
        </>
      )}
    </button>
  );
};
