import { translate } from "@/i18n";
import { HeaderDataTable } from "@/components/ui/DataTable";

const defaultHeadingBills = (): HeaderDataTable[] => {
  return [
    { title: translate("bills.label.ID"), field: "idbill", center: true },
    { title: translate("bills.label.reference"), field: "reference", center: true },
    { title: translate("bills.label.subtotal"), field: "subtotalFormatted", center: true },
    { title: translate("bills.label.tax"), field: "taxFormatted", center: true },
    { title: translate("bills.label.deliveryPrice"), field: "deliveryFormatted", center: true },
    { title: translate("bills.label.total"), field: "totalFormatted", center: true },
    { title: translate("bills.label.status"), field: "statusFormatted", center: true },
    {
      title: translate("bills.label.dateCreated"),
      field: "dateCreatedFormatted",
      center: true,
    },
    {
      title: translate("bills.label.dateUpdated"),
      field: "dateUpdatedFormatted",
      center: true,
    },
    { title: translate("bills.label.actions"), field: "actions", center: true },
  ];
};

export default defaultHeadingBills;
