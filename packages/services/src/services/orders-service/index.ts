import { Order, OrderDto } from "@teslo/interfaces";
import { axiosClient } from "../../config/axios";
import { FindOrdersByDateDto } from "./interfaces";
import { AxiosRequestConfig } from "axios";

export const ordersService = {
  getOrders: (params?: FindOrdersByDateDto, config?: AxiosRequestConfig) =>
    axiosClient.get<Order[]>("/orders", { ...(config || {}), params }),
  getOrderById: (orderId: string | number) => axiosClient.get<Order>(`/orders/${orderId}`),
  getOrdersByIdUser: (userId: string, params?: FindOrdersByDateDto, config?: AxiosRequestConfig) =>
    axiosClient.get<Order[]>(`/orders/all/${userId}`, { ...(config || {}), params }),
  getOrdersByPaymentMethod: (id: string | number, params?: FindOrdersByDateDto) =>
    axiosClient.get<Order[]>(`/orders/all-payment-method/${id}`, { params }),
  createOrder: (data: OrderDto, config?: AxiosRequestConfig) =>
    axiosClient.post<Order>("/orders", data, config),
  createOrderBySeller: (data: OrderDto, config?: AxiosRequestConfig) =>
    axiosClient.post<Order>("/orders/seller", data, config),
  updateOrder: (idorder: number | string, data: OrderDto) =>
    axiosClient.put<Order>(`/orders/${idorder}`, data),
  exportOrderPdf: (idorder: number | string, config?: AxiosRequestConfig<any>) =>
    axiosClient.get("/orders/exports/pdf/" + idorder, config),
};

export default ordersService;
