import { useFetchProviders } from "@/app/providers/hooks/useFetchProviders";
import * as React from "react";
import FormBill from "../forms/FormBill";
import LoadedSetBill from "../shared/LoadedSetBill";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { FaFolderPlus } from "react-icons/fa";
import { validPaths } from "@/utils";
import { translate } from "@/i18n";

interface IBillsNewPageProps {}

const BillsNewPage: React.FunctionComponent<IBillsNewPageProps> = props => {
	const {} = props;
	const { data: providers, isLoading: isLoadingProviders, error, refetch } = useFetchProviders();

	return (
		<HeaderDashboard
			to={validPaths.bills.path}
			icon={<FaFolderPlus />}
			breadcrumbs={[
				{ to: validPaths.dashboard.path, label: translate("dashboard.title") },
				{ to: validPaths.bills.path, label: translate("bills.title") },
				{ to: validPaths.newBill.path, label: translate("bills.add.title") },
			]}
			title={translate("bills.add.title")}
		>
			<LoadedSetBill
				providers={providers}
				isLoadingProviders={isLoadingProviders}
				refetch={refetch}
				error={error}
			>
				<FormBill providers={providers} />
			</LoadedSetBill>
		</HeaderDashboard>
	);
};

export default BillsNewPage;
