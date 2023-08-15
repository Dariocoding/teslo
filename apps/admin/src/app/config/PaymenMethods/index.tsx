import RenderIf from "@/components/ui/RenderIf";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { protectedRoutes } from "@/utils";
import * as React from "react";
import TableOrdersByPayment from "./TableOrdersByPayment";
import TablePaymentMethods from "./TablePaymentMethods";
import { IoMdWallet } from "react-icons/io";
import { translate } from "@/i18n";

interface IPaymentMethodsPageProps {}

const PaymentMethodsPage: React.FunctionComponent<IPaymentMethodsPageProps> = (props) => {
  const {} = props;
  const [selected, setSelected] = React.useState<number>(null);

  return (
    <HeaderDashboard
      title={translate("paymentMethods.title")}
      icon={<IoMdWallet />}
      to={protectedRoutes.settings.path}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: protectedRoutes.dashboard.path },
        { label: translate("settings.title"), to: protectedRoutes.settings.path },
        { label: translate("paymentMethods.title") },
      ]}
    >
      <TablePaymentMethods setSelected={setSelected} />
      <RenderIf isTrue={selected}>
        <TableOrdersByPayment id={selected} setId={setSelected} />
      </RenderIf>
    </HeaderDashboard>
  );
};

export default PaymentMethodsPage;
