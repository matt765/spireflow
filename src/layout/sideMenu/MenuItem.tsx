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
          path === router.pathname ? "bg-[#c4c2ff33]" : "bg-white"
        }`}
      >
        <div
          className={`pr-3 ${
            path === router.pathname ? "stroke-[#6F6AF8]" : "stroke-gray-500"
          }`}
        >
          {icon}
        </div>
        <div
          className={`text-sm tracking-wide font-bold font-['Nunito Sans'] ${
            path === router.pathname ? "text-[#6F6AF8]" : "text-gray-500"
          }`}
        >
          {title}
        </div>
      </div>
    </Link>
  );
};
