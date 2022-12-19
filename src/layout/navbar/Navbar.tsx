import MoonLineIcon from "remixicon-react/MoonLineIcon";
import { EnglishIcon } from "../../assets/icons/EnglishIcon";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-end fixed h-20 bg-white w-[calc(100%-16rem)] z-30 border-l border-solid border-gray-200 pr-12 gap-6">
      <MoonLineIcon />
      <EnglishIcon />
      <div className="border border-gray-300 rounded-3xl w-40 h-10 flex justify-center items-center  font-dmSans ">
        Hello, Johny
      </div>
    </div>
  );
};
