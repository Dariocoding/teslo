import * as React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { DatePicker } from 'react-rainbow-components';
import Loader from '@/components/ui/Loader';
import { dashboardService, FindOrdersByAnioMonthResponse } from '@teslo/services';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ILineChartOrdersProps {
	orders: FindOrdersByAnioMonthResponse;
	setOrders: React.Dispatch<FindOrdersByAnioMonthResponse>;
}

const LineChartOrders: React.FunctionComponent<ILineChartOrdersProps> = props => {
	const { orders, setOrders } = props;
	const [date, setDate] = React.useState(new Date());
	const [isLoading, setIsLoading] = React.useState(false);

	async function onChangeDate(value: Date) {
		try {
			setDate(value);
			setIsLoading(true);

			const req = await dashboardService.findAllOrdersByYearMonth(
				value.getFullYear(),
				value.getMonth() + 1
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
							label: 'Orders',
							data: orders.orders.map(order =>
								order.total ? order.total : 0
							),
							borderColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgba(255, 99, 132, 0.5)',
						},
					],
				}}
			/>

			<DatePicker className="mt-4" value={date} onChange={onChangeDate} />
		</React.Fragment>
	);
};

export default LineChartOrders;
