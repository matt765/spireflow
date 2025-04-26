interface BlockTitleProps {
  title: string;
}

export const BlockTitle = ({ title }: BlockTitleProps) => (
  <div className="text-[0.9rem] 1xl:text-[1rem] 3xl:text-[1.1rem] font-medium text-primaryText">
    {title}
  </div>
);
