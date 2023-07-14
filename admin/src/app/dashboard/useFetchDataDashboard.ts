import React from "react";
import { Order, User, ValidRoles } from "@teslo/interfaces";
import {
  dashboardService,
  FindOrdersAnioResponse,
  FindOrdersByAnioMonthResponse,
  FindPaymentMethodsByYearMonth,
  TotalCountersResponse,
} from "@teslo/services";
import { useAuthStore } from "@/store";

const today = new Date();
const yearCurrent = today.getFullYear();
const monthCurrent = today.getMonth() + 1;

export const useFetchDataDashboard = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = React.useState(true);
  const [totales, setTotales] = React.useState<TotalCountersResponse>({
    totalCategories: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [tenLastUser, setTenLastUser] = React.useState<User[]>([]);
  const [tenOrders, setTenOrders] = React.useState<Order[]>([]);
  const [ordersByYear, setOrdersByYear] = React.useState<FindOrdersAnioResponse>({
    year: yearCurrent,
    orders: [],
  });
  const [ordersByYearMonth, setOrdersByYearMonth] = React.useState<FindOrdersByAnioMonthResponse>({
    year: yearCurrent,
    month: "",
    total: "0",
    orders: [],
  });
  const [paymentMethodsByYearMonth, setPaymentMethodsByYearMonth] =
    React.useState<FindPaymentMethodsByYearMonth>({
      year: yearCurrent,
      month: "",
      paymentMethods: [],
    });

  React.useEffect(() => {
    async function init() {
      try {
        setLoading(true);

        const [
          responseCounters,
          responseTenUsers,
          responseTenOrders,
          responseOrdersByYear,
          responseOrdersByYearMonth,
          responsePaymentMethods,
        ] = await Promise.all([
          dashboardService.counters(),
          user.roles?.includes?.(ValidRoles.ADMIN) ||
          user.roles?.includes?.(ValidRoles.SUPER_USER) ||
          user.roles?.includes?.(ValidRoles.SUPERVISOR) ||
          user.roles?.includes?.(ValidRoles.SELLER)
            ? dashboardService.getLastTenUsers()
            : null,
          dashboardService.getLastTenOrders(),
          dashboardService.findAllOrdersByYear(yearCurrent),
          dashboardService.findAllOrdersByYearMonth(yearCurrent, monthCurrent),
          dashboardService.findPaymentMethodsByYearMonth(yearCurrent, monthCurrent, null, {
            status: "completed",
          }),
        ]);

        setTotales(responseCounters.data);
        if (responseTenUsers?.data) {
          setTenLastUser(responseTenUsers.data);
        }
        setTenOrders(responseTenOrders.data);
        setOrdersByYear(responseOrdersByYear.data);
        setOrdersByYearMonth(responseOrdersByYearMonth.data);
        setPaymentMethodsByYearMonth(responsePaymentMethods.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [user]);

  return {
    loading,
    totales,
    ordersByYear,
    ordersByYearMonth,

    tenLastUser,
    tenOrders,
    setOrdersByYear,
    setPaymentMethodsByYearMonth,
    setTenLastUser,
    setTenOrders,
    paymentMethodsByYearMonth,
    setOrdersByYearMonth,
  };
};
