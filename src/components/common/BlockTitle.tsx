interface BlockTitleProps {
  title: string;
}
export const BlockTitle = ({ title }: BlockTitleProps) => (
  <div className="text-lg font-medium  text-primaryText dark:text-primaryTextDark">
    {title}
  </div>
);
