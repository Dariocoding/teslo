import * as React from 'react';
import Loader from '@/components/ui/Loader';
import WidgetsDashboardAdmin from './Widgets/WidgetsDashboardAdmin';
import TableUserDashboard from './Tables/TableUserDashboard';
import TableOrdersDashboard from './Tables/TableOrdersDashboard';
import { Order, User } from '@teslo/interfaces';
import {
	dashboardService,
	FindOrdersAnioResponse,
	FindOrdersByAnioMonthResponse,
	FindPaymentMethodsByYearMonth,
	TotalCountersResponse,
} from '@teslo/services';

const BarChartYearOrders = React.lazy(() => import('./charts/BarChartYearOrders'));
const LineChartOrders = React.lazy(() => import('./charts/LineChartOrders'));
const ChartPiePaymentMethods = React.lazy(() => import('./charts/ChartPiePaymentMethods'));

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
	const [ordersByYearMonth, setOrdersByYearMonth] =
		React.useState<FindOrdersByAnioMonthResponse>({
			year: yearCurrent,
			month: '',
			total: '0',
			orders: [],
		});
	const [paymentMethodsByYearMonth, setPaymentMethodsByYearMonth] =
		React.useState<FindPaymentMethodsByYearMonth>({
			year: yearCurrent,
			month: '',
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
					dashboardService.findAllOrdersByYearMonth(
						yearCurrent,
						monthCurrent
					),
					dashboardService.findPaymentMethodsByYearMonth(
						yearCurrent,
						monthCurrent
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
		<div>
			<div className="grid lg:grid-cols-2 gap-4">
				<div>
					<div className="grid lg:grid-cols-2 gap-4">
						<WidgetsDashboardAdmin totales={totales} />
					</div>
				</div>
				<div>
					<div className="tile">
						<h6 className="mb-3">
							Total Payment Methods (
							{paymentMethodsByYearMonth.month} -{' '}
							{paymentMethodsByYearMonth.year})
						</h6>
						<ChartPiePaymentMethods
							paymentMethods={paymentMethodsByYearMonth}
							setPaymentMethods={
								setPaymentMethodsByYearMonth
							}
						/>
					</div>
				</div>
			</div>

			<div className="grid lg:grid-cols-12 gap-4 mt-6">
				<div className="lg:col-span-5 xl:col-span-4">
					<div className="tile">
						<h6 className="mb-3">Users</h6>
						<TableUserDashboard
							users={tenLastUser}
							setUsers={setTenLastUser}
						/>
					</div>
				</div>

				<div className="lg:col-span-7 xl:col-span-8">
					<div className="tile">
						<h6 className="mb-3">Orders</h6>
						<TableOrdersDashboard
							orders={tenOrders}
							setOrders={setTenOrders}
						/>
					</div>
				</div>
			</div>

			<div className="grid lg:grid-cols-2 gap-4 mt-6">
				<div className="tile">
					<h6 className="mb-3">
						Total orders by month ({ordersByYear.year})
					</h6>
					<React.Suspense fallback={<Loader loading={true} />}>
						<BarChartYearOrders
							orders={ordersByYear}
							setOrders={setOrdersByYear}
						/>
					</React.Suspense>
				</div>
				<div className="tile">
					<h6 className="mb-3">
						Total orders by day ({ordersByYearMonth.month} -{' '}
						{ordersByYearMonth.year})
					</h6>
					<React.Suspense fallback={<Loader loading={true} />}>
						<LineChartOrders
							orders={ordersByYearMonth}
							setOrders={setOrdersByYearMonth}
						/>
					</React.Suspense>
				</div>
			</div>
		</div>
	);
};

export default React.memo(DashboardPage);
