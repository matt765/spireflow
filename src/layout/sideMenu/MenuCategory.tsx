import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAppStore } from "../../store/appStore";
import { MenuCategoryProps } from "./types";

export const MenuCategory = ({ title }: MenuCategoryProps) => {
  const { isSideMenuOpen } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="uppercase text-gray-400 text-sm xl:text-[12px] 2xl:text-sm mt-[0.8rem] 1xl:mt-[1rem] mb-[0.7rem] 2xl:mb-4 2xl:mt-4">
      {isSideMenuOpen || !isDesktop ? title : <div className="h-[0rem]" />}
    </div>
  );
};
