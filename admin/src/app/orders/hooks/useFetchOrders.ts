import useQueryState from '@/utils/hooks/useQueryState';
import { ordersService } from '@teslo/services';

async function fetchOrders() {
	const { data } = await ordersService.getOrders();
	return data;
}

export function useFetchOrders() {
	return useQueryState(['orders'], fetchOrders, []);
}
