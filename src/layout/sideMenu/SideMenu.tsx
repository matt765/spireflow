import { useTranslations } from "next-intl";

import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { AreaIcon } from "../../assets/icons/AreaIcon";
import { BarsIcon } from "../../assets/icons/BarsIcon";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import { CustomersIcon } from "../../assets/icons/CustomersIcon";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { LineIcon } from "../../assets/icons/LineIcon";
import { OrdersIcon } from "../../assets/icons/OrdersIcon";
import { ProductsIcon } from "../../assets/icons/ProductsIcon";
import { ScatterIcon } from "../../assets/icons/ScatterIcon";
import { useAppStore } from "../../store/appStore";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";
import { Link } from "../../i18n/navigation";
import { Logo } from "./Logo";
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../assets/icons/ArrowRightIcon";

export const SideMenu = () => {
  const { isSideMenuOpen, toggleSideMenu } = useAppStore();
  const t = useTranslations("sideMenu");

  return (
    <div
      className={`mt-[3.9rem] 3xl:mt-0   xl:flex flex-col h-screen xl:w-[220px] xl:min-w-[220px] 3xl:min-w-[270px]  white pt-0 2xl:pt-0  ${
        !isSideMenuOpen &&
        "xl:!max-w-[3rem] !w-[3rem] xl:!min-w-[4.5rem] pr-0 transition"
      }   
      `}
    >
      <div
        className={`px-3 pt-4 1xl:pt-3 z-[40] 2xl:pt-3 3xl:pt-0 fixed xl:w-[220px] xl:min-w-[220px] 3xl:min-w-[270px] bg-navigationBg  dark:bg-navigationBgDark h-full border-r-[1px] border-mainBorder dark:border-mainBorderDark ${
          !isSideMenuOpen &&
          "xl:!max-w-[3rem] xl:!w-[3rem] xl:!min-w-[4.5rem] justify-center items-center pr-0 pt-4 pl-0 transition"
        }   
        `}
      >
        <Link
          href="/"
          className={`flex -mb-4 pt-1 justify-center pr-2     ${
            !isSideMenuOpen && "xl:!w-[4.5rem] xl:pr-1 pl-2"
          }     
                `}
        >
          <Logo />
        </Link>
        <MenuCategory title={t("pages")} />
        <MenuItem title={t("dashboard")} icon={<DashboardIcon />} path="/" />
        <MenuItem title={t("orders")} icon={<OrdersIcon />} path="/orders" />
        <MenuItem
          title={t("customers")}
          icon={<CustomersIcon />}
          path="/customers"
        />
        <MenuItem
          title={t("products")}
          icon={<ProductsIcon />}
          path="/products"
        />
        <MenuItem
          title={t("analytics")}
          icon={<AnalyticsIcon />}
          path="/analytics"
        />
        <MenuItem
          title={t("calendar")}
          icon={<CalendarIcon />}
          path="/calendar"
        />
        <MenuCategory title={t("singleCharts")} />
        <MenuItem title={t("area")} icon={<AreaIcon />} path="/area" />
        <MenuItem title={t("bars")} icon={<BarsIcon />} path="/bars" />
        <MenuItem title={t("scatter")} icon={<ScatterIcon />} path="/scatter" />
        <MenuItem title={t("line")} icon={<LineIcon />} path="/line" />
        <div
          onClick={toggleSideMenu}
          className="-mr-4 transition border-mainBorder hover:border-mainBorderHover dark:hover:border-mainBorderDarkHover dark:border-mainBorderDark border absolute w-7 h-7 bg-primaryBg dark:bg-primaryBgDark rounded-full top-6 right-0 text-grayIcon dark:text-secondaryTextDark flex justify-center items-center cursor-pointer"
        >
          {isSideMenuOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </div>
      </div>
    </div>
  );
};
