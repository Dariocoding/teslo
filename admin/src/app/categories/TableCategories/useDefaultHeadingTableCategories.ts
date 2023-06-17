import { translate } from "@/i18n";
import { HeaderDataTable } from "@teslo/react-ui/DataTable";

export const useDefaultHeadingTableCategories = (): HeaderDataTable[] => {
  return [
    { title: translate("categories.label.ID"), field: "idcategory" },
    { title: translate("categories.label.name"), field: "title" },
    { title: translate("categories.label.dateCreated"), field: "dateFormatted", center: true },
    { title: translate("categories.label.actions"), field: "actions", center: true },
  ];
};
