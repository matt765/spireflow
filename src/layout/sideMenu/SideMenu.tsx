import { useTranslations } from "next-intl";

import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { AreaIcon } from "../../assets/icons/AreaIcon";
import { ArrowLeftDoubleIcon } from "../../assets/icons/ArrowLeftDoubleIcon";
import { ArrowRightDoubleIcon } from "../../assets/icons/ArrowRightDoubleIcon";
import { BarsIcon } from "../../assets/icons/BarsIcon";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import { CustomersIcon } from "../../assets/icons/CustomersIcon";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { GithubIcon } from "../../assets/icons/GithubIcon";
import { LineIcon } from "../../assets/icons/LineIcon";
import { OrdersIcon } from "../../assets/icons/OrdersIcon";
import { ProductsIcon } from "../../assets/icons/ProductsIcon";
import { ScatterIcon } from "../../assets/icons/ScatterIcon";
import { OutlinedButton } from "../../components/common/OutlinedButton";
import { useAppStore } from "../../store/appStore";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

export const SideMenu = () => {
  const { isSideMenuOpen, toggleSideMenu } = useAppStore();
  const t = useTranslations("sideMenu");

  return (
    <div
      className={`mt-[3.9rem] 3xl:mt-20   hidden xl:flex flex-col h-screen xl:w-[220px] xl:min-w-[220px] 3xl:min-w-[260px]  white pt-0 2xl:pt-0  ${
        !isSideMenuOpen && "xl:!max-w-[3rem] !w-[3rem] xl:!min-w-[4.5rem] pr-0"
      }   
      `}
    >
      <div
        className={` px-4 xl:px-6 pt-4 1xl:pt-3 2xl:pt-3 3xl:pt-2 fixed xl:w-[220px] xl:min-w-[220px] 3xl:min-w-[260px] bg-primaryBg  dark:bg-primaryBgDark h-full border-r-[1px] border-mainBorder dark:border-mainBorderDark ${
          !isSideMenuOpen &&
          "xl:!max-w-[3rem] xl:!w-[3rem] xl:!min-w-[4.5rem] justify-center items-center pr-0 pt-4"
        } 
  
        `}
      >
        <MenuCategory title={t("main")} />
        <MenuItem title={t("dashboard")} icon={<DashboardIcon />} path="/" />
        <MenuCategory title={t("eCommerce")} />
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
          className={`z-50 fixed  xl:w-[205px] xl:min-w-[205px] 3xl:min-w-[245px]  flex gap-4 bottom-0 left-0 justify-center items-center flex items-center justify-center pb-4 2xl:pb-6 pl-4
          ${!isSideMenuOpen && "!max-w-[3.5rem] !min-w-[3.5rem]"}
          `}
        >
          {isSideMenuOpen && (
            <a
              href="https://github.com/matt765/spireflow"
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              <OutlinedButton
                text="GitHub"
                icon={<GithubIcon />}
                className="text-sm 2xl:text-base"
              />
            </a>
          )}
          <div className="h-[2.45rem] 2xl:h-[2.7rem]">
            <OutlinedButton
              handleClick={toggleSideMenu}
              icon={
                isSideMenuOpen ? (
                  <ArrowLeftDoubleIcon />
                ) : (
                  <ArrowRightDoubleIcon />
                )
              }
              className="text-sm 2xl:text-base"
              ariaLabel="Hide menu"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
