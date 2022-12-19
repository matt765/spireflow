interface Props {
  title: string;
}
export const BlockTitle = ({ title }: Props) => (
  <div className="text-xl font-semibold font-['Inter'] text-[#18214e]">{title}</div>
);
