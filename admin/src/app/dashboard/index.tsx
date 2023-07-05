import * as React from "react";
import Loader from "@/components/ui/Loader";
import WidgetsDashboardAdmin from "./Widgets/WidgetsDashboardAdmin";
import TableOrdersDashboard from "./Tables/TableOrdersDashboard";
import { Order, User } from "@teslo/interfaces";
import {
	dashboardService,
	FindOrdersAnioResponse,
	FindOrdersByAnioMonthResponse,
	FindPaymentMethodsByYearMonth,
	TotalCountersResponse,
} from "@teslo/services";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { FaHome } from "react-icons/fa";
import { translate } from "@/i18n";
import TableUserDashboard from "./Tables/TableUserDashboard";
import LineChartOrders from "./charts/LineChartOrders";
import ChartPiePaymentMethods from "./charts/ChartPiePaymentMethods";
import BarChartYearOrders from "./charts/BarChartYearOrders";

interface IDashboardPageProps {}

const today = new Date();
const yearCurrent = today.getFullYear();
const monthCurrent = today.getMonth() + 1;

const DashboardPage: React.FunctionComponent<IDashboardPageProps> = props => {
	const {} = props;
	const [loading, setLoading] = React.useState(true);
	const [totales, setTotales] = React.useState<TotalCountersResponse>({
		totalCategories: 0,
		totalOrders: 0,
		totalProducts: 0,
		totalUsers: 0,
	});
	const [tenLastUser, setTenLastUser] = React.useState<User[]>([]);
	const [tenOrders, setTenOrders] = React.useState<Order[]>([]);
	const [ordersByYear, setOrdersByYear] = React.useState<FindOrdersAnioResponse>({
		year: yearCurrent,
		orders: [],
	});
	const [ordersByYearMonth, setOrdersByYearMonth] = React.useState<FindOrdersByAnioMonthResponse>(
		{
			year: yearCurrent,
			month: "",
			total: "0",
			orders: [],
		}
	);
	const [paymentMethodsByYearMonth, setPaymentMethodsByYearMonth] =
		React.useState<FindPaymentMethodsByYearMonth>({
			year: yearCurrent,
			month: "",
			paymentMethods: [],
		});

	React.useEffect(() => {
		async function init() {
			try {
				setLoading(true);
				const [
					responseCounters,
					responseTenUsers,
					responseTenOrders,
					responseOrdersByYear,
					responseOrdersByYearMonth,
					responsePaymentMethods,
				] = await Promise.all([
					dashboardService.counters(),
					dashboardService.getLastTenUsers(),
					dashboardService.getLastTenOrders(),
					dashboardService.findAllOrdersByYear(yearCurrent),
					dashboardService.findAllOrdersByYearMonth(yearCurrent, monthCurrent),
					dashboardService.findPaymentMethodsByYearMonth(
						yearCurrent,
						monthCurrent,
						null,
						{ status: "completed" }
					),
				]);

				setTotales(responseCounters.data);
				setTenLastUser(responseTenUsers.data);
				setTenOrders(responseTenOrders.data);
				setOrdersByYear(responseOrdersByYear.data);
				setOrdersByYearMonth(responseOrdersByYearMonth.data);
				setPaymentMethodsByYearMonth(responsePaymentMethods.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		init();
	}, []);

	if (loading) return <Loader loading={true} />;

	return (
		<HeaderDashboard icon={<FaHome />} title={translate("dashboard.title")}>
			<div>
				<div>
					<div className="lg:grid lg:grid-cols-4 gap-4">
						<WidgetsDashboardAdmin totales={totales} />
					</div>
				</div>
				<div className="lg:grid lg:grid-cols-2 gap-4 mt-4">
					<div className="tile">
						<h6 className="mb-3">{translate("dashboard.lastTenUsers")}</h6>
						<TableUserDashboard users={tenLastUser} setUsers={setTenLastUser} />
					</div>
					<div>
						<div className="tile">
							<ChartPiePaymentMethods
								paymentMethods={paymentMethodsByYearMonth}
								setPaymentMethods={setPaymentMethodsByYearMonth}
							/>
						</div>
					</div>
				</div>

				<div className="lg:grid grid-cols-2 gap-4">
					<div>
						<div className="tile">
							<LineChartOrders
								orders={ordersByYearMonth}
								setOrders={setOrdersByYearMonth}
							/>
						</div>
					</div>
					<div>
						<div className="tile">
							<BarChartYearOrders orders={ordersByYear} setOrders={setOrdersByYear} />
						</div>
					</div>
				</div>

				<div>
					<div className="tile">
						<h6 className="mb-3">{translate("dashboard.lastTenOrders")}</h6>
						<TableOrdersDashboard orders={tenOrders} setOrders={setTenOrders} />
					</div>
				</div>
			</div>
		</HeaderDashboard>
	);
};

export default React.memo(DashboardPage);
