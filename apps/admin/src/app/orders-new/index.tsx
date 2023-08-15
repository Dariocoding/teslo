import * as React from "react";
import { useCartStore } from "@/store";
import NewFormOrder from "./newForm";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { translate } from "@/i18n";
import { PiArchiveDuotone } from "react-icons/pi";
import FormContainerOrder from "./forms/FormContainer";
import { validPaths } from "@/utils";

interface IOrdersNewProps {}

const OrdersNew: React.FunctionComponent<IOrdersNewProps> = (props) => {
  const {} = props;
  const { cart } = useCartStore();
  return (
    <HeaderDashboard
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("orders.action.newOrder") },
      ]}
      title={translate("orders.action.newOrder")}
      icon={<PiArchiveDuotone />}
    >
      <NewFormOrder {...{ cart }} />
    </HeaderDashboard>
  ); /*  <FormContainerOrder tempProducts={cart} /> */
};

export default OrdersNew;
