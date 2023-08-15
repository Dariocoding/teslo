import * as React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { MONTHS, capitalize } from "@/utils";
import { DatePicker } from "react-rainbow-components";
import Loader from "@/components/ui/Loader";
import { dashboardService, FindBillsByYearDto } from "@teslo/services";
import { translate } from "@/i18n";
import { FaSearch } from "react-icons/fa";
import Select from "react-tailwindcss-select";
import { ARRSTATUSORDER, StatusOrder } from "@teslo/interfaces";
import { libOrdersStatus } from "@/app/orders/TableOrders/BadgeStatusOrder";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IBarChartYearBillsProps {
	bills: FindBillsByYearDto;
	setBills: React.Dispatch<FindBillsByYearDto>;
}

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
};

const BarChartYearBills: React.FunctionComponent<IBarChartYearBillsProps> = props => {
	const { bills, setBills } = props;
	const { bills: sells } = bills;
	const [status, setStatus] = React.useState<StatusOrder>("completed");
	const [isLoading, setIsLoading] = React.useState(false);
	const [date, setDate] = React.useState(new Date());

	async function onSearch() {
		try {
			setIsLoading(true);

			const req = await dashboardService.findAllBillsByYear(date.getFullYear(), null, {
				status,
			});
			setBills(req.data);
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
					{translate("dashboard.totalBillsByMonth")}({bills.year})
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
				<Bar
					options={options}
					data={{
						labels: MONTHS,
						datasets: [
							{
								label: "Bills Month",
								data: sells.map(s => s.sell),
								backgroundColor: "rgba(0, 147, 245, 0.856)",
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

export default BarChartYearBills;
