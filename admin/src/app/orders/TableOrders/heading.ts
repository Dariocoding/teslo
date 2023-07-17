import { translate } from "@/i18n";
import { HeaderDataTable } from "@/components/ui/DataTable";

const defaultHeadingOrders = (): HeaderDataTable[] => [
  { title: translate("orders.label.ID"), field: "idorder" },
  { title: translate("orders.label.reference"), field: "reference" },
  { title: translate("orders.label.buyer"), field: "fullName" },
  { title: translate("orders.label.seller"), field: "sellerFullName" },
  { title: translate("orders.label.dateCreated"), field: "dateCreatedFormatted" },
  { title: translate("orders.label.paymentMethod"), field: "paymentMethod.title" },
  { title: translate("orders.label.subtotal"), field: "subtotalFormatted", center: true },
  { title: "I.V.A", field: "ivaFormatted", center: true },
  { title: translate("orders.label.total"), field: "totalFormatted", center: true },
  { title: translate("orders.label.status"), field: "badgeStatus", center: true },
  { title: translate("orders.label.actions"), field: "actions", center: true },
];

export default defaultHeadingOrders;
