import { TablePlaceholder } from "@/components/placeholders";
import { FindBillsByYearAndMonthDto, FindBillsByYearDto, dashboardService } from "@teslo/services";
import * as React from "react";
import LineChartBills from "./LineChartBills";
import BarChartYearBills from "./BarChartYearBills";
import PieChart from "./PieChart";
import { translate } from "@/i18n";

interface IAdminCartsProps {}

const today = new Date();
const yearCurrent = today.getFullYear();
const monthCurrent = today.getMonth() + 1;

const AdminCarts: React.FunctionComponent<IAdminCartsProps> = (props) => {
  const {} = props;
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [billsByYearMonth, setBillsByYearMonth] = React.useState<FindBillsByYearAndMonthDto>({
    year: yearCurrent,
    month: "",
    total: "0",
    bills: [],
  });

  const [billsByYear, setBillsByYear] = React.useState<FindBillsByYearDto>({
    year: yearCurrent,
    bills: [],
  });

  React.useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        const [billsByYearMonth, billsByYear] = await Promise.all([
          dashboardService.findBillsByMonthAndYear(yearCurrent, monthCurrent, null, {
            status: "completed",
          }),
          dashboardService.findAllBillsByYear(yearCurrent, null, {
            status: "completed",
          }),
        ]);
        setBillsByYearMonth(billsByYearMonth.data);
        setBillsByYear(billsByYear.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  if (error) return null;

  return (
    <React.Fragment>
      <div className="lg:grid grid-cols-2 gap-4">
        <div>
          <div className="tile">
            {loading ? (
              <TablePlaceholder />
            ) : (
              <LineChartBills bills={billsByYearMonth} setBills={setBillsByYearMonth} />
            )}
          </div>
        </div>
        <div>
          <div className="tile">
            {loading ? (
              <TablePlaceholder />
            ) : (
              <BarChartYearBills bills={billsByYear} setBills={setBillsByYear} />
            )}
          </div>
        </div>
      </div>
      <div className="lg:grid grid-cols-2 gap-4">
        <div>
          <div className="tile">
            <PieChart
              title={translate("dashboard.totalOrdersBillsByMonth")}
              isByMonth
              backgroundColor={["rgba(214, 48, 49,0.75)", "rgba(0, 184, 148,0.75)"]}
              borderColor={["rgba(255, 99, 132, 0.50)", "rgba(54, 162, 235, 0.50)"]}
            />
          </div>
        </div>
        <div>
          <div className="tile">
            <PieChart
              title={translate("dashboard.totalOrdersBillsByYear")}
              isByYear
              backgroundColor={["rgba(214, 48, 49,0.75)", "rgba(9, 132, 227,0.75)"]}
              borderColor={["rgba(255, 99, 132, 0.50)", "rgba(9, 132, 227,0.50)"]}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminCarts;
