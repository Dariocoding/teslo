import { translate } from "@/i18n";
import { HeaderDataTable } from "@teslo/react-ui/DataTable";

export const useHeadingUsers = (): HeaderDataTable[] => {
  return [
    { title: translate("users.label.ID"), field: "iduser" },
    { title: translate("users.label.firstName"), field: "firstName" },
    { title: translate("users.label.lastName"), field: "lastName" },
    { title: translate("users.label.email"), field: "email" },
    { title: translate("users.label.role"), field: "userRol" },
    { title: translate("users.label.phone"), field: "phone" },
    { title: translate("users.label.dateCreated"), field: "dateCreatedFormatted", center: true },
    { title: translate("users.label.status"), field: "isActiveFormatted", center: true },
    { title: translate("users.label.actions"), field: "actions", center: true },
  ];
};
