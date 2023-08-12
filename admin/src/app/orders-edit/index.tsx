import { useAuthStore } from "@/store";
import { Order, ValidRoles } from "@teslo/interfaces";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader, { hideLoader, showLoader } from "@/components/ui/Loader";
import { validPaths } from "@/utils";
import { ordersService } from "@teslo/services";
import NewFormOrder from "../orders-new/newForm";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { translate } from "@/i18n";
import { PiArchiveDuotone } from "react-icons/pi";

interface IOrdersEditPageProps {}

const OrdersEditPage: React.FunctionComponent<IOrdersEditPageProps> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = React.useState<Order>(null);
  const { user } = useAuthStore();

  React.useEffect(() => {
    async function getOrder() {
      if (user.roles.includes(ValidRoles.USER) || user.roles.includes(ValidRoles.SELLER)) {
        navigate(validPaths.orders.path);
        return;
      }
      try {
        showLoader();
        setOrder(null);
        const req = await ordersService.getOrderById(id);
        const reqOrder = req.data;
        if (!reqOrder) {
          navigate(validPaths.orders.path);
          hideLoader();
          return;
        }
        setOrder(reqOrder);
      } catch (error) {
        console.log(error);
        navigate(validPaths.orders.path);
      } finally {
        hideLoader();
      }
    }

    getOrder();
  }, [id]);

  if (!order)
    return (
      <div className="p-3 h-full w-full">
        <Loader loading className="w-full bg-white z-50 rounded-md h-full" />
      </div>
    );

  return (
    <HeaderDashboard
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("orders.action.editOrder") },
      ]}
      title={translate("orders.action.editOrder")}
      icon={<PiArchiveDuotone />}
    >
      <NewFormOrder cart={[]} order={order} />
    </HeaderDashboard>
  );
};

export default OrdersEditPage;
