interface TooltipProps {
  text: string;
}

export const Tooltip = ({ text }: TooltipProps) => {
  return (
    <div className="text-primaryText dark:text-primaryTextDark text-xs p-2 px-2 flex items-center justify-center min-w-36 min-h-8 border-mainBorder border rounded-md dark:border-mainBorderDark bg-secondaryBg dark:bg-secondaryBgDark ">
      {text}
    </div>
  );
};
