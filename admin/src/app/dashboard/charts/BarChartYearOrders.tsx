import * as React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { MONTHS } from '@/utils';
import { DatePicker } from 'react-rainbow-components';
import Loader from '@/components/ui/Loader';
import { dashboardService, FindOrdersAnioResponse } from '@teslo/services';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IBarChartYearOrdersProps {
	orders: FindOrdersAnioResponse;
	setOrders: React.Dispatch<FindOrdersAnioResponse>;
}

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
};

const BarChartYearOrders: React.FunctionComponent<IBarChartYearOrdersProps> = props => {
	const { orders, setOrders } = props;
	const { orders: sells } = orders;
	const [isLoading, setIsLoading] = React.useState(false);
	const [date, setDate] = React.useState(new Date());

	async function onChangeDate(value: Date) {
		try {
			setDate(value);
			setIsLoading(true);

			const req = await dashboardService.findAllOrdersByYear(value.getFullYear());
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
			<Bar
				options={options}
				data={{
					labels: MONTHS,
					datasets: [
						{
							label: 'Orders Month',
							data: sells.map(s => s.sell),
							backgroundColor: 'rgba(0, 147, 245, 0.856)',
						},
					],
				}}
			/>

			<DatePicker className="mt-4" value={date} onChange={onChangeDate} />
		</React.Fragment>
	);
};

export default BarChartYearOrders;
