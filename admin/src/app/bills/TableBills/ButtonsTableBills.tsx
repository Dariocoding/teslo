import { validPaths } from "@/utils";
import RenderIf from "@teslo/react-ui/RenderIf";
import * as React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import { DatePicker } from "react-rainbow-components";
import dayjs from "dayjs";
import { Bill } from "@teslo/interfaces";
import { billsService } from "@teslo/services";
import { toast } from "react-hot-toast";
import { translate } from "@/i18n";

interface IButtonsTableBillsProps {
	showSelects?: boolean;
	setIsLoadingTable?(isLoading: boolean): void;
	setBills(bills: Bill[]): void;
}

const ButtonsTableBills: React.FunctionComponent<IButtonsTableBillsProps> = props => {
	const { showSelects, setIsLoadingTable, setBills } = props;
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [from, setFrom] = React.useState<Date>(
		searchParams.get("from") ? new Date(searchParams.get("from")) : new Date()
	);
	const [to, setTo] = React.useState<Date>(
		searchParams.get("to") ? new Date(searchParams.get("to")) : new Date()
	);

	const fetchData = React.useCallback(async () => {
		try {
			if (dayjs(from).isAfter(dayjs(to)) || dayjs(to).isBefore(dayjs(from))) {
				return toast.error("The date range is invalid");
			}

			setIsLoadingTable(true);
			const bills = await billsService.findBills({ from, to });
			navigate({
				pathname: validPaths.bills.path,
				search: createSearchParams({
					from: from.toISOString(),
					to: to.toISOString(),
				}).toString(),
			});
			setBills(bills.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoadingTable(false);
		}
	}, [from, to]);

	return (
		<div className="w-full flex items-center justify-start flex-wrap pb-2 sm:flex-row flex-col sm:mb-0 mb-2">
			<div className="flex items-end justify-start sm:h-[50px] sm:mb-0 mb-2">
				<Link to={validPaths.newBill.path} className="btn btn-primary btn-xs mb-0">
					<FaPlus />
				</Link>
				<RenderIf isTrue={showSelects}>
					<button className="btn btn-alternative btn-xs mb-0" onClick={fetchData}>
						<AiOutlineReload />
					</button>
				</RenderIf>
			</div>
			<RenderIf isTrue={showSelects}>
				<div className="flex items-center justify-start flex-wrap w-full sm:w-auto flex-grow gap-4">
					<div className="w-full sm:max-w-[225px]">
						<label
							htmlFor="category-select-products"
							className="text-xs w-full text-start mb-1 font-semibold block"
						>
							{translate("app.from")}
						</label>
						<div>
							<DatePicker
								value={from}
								borderRadius="semi-square"
								size="small"
								maxDate={new Date()}
								onChange={date => setFrom(date)}
							/>
						</div>
					</div>
					<div className="w-full sm:max-w-[225px]">
						<label
							htmlFor="category-select-products"
							className="text-xs w-full text-start mb-1 font-semibold block"
						>
							{translate("app.to")}
						</label>
						<div>
							<DatePicker
								value={to}
								borderRadius="semi-square"
								size="small"
								maxDate={new Date()}
								onChange={date => setTo(date)}
							/>
						</div>
					</div>
					<div className="flex items-end sm:h-[50px]">
						<button
							className="btn btn-xs btn-success mb-0"
							type="button"
							onClick={fetchData}
						>
							<FaSearch />
						</button>
					</div>
				</div>
			</RenderIf>
		</div>
	);
};

export default ButtonsTableBills;
