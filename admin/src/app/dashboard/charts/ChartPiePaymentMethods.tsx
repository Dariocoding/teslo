import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getRandomColor } from '@/utils';
import { DatePicker } from 'react-rainbow-components';
import Loader from '@/components/ui/Loader';
import { dashboardService, FindPaymentMethodsByYearMonth } from '@teslo/services';
ChartJS.register(ArcElement, Tooltip, Legend);

interface IChartPiePaymentMethodsProps {
	paymentMethods: FindPaymentMethodsByYearMonth;
	setPaymentMethods: React.Dispatch<FindPaymentMethodsByYearMonth>;
}

const ChartPiePaymentMethods: React.FunctionComponent<IChartPiePaymentMethodsProps> = props => {
	const { paymentMethods, setPaymentMethods } = props;
	const [date, setDate] = React.useState(new Date());

	const data = {
		labels: paymentMethods.paymentMethods.map(t => t.title + ` (${t.quantity})`),
		datasets: [
			{
				label: 'Total Amount',
				data: paymentMethods.paymentMethods.map(t => t.total),
				backgroundColor: paymentMethods.paymentMethods.map(t =>
					getRandomColor()
				),
				borderWidth: 1,
			},
		],
	};
	const [isLoading, setIsLoading] = React.useState(false);

	async function onChangeDate(value: Date) {
		try {
			setDate(value);
			setIsLoading(true);

			const req = await dashboardService.findPaymentMethodsByYearMonth(
				value.getFullYear(),
				value.getMonth() + 1
			);
			setPaymentMethods(req.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) return <Loader loading={true} />;

	return (
		<React.Fragment>
			<span>
				<Doughnut
					data={data}
					width={300}
					height={300}
					options={{
						maintainAspectRatio: false,
						responsive: true,
					}}
				/>
			</span>
			<DatePicker className="mt-4" value={date} onChange={onChangeDate} />
		</React.Fragment>
	);
};

export default ChartPiePaymentMethods;
