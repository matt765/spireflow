import { LogoIcon } from "../../assets/icons/LogoIcon";

export const Logo = () => {
  return (
    <div
      className="h-20  
        text-center flex justify-center items-center text-xl font-inter font-bold font-['Inter']"
    >
      <LogoIcon />
      <div className="ml-3 text-primaryText dark:text-primaryTextDark mr-[1px]">Dash</div>
      <div className="text-mainColor dark:text-mainColorDark">board</div>
    </div>
  );
};
