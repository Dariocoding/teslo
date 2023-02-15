import useQueryState from '@/utils/hooks/useQueryState';
import { QueryFunctionContext } from '@tanstack/react-query';
import { ordersService } from '@teslo/services';

async function fetchOrders(ctx: QueryFunctionContext) {
	const { data } = await ordersService.getOrdersByIdUser(ctx.queryKey[1] as string);
	return data;
}

export function useFetchOrdersByUser(id: string) {
	return useQueryState(['orders-by-user', id as string], fetchOrders, []);
}
