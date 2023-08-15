import { translate } from "@/i18n";
import { HeaderDataTable } from "@/components/ui/DataTable";

export const useDefaultHeadingTableCategories = (): HeaderDataTable[] => {
  return [
    { title: translate("categories.label.name"), field: "titleFormatted" },
    { title: translate("categories.label.dateCreated"), field: "dateFormatted", center: true },
    { title: translate("categories.label.actions"), field: "actions", center: true },
  ];
};
