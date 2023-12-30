interface Props {
  title: string;
}
export const BlockTitle = ({ title }: Props) => (
  <div className="text-lg font-medium  text-primaryText dark:text-primaryTextDark">{title}</div>
);
