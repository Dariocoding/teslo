import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DatePicker } from "react-rainbow-components";
import { translate } from "@/i18n";
import { FaSearch } from "react-icons/fa";
import { ARRSTATUSORDER, StatusOrder } from "@teslo/interfaces";
import { capitalize } from "@/utils";
import { libOrdersStatus } from "@/app/orders/TableOrders/BadgeStatusOrder";
import Select from "react-tailwindcss-select";
import { TablePlaceholder } from "@/components/placeholders";
import { dashboardService } from "@teslo/services";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IPieChartProps {
  title: string;
  isByMonth?: boolean;
  isByYear?: boolean;
  backgroundColor?: string[];
  borderColor?: string[];
}

const PieChart: React.FunctionComponent<IPieChartProps> = (props) => {
  const { title, isByMonth, isByYear, borderColor, backgroundColor } = props;
  const [arrData, setArrData] = React.useState([0, 0]);
  const [status, setStatus] = React.useState<StatusOrder>("completed");
  const [date, setDate] = React.useState(new Date());
  const [isLoading, setIsLoading] = React.useState(true);

  const data = {
    labels: [translate("bills.title"), translate("orders.title")],
    datasets: [
      {
        label: translate("dashboard.#totalOrdersBills"),
        data: arrData,
        backgroundColor: backgroundColor || ["rgba(214, 48, 49,0.5)", "rgba(0, 184, 148,0.5)"],
        borderColor: borderColor || ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const searchData = async () => {
    if (isByYear) {
      setIsLoading(true);
      const [fetchBills, fetchOrders] = await Promise.all([
        dashboardService.findAllBillsByYear(date.getFullYear(), null, { status }),
        dashboardService.findAllOrdersByYear(date.getFullYear(), null, { status }),
      ]);

      const reduceBills = fetchBills.data.bills.reduce((prev, curr) => prev + curr.sell, 0);
      const reduceOrders = fetchOrders.data.orders.reduce((prev, curr) => prev + curr.sell, 0);

      setArrData([reduceBills, reduceOrders]);
      setIsLoading(false);
    }

    if (isByMonth) {
      setIsLoading(true);

      const [fetchBills, fetchOrders] = await Promise.all([
        dashboardService.findBillsByMonthAndYear(date.getFullYear(), date.getMonth() + 1, null, {
          status,
        }),
        dashboardService.findAllOrdersByYearMonth(date.getFullYear(), date.getMonth() + 1, null, {
          status,
        }),
      ]);

      const reduceBills = fetchBills.data.bills.reduce((prev, curr) => {
        //@ts-ignore
        return (prev + curr.total) as number;
      }, 0);
      const reduceOrders = fetchOrders.data.orders.reduce((prev, curr) => prev + curr.total, 0);

      setArrData([reduceBills, reduceOrders]);

      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    searchData();
  }, []);

  if (isLoading) return <TablePlaceholder />;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h6 className="text-xl">{title}</h6>
        <div>
          <button type="button" className="btn btn-xs mb-0 btn-success" onClick={searchData}>
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="max-w-[300px] mx-auto">
        <Pie
          data={data}
          options={{
            responsive: true,
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-4 mt-4">
        <DatePicker value={date} onChange={setDate} />

        <Select
          options={ARRSTATUSORDER.map((status) => ({
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
  );
};

export default PieChart;
