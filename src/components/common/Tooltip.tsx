interface TooltipProps {
  text: string;
  className?: string;
}

export const Tooltip = ({ text, className }: TooltipProps) => {
  return (
    <div
      className={`text-primaryText text-nowrap dark:text-primaryTextDark text-xs p-2 px-2 flex items-center justify-center border-mainBorder border rounded-md dark:border-mainBorderDark bg-tooltipBg dark:bg-tooltipBgDark !opacity-100 z-50 pointer-events-none ${className}`}
      aria-live="polite"
    >
      {text}
    </div>
  );
};
