import { Order, User } from "@teslo/interfaces";
import { axiosClient } from "../../config/axios";
import {
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
};

export * from "./interfaces";
