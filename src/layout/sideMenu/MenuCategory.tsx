import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAppStore } from "../../store/appStore";

interface Props {
  title: string;
}

export const MenuCategory = ({ title }: Props) => {
  const { isSideMenuOpen } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="uppercase text-gray-400 text-sm xl:text-[12px] 2xl:text-sm mt-[1rem] mb-[0.7rem] 2xl:mb-4 2xl:mt-4">
      {(isSideMenuOpen || !isDesktop) ? title : <div className="h-[0rem]" />}
    </div>
  );
};
