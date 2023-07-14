import useQueryState from "@/utils/hooks/useQueryState";
import { QueryFunctionContext } from "@tanstack/react-query";
import { ordersService } from "@teslo/services";

async function fetchOrders(ctx: QueryFunctionContext) {
  const { data } = await ordersService.getOrdersByPaymentMethod(
    ctx.queryKey[1] as string | number,
    { from: new Date(), to: new Date() }
  );
  return data;
}

export function useFetchOrdersByPayment(id: number | string) {
  return useQueryState(["orders-by-payment", id as string], fetchOrders, []);
}
