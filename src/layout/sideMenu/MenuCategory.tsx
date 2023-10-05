import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAppStore } from "../../store/appStore";

interface Props {
  title: string;
}

export const MenuCategory = ({ title }: Props) => {
  const { isSideMenuOpen } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="uppercase text-gray-400 text-sm mb-4 mt-4 font-['Inter']">
      {(isSideMenuOpen || !isDesktop) ? title : <div className="h-[0rem]" />}
    </div>
  );
};
