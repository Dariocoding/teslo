import { protectedRoutes } from "@/utils";
import { TotalCountersResponse } from "@teslo/services";
import * as React from "react";
import { AiFillAppstore } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import WidgetDashboard from "../Widget";
import { translate } from "@/i18n";

interface IWidgetsDashboardAdminProps {
  totales: TotalCountersResponse;
}

const WidgetsDashboardAdmin: React.FunctionComponent<IWidgetsDashboardAdminProps> = (props) => {
  const { totales } = props;

  return (
    <React.Fragment>
      <WidgetDashboard
        title={translate("dashboard.categories")}
        Icon={AiFillAppstore}
        value={totales.totalCategories}
        path={protectedRoutes.categories.path}
        colouredIcon={"#04ccd6"}
        backgroundIcon="bg-cyan-600"
      />

      <WidgetDashboard
        title={translate("dashboard.products")}
        Icon={BsBoxSeam}
        value={totales.totalProducts}
        path={protectedRoutes.products.path}
        colouredIcon={"#ff5252"}
        backgroundIcon="bg-red-600"
      />

      <WidgetDashboard
        title={translate("dashboard.users")}
        Icon={FaUsers}
        value={totales.totalUsers}
        path={protectedRoutes.users.path}
        colouredIcon={"#7474f7"}
        backgroundIcon="bg-purple-600"
      />

      <WidgetDashboard
        title={translate("dashboard.orders")}
        Icon={RiMoneyDollarCircleFill}
        value={totales.totalOrders}
        path={protectedRoutes.orders.path}
        colouredIcon={"#3ae374"}
        backgroundIcon="bg-green-600"
      />
    </React.Fragment>
  );
};

export default WidgetsDashboardAdmin;
