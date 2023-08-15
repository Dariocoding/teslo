import { translate } from "@/i18n";
import { HeaderDataTable } from "@/components/ui/DataTable";

const defaultHeadingPaymentMethods = (): HeaderDataTable[] => [
  { title: "ID", field: "idpaymentmethod", center: true },
  { title: translate("paymentMethods.label.name"), field: "title", center: true },
  { title: translate("paymentMethods.label.owner"), field: "owner", center: true },
  { title: translate("paymentMethods.label.DNI"), field: "dni", center: true },
  { title: translate("paymentMethods.label.email"), field: "email", center: true },
  { title: translate("paymentMethods.label.actions"), field: "actions", center: true },
];

export default defaultHeadingPaymentMethods;
