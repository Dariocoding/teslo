import { Order, OrderDto } from '@teslo/interfaces';
import { axiosClient } from '../../config/axios';

export const ordersService = {
	getOrders: () => axiosClient.get<Order[]>('/orders'),
	getOrderById: (orderId: string | number) => axiosClient.get<Order>(`/orders/${orderId}`),
	getOrdersByIdUser: (userId: string) => axiosClient.get<Order[]>(`/orders/all/${userId}`),
	getOrdersByPaymentMethod: (id: string | number) =>
		axiosClient.get<Order[]>(`/orders/all-payment-method/${id}`),
	createOrder: (data: OrderDto) => axiosClient.post<Order>('/orders', data),
	updateOrder: (idorder: number | string, data: OrderDto) =>
		axiosClient.put<Order>(`/orders/${idorder}`, data),
};

export default ordersService;
