import MoonLineIcon from "remixicon-react/MoonLineIcon";
import { EnglishIcon } from "../../assets/icons/EnglishIcon";
import { Logo } from "../sideMenu/Logo";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between fixed h-20 bg-white w-full z-30 border-b border-solid border-gray-200 pr-12">
      <div className="w-[200px] xl:w-[260px] pr-4 border-r ml-[1px]">
        <Logo />
      </div>
      <div className="flex justify-end items-center  gap-6">
        <MoonLineIcon />
        <EnglishIcon />
        <div className="border border-gray-300 rounded-xl w-40 h-10 flex justify-center text-white items-center font-medium font-['Inter'] bg-[#6F6AF8]">
         Sign In
        </div>
      </div>
    </div>
  );
};
