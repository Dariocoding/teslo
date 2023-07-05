import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { capitalize, getRandomColor } from "@/utils";
import { DatePicker } from "react-rainbow-components";
import Loader from "@/components/ui/Loader";
import { dashboardService, FindPaymentMethodsByYearMonth } from "@teslo/services";
import Select from "react-tailwindcss-select";
import { ARRSTATUSORDER, StatusOrder, ValidStatusOrder } from "@teslo/interfaces";
import { libOrdersStatus } from "@/app/orders/TableOrders/BadgeStatusOrder";
import { OptionReactSelect } from "@/components/@forms/SelectFormik";
import { translate } from "@/i18n";
import { FaSearch } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IChartPiePaymentMethodsProps {
	paymentMethods: FindPaymentMethodsByYearMonth;
	setPaymentMethods: React.Dispatch<FindPaymentMethodsByYearMonth>;
}

const ChartPiePaymentMethods: React.FunctionComponent<IChartPiePaymentMethodsProps> = props => {
	const { paymentMethods, setPaymentMethods } = props;
	const [date, setDate] = React.useState(new Date());
	const [status, setStatus] = React.useState<StatusOrder>(ValidStatusOrder.COMPLETED);

	const data = {
		labels: paymentMethods.paymentMethods.map(t => t.title + ` (${t.quantity})`),
		datasets: [
			{
				label: "Total Amount",
				data: paymentMethods.paymentMethods.map(t => t.total),
				backgroundColor: React.useMemo(
					() => paymentMethods.paymentMethods.map(t => getRandomColor()),
					[paymentMethods.paymentMethods]
				),
				borderWidth: 1,
			},
		],
	};
	const [isLoading, setIsLoading] = React.useState(false);

	async function searchData() {
		try {
			setIsLoading(true);
			const req = await dashboardService.findPaymentMethodsByYearMonth(
				date.getFullYear(),
				date.getMonth() + 1,
				null,
				{ status }
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
			<div className="flex items-center justify-between gap-4 mb-3">
				<h6 className="text-xl">
					{translate("dashboard.totalPaymentMethods")} ({paymentMethods.month} -{" "}
					{paymentMethods.year})
				</h6>
				<div>
					<button
						onClick={searchData}
						type="button"
						className="btn btn-xs mb-0 btn-success"
					>
						<FaSearch />
					</button>
				</div>
			</div>
			<div>
				<span className="block max-w-[300px] mx-auto">
					<Doughnut
						data={data}
						width={"100%"}
						height={300}
						options={{
							maintainAspectRatio: false,
							responsive: true,
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
			</div>
		</React.Fragment>
	);
};

export default ChartPiePaymentMethods;
