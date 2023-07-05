import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { protectedRoutes, validPaths } from "@/utils";
import * as React from "react";
import { useFetchOrders } from "./hooks/useFetchOrders";
import TableOrders from "./TableOrders";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FindOrdersByDateDto } from "@teslo/services/dist/services/orders-service/interfaces";
import { useSearchParams } from "react-router-dom";
import { translate } from "@/i18n";

interface IOrdersPageProps {}

const OrdersPage: React.FunctionComponent<IOrdersPageProps> = props => {
	const {} = props;
	const [searchParams] = useSearchParams();
	const fromUrl = searchParams.get("from");
	const toUrl = searchParams.get("to");
	const { data, isFetching, refetch, setData } = useFetchOrders({
		from: fromUrl ? new Date(fromUrl) : new Date(),
		to: toUrl ? new Date(toUrl) : new Date(),
	});

	return (
		<HeaderDashboard
			title={"Orders"}
			icon={<RiMoneyDollarCircleFill />}
			to={protectedRoutes.dashboard.path}
			breadcrumbs={[
				{ label: translate("dashboard.title"), to: validPaths.home.path },
				{ label: translate("orders.title") },
			]}
		>
			<div className="tile">
				<TableOrders
					orders={data}
					isFetching={isFetching}
					refetch={refetch}
					setOrders={setData}
					showSelects
				/>
			</div>
		</HeaderDashboard>
	);
};

export default React.memo(OrdersPage);
