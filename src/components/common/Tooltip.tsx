interface TooltipProps {
  text: string;
  className?: string;
}

export const Tooltip = ({ text, className }: TooltipProps) => {
  return (
    <div
      className={`text-primaryText text-nowrap text-xs p-2 px-2 flex items-center justify-center border-mainBorder border rounded-md border-mainBorder bg-tooltipBg !opacity-100 z-50 pointer-events-none ${className}`}
      aria-live="polite"
    >
      {text}
    </div>
  );
};
