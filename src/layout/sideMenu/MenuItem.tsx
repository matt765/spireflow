"use client";
import { ReactElement, useEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";
import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "../../i18n/navigation";
import { useTooltip } from "../../hooks/useTooltip";
import { Tooltip } from "../../components/common/Tooltip";

interface Props {
  title: string;
  icon: ReactElement;
  path: string;
}

export const MenuItem = ({ title, icon, path }: Props) => {
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
  const { isSideMenuOpen } = useAppStore();
  const currentPathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [isActive, setIsActive] = useState(false);
  const { isTooltipVisible, showTooltip, hideTooltip } = useTooltip();

  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024) {
      toggleMobileMenu();
    }
  };
  useEffect(() => {
    // Handling active path is inside useEffect, because otherwise it won't work if it's prerendered as static HTML (SSG)
    const normalizedPathname = currentPathname?.endsWith("/")
      ? currentPathname.slice(0, -1)
      : currentPathname;
    const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
    const plPath = `/pl${normalizedPath}`;

    if (normalizedPath === "/") {
      setIsActive(normalizedPathname === "/" || normalizedPathname === "/pl");
    } else {
      setIsActive(
        normalizedPathname === normalizedPath || normalizedPathname === plPath
      );
    }
  }, [currentPathname, path]);

  return (
    <Link
      href={path}
      className={`${
        (!isSideMenuOpen || !isDesktop) &&
        "flex flex-col justify-center items-center"
      }`}
    >
      <div
        onClick={handleMenuItemClick}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className={`     
        flex relative items-center py-2 rounded-xl pl-4 mb-1 2xl:mb-2 w-full pr-2  transition ${
          isActive
            ? "bg-navItemActiveBg dark:bg-navItemActiveBgDark hover:bg-navItemActiveBgHover dark:hover:bg-navItemActiveBgHoverDark"
            : "bg-navItemBg dark:bg-navItemBgDark hover:bg-navItemBgHover dark:hover:bg-navItemBgHoverDark"
        }
        ${
          !isSideMenuOpen &&
          isDesktop &&
          "!pl-1 pl-8  justify-center items-center !w-10 rounded-full"
        }
        `}
      >
        <div
          className={`pr-3 ${
            isActive
              ? "stroke-navItemIconActive dark:stroke-mainColorDark dark:fill-mainColorDark text-navItemIconActive dark:text-mainColorDark"
              : "stroke-gray-400 fill-gray-400 text-gray-400 dark:text-gray-400"
          }
          ${!isSideMenuOpen && isDesktop && "pl-4"}
          `}
        >
          {icon}
        </div>
        {(isSideMenuOpen || !isDesktop) && (
          <div
            className={`text-sm xl:text-[12px] 2xl:text-sm tracking-wide font-bold  ${
              isActive
                ? "text-navItemTextActive dark:text-navItemTextActiveDark"
                : "text-navItemText dark:text-navItemTextDark"
            }`}
          >
            {title}
          </div>
        )}
        {isTooltipVisible && !isSideMenuOpen && (
          <div className="absolute top-0 left-12 hidden xl:flex">
            <Tooltip text={title} className=" h-8 px-3  " />
          </div>
        )}
      </div>
    </Link>
  );
};
