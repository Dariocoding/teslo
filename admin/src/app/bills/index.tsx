import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { validPaths } from "@/utils";
import * as React from "react";
import { RiBillFill } from "react-icons/ri";
import DataTableBills from "./TableBills";
import { useFetchBills } from "./hooks/useFetchBills";
import { translate } from "@/i18n";
import { useSearchParams } from "react-router-dom";

interface IBillsPageProps {}

const BillsPage: React.FunctionComponent<IBillsPageProps> = props => {
	const {} = props;
	const [searchParams] = useSearchParams();
	const from = (searchParams.get("from") || new Date()) as Date;
	const to = (searchParams.get("to") || new Date()) as Date;
	const { data: bills, setData: setBills, isLoading } = useFetchBills({ from, to });

	return (
		<HeaderDashboard
			to={validPaths.dashboard.path}
			breadcrumbs={[
				{ label: translate("dashboard.title"), to: validPaths.dashboard.path },
				{ label: translate("bills.title") },
			]}
			icon={<RiBillFill />}
			title={translate("bills.title")}
		>
			<div className="tile">
				<DataTableBills bills={bills} setBills={setBills} isLoading={isLoading} />
			</div>
		</HeaderDashboard>
	);
};

export default BillsPage;
