import { useSession } from "next-auth/react";

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
import { useLoginStore } from "../../store/loginStore";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";
import { ProductsIcon } from "../../assets/icons/ProductsIcon";
import { Select } from "../../components/forms/Select";

interface SideMenuMobileProps {
  isMobileMenuOpen: boolean;
  onLoginButtonClick: () => void;
}

export const SideMenuMobile = ({
  isMobileMenuOpen,
  onLoginButtonClick,
}: SideMenuMobileProps) => {
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
  const { user } = useLoginStore();
  const { data: session } = useSession();

  return (
    <div
      className={` overflow-auto flex fixed xl:hidden flex-col bg-primaryBg  border-r-[1px] border-mainBorder dark:border-mainBorderDark dark:bg-primaryBgDark white top-[5rem] mb-[5rem] left-0 items-center transform transition-transform ease-in-out pb-4 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ height: "calc(100% - 5rem)" }}
    >
      <div className="px-4 xl:px-6 pt-2 pr-6  bg-primaryBg dark:bg-primaryBgDark transition w-[16rem] pb-2">
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
      <div className="w-full border-t-0 dark:border-mainBorderDark px-4 pt-8 mb-2">
        {!(user || session?.user?.name) && (
          <button
            onClick={() => {
              onLoginButtonClick();
              toggleMobileMenu();
            }}
            className="block xl:hidden mt-auto mb-8 rounded-xl w-full h-10 flex justify-center items-center font-medium border border-mainColor dark:border-mainColorDark text-primaryText dark:text-primaryTextDark bg-[rgb(255,255,255,0.02)] dark:hover:bg-[rgb(255,255,255,0.06)] mt-12"
          >
            Sign In
          </button>
        )}
        <div className="flex xl:hidden justify-center gap-2 items-center">
          <label className="mr-2">Language:</label>
          <Select>
            <option value="english">English</option>
            <option value="polish">Polish</option>
          </Select>
        </div>
      </div>
      <a
        href="https://github.com/matt765/spireflow"
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer max-h-[8rem] w-full border-t-2 dark:border-mainBorderDark px-4 pt-4 mt-4 text-center flex justify-center items-center gap-2 stroke-grayIconDark fill-grayIconDark "
      >
        <GithubIcon />
        <div>GitHub Repository</div>
      </a>
    </div>
  );
};
