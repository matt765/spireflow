import { LogoIcon } from "../../assets/icons/LogoIcon";

export const Logo = () => {
  return (
    <div
      className="h-20  
        text-center flex justify-center items-center text-2xl font-inter font-bold font-['Inter']"
    >
      <LogoIcon />
      <div className="ml-3">Flow </div>
      <div className="text-[#6F6AF8]"> board</div>
    </div>
  );
};
