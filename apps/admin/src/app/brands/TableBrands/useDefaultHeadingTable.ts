import { translate } from "@/i18n";
import { HeaderDataTable } from "@/components/ui/DataTable";

export const useDefaultHeadingTableBrands = (): HeaderDataTable[] => [
  { title: translate("brands.label.nameFormatted"), field: "nameFormatted" },
  { title: translate("brands.label.dateCreated"), field: "dateFormatted", center: true },
  { title: translate("brands.label.actions"), field: "actions", center: true },
];
