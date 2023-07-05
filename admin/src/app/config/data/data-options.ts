import { BsFillCreditCard2BackFill, BsDatabaseFillCheck, BsDatabaseFillDown } from "react-icons/bs";
import { ICardProps } from "../Card";
import { MdOutlineSupervisedUserCircle } from "react-icons/md";
import { AiOutlineBgColors } from "react-icons/ai";
import { validPaths } from "@/utils";
import { BiImages } from "react-icons/bi";
import { translate } from "@/i18n";

export interface DataOption extends ICardProps {
	id:
		| "payment-methods"
		| "user-prefixes"
		| "images-enterprise"
		| "colors-admin"
		| "app-data"
		| "app-exports-data";
}

const dataOptions: DataOption[] = [
	{
		id: "payment-methods",
		icon: BsFillCreditCard2BackFill,
		title: () => translate("settings.paymentMethods.title"),
		to: validPaths.paymentMethods.path,
		description: () => translate("settings.paymentMethods.description"),
		className: "bg-blue-600",
		btnLinkText: "Edit Payment Methods",
		classNameButton: "btn-primary",
	},
	{
		id: "user-prefixes",
		icon: MdOutlineSupervisedUserCircle,
		title: () => translate("settings.userPrefixes.title"),
		description: () => translate("settings.userPrefixes.description"),
		className: "bg-red-600",
		btnLinkText: "Edit user prefixes",
		classNameButton: "btn-danger",
	},
	{
		id: "images-enterprise",
		icon: BiImages,
		title: () => translate("settings.imagesEnterprise.title"),
		description: () => translate("settings.imagesEnterprise.description"),
		className: "bg-teal-600",
		btnLinkText: "Edit images enterprise",
		classNameButton: "btn-success",
		to: validPaths.imagesEnterpriseConfig.path,
	},
	{
		id: "colors-admin",
		icon: AiOutlineBgColors,
		title: () => translate("settings.colorsAdmin.title"),
		to: validPaths.colorsAdmin.path,
		description: () => translate("settings.colorsAdmin.description"),
		className: "bg-yellow-600",
		btnLinkText: "Edit colors admin",
		classNameButton: "btn-warning",
	},
	{
		id: "app-data",
		icon: BsDatabaseFillCheck,
		title: () => translate("settings.appData.title"),
		to: validPaths.appData.path,
		description: () => translate("settings.appData.description"),
		className: "bg-pink-600",
		btnLinkText: "Edit App Data",
		classNameButton: "bg-pink-600 hover:bg-pink-700 text-white",
	},
	{
		id: "app-exports-data",
		icon: BsDatabaseFillDown,
		title: () => translate("settings.appExportsData.title"),
		to: validPaths.exportsAppData.path,
		description: () => translate("settings.appExportsData.description"),
		className: "bg-emerald-600",
		classNameButton: "bg-emerald-600 hover:bg-emerald-700 text-white",
		btnLinkText: "Edit App Exports Data",
	},
];

export default dataOptions;
