import * as React from "react";
import Loader from "@/components/ui/Loader";
import WidgetsDashboardAdmin from "./Widgets/WidgetsDashboardAdmin";
import TableOrdersDashboard from "./Tables/TableOrdersDashboard";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { FaHome } from "react-icons/fa";
import { translate } from "@/i18n";
import TableUserDashboard from "./Tables/TableUserDashboard";
import LineChartOrders from "./charts/LineChartOrders";
import ChartPiePaymentMethods from "./charts/ChartPiePaymentMethods";
import BarChartYearOrders from "./charts/BarChartYearOrders";
import { useFetchDataDashboard } from "./useFetchDataDashboard";
import AuthorityCheck from "@/components/AuthorityCheck";
import { ValidRoles } from "@teslo/interfaces";
import AdminCharts from "./admin-charts";
import { TablePlaceholder } from "@/components/placeholders";
import { RenderIf } from "@/components/ui";

interface IDashboardPageProps {}

const DashboardPage: React.FunctionComponent<IDashboardPageProps> = (props) => {
  const {} = props;
  const {
    totales,
    tenLastUser,
    tenOrders,
    ordersByYear,
    ordersByYearMonth,
    loading,
    setOrdersByYear,
    setPaymentMethodsByYearMonth,
    setTenLastUser,
    setTenOrders,
    paymentMethodsByYearMonth,
    setOrdersByYearMonth,
  } = useFetchDataDashboard();

  return (
    <HeaderDashboard icon={<FaHome />} title={translate("dashboard.title")}>
      <div>
        <div>
          <div className={"lg:grid lg:grid-cols-4 gap-4"}>
            {loading ? null : <WidgetsDashboardAdmin totales={totales} />}
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-2 gap-4 mt-4">
          <AuthorityCheck
            validRoles={[
              ValidRoles.ADMIN,
              ValidRoles.SUPERVISOR,
              ValidRoles.SUPER_USER,
              ValidRoles.SELLER,
            ]}
          >
            <div className="tile">
              {loading ? (
                <TablePlaceholder />
              ) : (
                <React.Fragment>
                  <h6 className="mb-3">{translate("dashboard.lastTenUsers")}</h6>
                  <TableUserDashboard users={tenLastUser} setUsers={setTenLastUser} />
                </React.Fragment>
              )}
            </div>
          </AuthorityCheck>
          <div>
            <div className="tile">
              {loading ? (
                <TablePlaceholder />
              ) : (
                <ChartPiePaymentMethods
                  paymentMethods={paymentMethodsByYearMonth}
                  setPaymentMethods={setPaymentMethodsByYearMonth}
                />
              )}
            </div>
          </div>
        </div>

        <div className="lg:grid grid-cols-2 gap-4">
          <div>
            <div className="tile">
              {loading ? (
                <TablePlaceholder />
              ) : (
                <LineChartOrders orders={ordersByYearMonth} setOrders={setOrdersByYearMonth} />
              )}
            </div>
          </div>
          <div>
            <div className="tile">
              {loading ? (
                <TablePlaceholder />
              ) : (
                <BarChartYearOrders orders={ordersByYear} setOrders={setOrdersByYear} />
              )}
            </div>
          </div>
        </div>

        <RenderIf isTrue={!loading}>
          <AuthorityCheck
            validRoles={[ValidRoles.ADMIN, ValidRoles.SUPERVISOR, ValidRoles.SUPER_USER]}
          >
            <AdminCharts />
          </AuthorityCheck>
        </RenderIf>

        <div>
          <div className="tile">
            {loading ? (
              <TablePlaceholder />
            ) : (
              <React.Fragment>
                <h6 className="mb-3">{translate("dashboard.lastTenOrders")}</h6>
                <TableOrdersDashboard orders={tenOrders} setOrders={setTenOrders} />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </HeaderDashboard>
  );
};

export default React.memo(DashboardPage);
