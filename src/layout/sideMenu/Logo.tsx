import { LogoIcon } from "../../assets/icons/LogoIcon";
import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { nunito } from "../../styles/fonts";
import { Link } from "../../i18n/navigation";

export const Logo = () => {
  const { isSideMenuOpen } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <Link
      href="/"
      className={`-ml-1 h-[4.2rem] 1xl:h-20 3xl:h-20  
        text-mainColor fill-mainColor text-center flex justify-center items-center text-[1.3rem] xl:text-[1.1rem] 3xl:text-[1.3rem] font-bold ${nunito.className}`}
    >
      <div className="menuItemLogo -mt-1">
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
    </Link>
  );
};
