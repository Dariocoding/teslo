import { Order, User } from "@teslo/interfaces";
import { axiosClient } from "../../config/axios";
import {
  BestProductSell,
  FindBillsByYearAndMonthDto,
  FindBillsByYearDto,
  FindOrdersAnioResponse,
  FindOrdersByAnioMonthResponse,
  FindPaymentMethodsByYearMonth,
  FindStatisticQuery,
  TotalCountersResponse,
} from "./interfaces";
import { AxiosRequestConfig } from "axios";

export const dashboardService = {
  counters: (config?: AxiosRequestConfig) =>
    axiosClient.get<TotalCountersResponse>("/dashboard/counters", { ...(config || {}) }),

  findAllOrdersByYear: (year: number, config?: AxiosRequestConfig, params?: FindStatisticQuery) =>
    axiosClient.get<FindOrdersAnioResponse>(`/dashboard/findAllOrders/${year}`, {
      ...(config || {}),
      params,
    }),
  findAllOrdersByYearMonth: (
    year: number,
    month: number,
    config?: AxiosRequestConfig,
    params?: FindStatisticQuery
  ) =>
    axiosClient.get<FindOrdersByAnioMonthResponse>(`/dashboard/findOrders/${year}/${month}`, {
      ...(config || {}),
      params,
    }),
  findPaymentMethodsByYearMonth: (
    year: number,
    month: number,
    config?: AxiosRequestConfig,
    params?: FindStatisticQuery
  ) =>
    axiosClient.get<FindPaymentMethodsByYearMonth>(
      `/dashboard/findPaymentMethods/${year}/${month}`,
      { ...(config || {}), params }
    ),
  getLastTenUsers: (config?: AxiosRequestConfig) =>
    axiosClient.get<User[]>("/dashboard/getTenUsers", { ...(config || {}) }),
  getLastTenOrders: (config?: AxiosRequestConfig) =>
    axiosClient.get<Order[]>("/dashboard/getTenOrders", { ...(config || {}) }),

  findBillsByMonthAndYear: (
    year: number,
    month: number,
    config?: AxiosRequestConfig,
    params?: FindStatisticQuery
  ) =>
    axiosClient.get<FindBillsByYearAndMonthDto>(`/dashboard/findBills/${year}/${month}`, {
      ...(config || {}),
      params,
    }),

  findAllBillsByYear: (year: number, config?: AxiosRequestConfig, params?: FindStatisticQuery) =>
    axiosClient.get<FindBillsByYearDto>(`/dashboard/findAllBills/${year}`, {
      ...(config || {}),
      params,
    }),

  getProductsBestSeller: (config?: AxiosRequestConfig) =>
    axiosClient.get<BestProductSell[]>("/dashboard/bestProductSellers", config),
};

export * from "./interfaces";
