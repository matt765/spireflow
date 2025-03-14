interface BlockTitleProps {
  title: string;
}
export const BlockTitle = ({ title }: BlockTitleProps) => (
  <div className="text-[1.1rem] font-medium  text-primaryText dark:text-primaryTextDark">
    {title}
  </div>
);
