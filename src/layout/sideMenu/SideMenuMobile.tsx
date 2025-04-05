import { useTheme } from "next-themes";
import { useLocale } from "next-intl";

import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { AreaIcon } from "../../assets/icons/AreaIcon";
import { BarsIcon } from "../../assets/icons/BarsIcon";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import { CustomersIcon } from "../../assets/icons/CustomersIcon";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { GithubIcon } from "../../assets/icons/GithubIcon";
import { LineIcon } from "../../assets/icons/LineIcon";
import { OrdersIcon } from "../../assets/icons/OrdersIcon";
import { ScatterIcon } from "../../assets/icons/ScatterIcon";
import { useAppStore } from "../../store/appStore";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";
import { ProductsIcon } from "../../assets/icons/ProductsIcon";
import { useSession } from "../../hooks/auth/useSession";
import { Link } from "../../i18n/navigation";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";
import { SideMenuMobileProps } from "./types";

export const SideMenuMobile = ({
  isMobileMenuOpen,
  onLoginButtonClick,
}: SideMenuMobileProps) => {
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
  const { session } = useSession();
  const { theme } = useTheme();

  const locale = useLocale();

  // First render check needed to prevent hydration mismatch errors
  const isFirstRender = useIsFirstRender();
  if (isFirstRender) return null;

  return (
    <div
      className={`z-50 overflow-auto flex fixed xl:hidden flex-col justify-between bg-primaryBg  border-r-[1px] border-mainBorder bg-primaryBg white top-[4.5rem] xl:top-[4rem] 2xl:top-[4.5rem] mb-[2.5rem] left-0 items-center transform transition-transform ease-in-out  ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } `}
      style={{ height: "calc(100% - 4.5rem)" }}
    >
      <div className="px-4 xl:px-6 pt-2 pr-6 transition w-[16rem] pb-2">
        <MenuCategory title="Main" />
        <MenuItem title="Dashboard" icon={<DashboardIcon />} path="/" />
        <MenuCategory title="E-commerce" />
        <MenuItem title="Orders" icon={<OrdersIcon />} path="/orders" />
        <MenuItem
          title="Customers"
          icon={<CustomersIcon />}
          path="/customers"
        />
        <MenuItem title="Products" icon={<ProductsIcon />} path="/products" />
        <MenuItem
          title="Analytics"
          icon={<AnalyticsIcon />}
          path="/analytics"
        />
        <MenuItem title="Calendar" icon={<CalendarIcon />} path="/calendar" />
        <MenuCategory title="Single charts" />
        <MenuItem title="Area" icon={<AreaIcon />} path="/area" />
        <MenuItem title="Bars" icon={<BarsIcon />} path="/bars" />
        <MenuItem title="Scatter" icon={<ScatterIcon />} path="/scatter" />
        <MenuItem title="Line" icon={<LineIcon />} path="/line" />
      </div>
      <div className="w-full">
        <div className="w-full border-t-0 border-mainBorder px-4 pt-8 mb-6">
          {!session?.isLoggedIn && (
            <button
              onClick={() => {
                onLoginButtonClick();
                toggleMobileMenu();
              }}
              className="block hover:bg-navbarButtonBgHover xl:hidden mt-auto mb-8 rounded-xl w-full h-10 flex justify-center items-center font-medium border border-mainColor text-primaryText bg-[rgb(255,255,255,0.02)] hover:bg-[rgb(255,255,255,0.06)] mt-12"
            >
              Sign In
            </button>
          )}
          <div className="flex xl:hidden justify-center gap-2 items-center mx-2">
            <label className="mr-2 text-primaryText">Language:</label>
            <div className="flex border border-mainBorder rounded-md">
              <Link
                href="/"
                locale="en"
                className={`${
                  locale === "en"
                    ? "border border-mainBorder"
                    : "border border-[rgb(0,0,0,0)]"
                }  text-primaryText h-10 cursor-pointer px-4 hover:bg-dropdownBgHover py-2 flex justify-between`}
              >
                EN
              </Link>
              <Link
                href="/"
                locale="pl"
                className={`${
                  locale === "pl"
                    ? "border border-mainBorder"
                    : "border border-[rgb(0,0,0,0)]"
                } text-primaryText h-10 cursor-pointer px-4 hover:bg-dropdownBgHover py-2 flex justify-between`}
              >
                PL
              </Link>{" "}
            </div>
          </div>
        </div>
        <a
          href="https://github.com/matt765/spireflow"
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer hover:bg-navbarButtonBgHover min-h-[3.6rem] max-h-[3.6rem] w-full border-t-2 border-mainBorder text-center flex justify-center items-center gap-2 stroke-grayIcon fill-grayIcon"
        >
          <GithubIcon />
          <div className="text-primaryText">GitHub Repository</div>
        </a>
      </div>
    </div>
  );
};
