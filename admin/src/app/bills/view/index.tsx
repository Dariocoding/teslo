import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { validPaths } from "@/utils";
import * as React from "react";
import { HiFolder } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useFetchBill } from "../hooks/useFetchBill";
import BillInfo from "./BillInfo";
import ContainerBill from "./ContainerBill";
import { translate } from "@/i18n";

interface IViewBillPageProps {}

const ViewBillPage: React.FunctionComponent<IViewBillPageProps> = props => {
	const {} = props;
	const { id } = useParams();
	const { data: bill, isFetching, error, setData } = useFetchBill(id);

	return (
		<HeaderDashboard
			to={validPaths.bills.path}
			breadcrumbs={[
				{
					to: validPaths.dashboard.path,
					label: translate("dashboard.title"),
				},
				{
					to: validPaths.bills.path,
					label: translate("bills.title"),
				},
				{ label: translate("bills.view.title") },
			]}
			title={translate("bills.view.title")}
			icon={<HiFolder />}
		>
			<ContainerBill isLoading={isFetching} error={error}>
				{Object.keys(bill || {}).length === 0 ? (
					<div className="tile max-w-[1000px] mx-auto">
						<div className="text-center">
							<div>
								<img
									src="/img/others/error.png"
									alt="Error message"
									className="w-28 mx-auto"
								/>
							</div>
							<div className="mt-4">
								<h1 className="text-2xl font-semibold">Error</h1>
								<p>404 Bill not found</p>
							</div>
						</div>
						<div className="flex items-center justify-center">
							<Link
								to={validPaths.bills.path}
								className="btn btn-sm btn-primary mt-4"
							>
								Go back
							</Link>
						</div>
					</div>
				) : (
					<BillInfo bill={bill} setBill={setData} />
				)}
			</ContainerBill>
		</HeaderDashboard>
	);
};

export default ViewBillPage;
