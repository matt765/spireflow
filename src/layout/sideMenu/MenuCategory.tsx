interface Props {
  title: string;
}

export const MenuCategory = ({ title }: Props) => {
  return <div className="uppercase text-gray-400 text-sm mb-4 mt-4 font-['Inter']">{title}</div>;
};
