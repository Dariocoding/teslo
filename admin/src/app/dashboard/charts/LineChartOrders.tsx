import * as React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DatePicker } from "react-rainbow-components";
import Loader from "@/components/ui/Loader";
import { dashboardService, FindOrdersByAnioMonthResponse } from "@teslo/services";
import { translate } from "@/i18n";
import { FaSearch } from "react-icons/fa";
import { ARRSTATUSORDER, StatusOrder } from "@teslo/interfaces";
import { capitalize } from "@/utils";
import { libOrdersStatus } from "@/app/orders/TableOrders/BadgeStatusOrder";
import Select from "react-tailwindcss-select";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ILineChartOrdersProps {
	orders: FindOrdersByAnioMonthResponse;
	setOrders: React.Dispatch<FindOrdersByAnioMonthResponse>;
}

const LineChartOrders: React.FunctionComponent<ILineChartOrdersProps> = props => {
	const { orders, setOrders } = props;
	const [status, setStatus] = React.useState<StatusOrder>("completed");
	const [date, setDate] = React.useState(new Date());
	const [isLoading, setIsLoading] = React.useState(false);

	async function onSearch() {
		try {
			setIsLoading(true);

			const req = await dashboardService.findAllOrdersByYearMonth(
				date.getFullYear(),
				date.getMonth() + 1,
				null,
				{ status }
			);
			setOrders(req.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) return <Loader loading={true} />;

	return (
		<React.Fragment>
			<div className="items-center flex justify-between mb-3">
				<h6 className="text-xl">
					{translate("dashboard.totalOrdersByDay")} ({orders.month} - {orders.year})
				</h6>
				<div>
					<button
						type="button"
						onClick={onSearch}
						className="btn btn-xs mb-0 btn-success"
					>
						<FaSearch />
					</button>
				</div>
			</div>
			<span>
				<Line
					options={{
						responsive: true,
						plugins: {
							legend: {
								display: false,
							},
						},
					}}
					data={{
						labels: orders.orders.map(order => order.day),
						datasets: [
							{
								label: "Orders",
								data: orders.orders.map(order => (order.total ? order.total : 0)),
								borderColor: "rgb(255, 99, 132)",
								backgroundColor: "rgba(255, 99, 132, 0.5)",
							},
						],
					}}
				/>
			</span>

			<div className="flex items-center justify-between gap-4 mt-4">
				<DatePicker value={date} onChange={setDate} />

				<Select
					options={ARRSTATUSORDER.map(status => ({
						label: capitalize(libOrdersStatus()[status]),
						value: status,
					}))}
					value={{
						label: capitalize(libOrdersStatus()[status]),
						value: status,
					}}
					primaryColor="blue"
					//@ts-ignore
					onChange={(opt: OptionReactSelect) => setStatus(opt.value)}
				/>
			</div>
		</React.Fragment>
	);
};

export default LineChartOrders;
