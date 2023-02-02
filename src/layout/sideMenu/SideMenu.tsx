import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { AreaIcon } from "../../assets/icons/AreaIcon";
import { BarsIcon } from "../../assets/icons/BarsIcon";
import { CustomersIcon } from "../../assets/icons/CustomersIcon";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { DonutIcon } from "../../assets/icons/DonutIcon";
import { LineIcon } from "../../assets/icons/LineIcon";
import { OrdersIcon } from "../../assets/icons/OrdersIcon";
import { Logo } from "./Logo";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";

export const SideMenu = () => {
  return (
    <div className="hidden lg:flex flex-col h-full w-[200px] min-w-[200px] xl:w-[260px] xl:min-w-[260px] bg-white pt-24">
      <div className=" px-4 xl:px-6 pt-2 fixed  w-[200px] min-w-[200px] xl:w-[260px]">
        <MenuCategory title="Main" />
        <MenuItem title="Dashboard" icon={<DashboardIcon />} path="/" />
        <MenuCategory title="E-commerce" />
        <MenuItem title="Orders" icon={<OrdersIcon />} path="/orders" />
        <MenuItem
          title="Customers"
          icon={<CustomersIcon />}
          path="/customers"
        />
        <MenuItem
          title="Analytics"
          icon={<AnalyticsIcon />}
          path="/analytics"
        />
        <MenuCategory title="Charts" />
        <MenuItem title="Donut" icon={<DonutIcon />} path="/donut" />
        <MenuItem title="Area" icon={<AreaIcon />} path="/area" />
        <MenuItem title="Bars" icon={<BarsIcon />} path="/bars" />
        <MenuItem title="Line" icon={<LineIcon />} path="/line" />
      </div>
    </div>
  );
};
