import { translate } from "@/i18n";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { validPaths } from "@/utils";
import { BsDatabaseFillDown } from "react-icons/bs";
import * as React from "react";
import ExportsDataApp from "./ExportsDataApp";

interface IExportsAppDataPageProps {}

const ExportsAppDataPage: React.FunctionComponent<IExportsAppDataPageProps> = props => {
	const {} = props;

	return (
		<HeaderDashboard
			title={"Export App Data"}
			icon={<BsDatabaseFillDown />}
			to={validPaths.settings.path}
			breadcrumbs={[
				{ to: validPaths.dashboard.path, label: translate("dashboard.title") },
				{
					to: validPaths.settings.path,
					label: translate("settings.title"),
				},
				{
					label: "Export App Data",
				},
			]}
		>
			<ExportsDataApp />
		</HeaderDashboard>
	);
};

export default ExportsAppDataPage;
