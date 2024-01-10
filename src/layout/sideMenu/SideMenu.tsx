import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { AreaIcon } from "../../assets/icons/AreaIcon";
import { ArrowLeftDoubleIcon } from "../../assets/icons/ArrowLeftDoubleIcon";
import { ArrowRightDoubleIcon } from "../../assets/icons/ArrowRightDoubleIcon";
import { BarsIcon } from "../../assets/icons/BarsIcon";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import { CustomersIcon } from "../../assets/icons/CustomersIcon";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { DonutIcon } from "../../assets/icons/DonutIcon";
import { GithubIcon } from "../../assets/icons/GithubIcon";
import { LineIcon } from "../../assets/icons/LineIcon";
import { OrdersIcon } from "../../assets/icons/OrdersIcon";
import { ProductsIcon } from "../../assets/icons/ProductsIcon";
import { ScatterIcon } from "../../assets/icons/ScatterIcon";
import { useAppStore } from "../../store/appStore";
import { Logo } from "./Logo";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";

export const SideMenu = () => {
  const { isSideMenuOpen, toggleSideMenu } = useAppStore();

  return (
    <div
      className={`mt-20   hidden xl:flex flex-col h-screen xl:w-[220px] xl:min-w-[220px] 2xl:min-w-[260px]  white pt-0 2xl:pt-0  ${
        !isSideMenuOpen && "xl:!max-w-[3rem] !w-[3rem] xl:!min-w-[4.5rem] pr-0"
      } `}
    >
      <div
        className={` px-4 xl:px-6 pt-2 fixed xl:w-[220px] xl:min-w-[220px] 2xl:min-w-[260px] bg-primaryBg  dark:bg-primaryBgDark h-full border-r-[1px] border-mainBorder dark:border-mainBorderDark ${
          !isSideMenuOpen &&
          "xl:!max-w-[3rem] xl:!w-[3rem] xl:!min-w-[4.5rem] justify-center items-center pr-0 pt-4"
        } `}
      >
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
        <div
          className={`z-50 fixed  xl:w-[205px] xl:min-w-[205px] 2xl:min-w-[245px]  flex gap-4 bottom-0 left-0 justify-center items-center flex items-center justify-center pb-6 pl-4
          ${!isSideMenuOpen && "!max-w-[3.5rem] !min-w-[3.5rem]"}
          `}
        >
          {isSideMenuOpen && (
            <a
              href="https://github.com/matt765/spireflow"
              target="_blank"
              rel="noreferrer"
              className="flex w-full p-2 form-element-styled rounded-md justify-center items-center gap-2 dark:stroke-grayIconDark dark:fill-grayIconDark transition button-outlined bg-outlinedButtonBg dark:bg-outlinedButtonBgDark hover:bg-outlinedButtonBgHover dark:hover:bg-outlinedButtonBgHoverDark fill-grayIcon stroke-grayIcon"
            >
              <GithubIcon /> <div>GitHub</div>
            </a>
          )}
          <button
            onClick={toggleSideMenu}
            className="button-outlined p-2 rounded-md  transition stroke-secondaryText fill-secondaryText dark:fill-secondaryTextDark dark:stroke-secondaryTextDark"
          >
            {isSideMenuOpen ? (
              <ArrowLeftDoubleIcon />
            ) : (
              <ArrowRightDoubleIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
