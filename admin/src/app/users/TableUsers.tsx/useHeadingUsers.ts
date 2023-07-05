import { translate } from "@/i18n";
import { HeaderDataTable } from "@teslo/react-ui/DataTable";

export const useHeadingUsers = (showDni: boolean): HeaderDataTable[] => {
	let headers: HeaderDataTable[] = [
		{ title: translate("users.label.firstName"), field: "firstName" },
		{ title: translate("users.label.lastName"), field: "lastName" },
		{ title: translate("users.label.email"), field: "email" },
		{ title: translate("users.label.role"), field: "userRol" },
		{ title: translate("users.label.phone"), field: "phone" },
		{
			title: translate("users.label.dateCreated"),
			field: "dateCreatedFormatted",
			center: true,
		},
		{ title: translate("users.label.status"), field: "isActiveFormatted", center: true },
		{ title: translate("users.label.actions"), field: "actions", center: true },
	];

	if (showDni) {
		headers = [{ title: translate("users.label.dni"), field: "dniFormatted" }, ...headers];
	} else {
		headers = [{ title: translate("users.label.ID"), field: "iduser" }, ...headers];
	}

	return headers;
};
