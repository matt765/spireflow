import { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface Props {
  title: string;
  icon: ReactElement;
  path: string;
}

export const MenuItem = ({ title, icon, path }: Props) => {
  const router = useRouter();
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu); 
  const { isSideMenuOpen } = useAppStore();

  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024) {
      toggleMobileMenu(); 
    }
  };
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <Link
      href={path}
      className={`${
        (!isSideMenuOpen || !isDesktop) && "flex flex-col justify-center items-center"
      }`}
    >
      <div
        onClick={handleMenuItemClick}
        className={`
     
        flex items-center py-2 rounded-xl pl-4 mb-1 2xl:mb-2 w-full pr-2  transition ${
          path === router.pathname
            ? "bg-navItemActiveBg dark:bg-navItemActiveBgDark hover:bg-navItemActiveBgHover dark:hover:bg-navItemActiveBgHoverDark"
            : "bg-navItemBg dark:bg-navItemBgDark hover:bg-navItemBgHover dark:hover:bg-navItemBgHoverDark"
        }
        ${(!isSideMenuOpen && isDesktop) && "!pl-1 pl-8  justify-center items-center !w-10 rounded-full"}
        `}
      >
        <div
          className={`pr-3 ${
            path === router.pathname
              ? "stroke-navItemTextActive dark:stroke-mainColorDark dark:fill-mainColorDark"
              : "stroke-gray-400 fill-gray-400"
          }
          ${(!isSideMenuOpen && isDesktop) && "pl-4"}
          `}
        >
          {icon}
        </div>
        {(isSideMenuOpen || !isDesktop)  && (
          <div
            className={`text-sm tracking-wide font-bold font-['Nunito Sans'] ${
              path === router.pathname
                ? "text-navItemTextActive dark:text-navItemTextActiveDark"
                : "text-navItemText dark:text-navItemTextDark"
            }`}
          >
            {title}
          </div>
        )}
      </div>
    </Link>
  );
};
