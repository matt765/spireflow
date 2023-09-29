import { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  title: string;
  icon: ReactElement;
  path: string;
}

export const MenuItem = ({ title, icon, path }: Props) => {
  const router = useRouter();

  return (
    <Link href={path}>
      <div
        className={`flex items-center py-2 rounded-xl pl-4 mb-2  transition ${
          path === router.pathname
            ? "bg-navItemActiveBg dark:bg-navItemActiveBgDark hover:bg-navItemActiveBgHover dark:hover:bg-navItemActiveBgHoverDark"
            : "bg-navItemBg dark:bg-navItemBgDark hover:bg-navItemBgHover dark:hover:bg-navItemBgHoverDark"
        }`}
      >
        <div
          className={`pr-3 ${
            path === router.pathname
              ? "stroke-navItemTextActive dark:stroke-mainColorDark dark:fill-mainColorDark"
              : "stroke-gray-400 fill-gray-400"
          }`}
        >
          {icon}
        </div>
        <div
          className={`text-sm tracking-wide font-bold font-['Nunito Sans'] ${
            path === router.pathname
              ? "text-navItemTextActive dark:text-navItemTextActiveDark"
              : "text-navItemText dark:text-navItemTextDark"
          }`}
        >
          {title}
        </div>
      </div>
    </Link>
  );
};
