import useQueryState from "@/utils/hooks/useQueryState";
import { QueryFunctionContext } from "@tanstack/react-query";
import { ordersService } from "@teslo/services";
import { FindOrdersByDateDto } from "@teslo/services/dist/services/orders-service/interfaces";

async function fetchOrders(ctx: QueryFunctionContext, params?: FindOrdersByDateDto) {
  const { data } = await ordersService.getOrdersByIdUser(ctx.queryKey[1] as string, {
    ...(params || {}),
  });
  return data;
}

export function useFetchOrdersByUser(id: string, params?: FindOrdersByDateDto) {
  return useQueryState(["orders-by-user", id as string], (ctx) => fetchOrders(ctx), []);
}
