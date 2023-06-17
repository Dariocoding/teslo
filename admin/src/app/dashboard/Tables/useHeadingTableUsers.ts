import { translate } from "@/i18n";
import { HeaderDataTable } from "@teslo/react-ui/DataTable";

export const useHeadingTableUsersDashboard = (): HeaderDataTable[] => {
  return [
    {
      title: translate("users.label.dateCreated"),
      field: "dateCreatedFormattedWithouHour",
      center: true,
    },
    { title: translate("users.label.fullName"), field: "fullName" },
    { title: translate("users.label.actions"), field: "actions", center: true },
  ];
};
