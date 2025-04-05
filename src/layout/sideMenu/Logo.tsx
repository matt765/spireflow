import { LogoIcon } from "../../assets/icons/LogoIcon";
import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { nunito } from "../../styles/fonts";

export const Logo = () => {
  const { isSideMenuOpen } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <div
      className={`-ml-1 h-20  
        text-mainColor fill-mainColor text-center flex justify-center items-center text-[1.4rem] xl:text-[1.2rem] 3xl:text-[1.3rem] font-bold ${nunito.className}`}
    >
      <div className="-mt-1">
        <LogoIcon />
      </div>

      {(isSideMenuOpen || !isDesktop) && (
        <>
          <div className="ml-[0.7rem] text-primaryText mr-[1px] tracking-wider">
            Spire
          </div>
          <div className="text-mainColor tracking-wider">flow</div>
        </>
      )}
    </div>
  );
};
