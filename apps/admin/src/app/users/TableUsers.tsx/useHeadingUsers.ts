import { translate } from "@/i18n";
import { HeaderDataTable } from "@/components/ui/DataTable";

export const useHeadingUsers = (showDni: boolean): HeaderDataTable[] => {
  let headers: HeaderDataTable[] = [
    { title: translate("users.label.fullName"), field: "fullName" },
    { title: translate("users.label.email"), field: "email" },
    { title: translate("users.label.phone"), field: "phone" },
    {
      title: translate("users.label.dateCreated"),
      field: "dateCreatedFormatted",
      center: true,
    },
    /*     {
      title: translate("users.label.status"),
      field: "isActiveFormatted",
      center: true,
    }, */
    { title: translate("users.label.actions"), field: "actions", center: true },
  ];

  if (showDni) {
    headers = [{ title: translate("users.label.dni"), field: "dniFormatted" }, ...headers];
  } else {
    headers = [{ title: translate("users.label.ID"), field: "iduser" }, ...headers];
  }

  return headers;
};
