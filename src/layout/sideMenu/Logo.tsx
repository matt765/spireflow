import { Nunito } from "next/font/google";

import { LogoIcon } from "../../assets/icons/LogoIcon";
import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const nunito = Nunito({
  weight: "700",
  subsets: ["latin"],
});
export const Logo = () => {
  const { isSideMenuOpen, toggleSideMenu } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <div
      className={`h-20  
        text-center flex justify-center items-center text-[1.4rem] font-inter font-bold ${nunito.className}`}
    >
      <LogoIcon />
      {(isSideMenuOpen || !isDesktop) && (
        <>
          <div className="ml-3 text-primaryText dark:text-primaryTextDark mr-[1px] tracking-wider">
            Spire
          </div>

          <div className="text-mainColor dark:text-mainColorDark  tracking-wider">
            flow
          </div>
        </>
      )}
    </div>
  );
};
