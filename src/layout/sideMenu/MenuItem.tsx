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
        className={`flex items-center py-2 rounded-xl pl-4 mb-2 hover:bg-[#f2f9fe] ${
          path === router.pathname ? "bg-[#e7f4fd]" : "bg-white"
        }`}
      >
        <div
          className={`pr-3 ${
            path === router.pathname ? "stroke-[#2499ef]" : "stroke-gray-500"
          }`}
        >
          {icon}
        </div>
        <div
          className={`text-sm  font-bold font-['Inter'] ${
            path === router.pathname ? "text-[#2499ef]" : "text-gray-500"
          }`}
        >
          {title}
        </div>
      </div>
    </Link>
  );
};
