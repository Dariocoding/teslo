import { Order, OrderDto } from '@teslo/interfaces';
import { axiosClient } from '../../config/axios';
import { FindOrdersByDateDto } from './interfaces';

export const ordersService = {
	getOrders: (params?: FindOrdersByDateDto) =>
		axiosClient.get<Order[]>('/orders', { params }),
	getOrderById: (orderId: string | number) => axiosClient.get<Order>(`/orders/${orderId}`),
	getOrdersByIdUser: (userId: string) => axiosClient.get<Order[]>(`/orders/all/${userId}`),
	getOrdersByPaymentMethod: (id: string | number) =>
		axiosClient.get<Order[]>(`/orders/all-payment-method/${id}`),
	createOrder: (data: OrderDto) => axiosClient.post<Order>('/orders', data),
	updateOrder: (idorder: number | string, data: OrderDto) =>
		axiosClient.put<Order>(`/orders/${idorder}`, data),
};

export default ordersService;
