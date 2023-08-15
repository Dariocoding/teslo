import useQueryState from "@/utils/hooks/useQueryState";
import { QueryFunctionContext } from "@tanstack/react-query";
import { ordersService } from "@teslo/services";
import { FindOrdersByDateDto } from "@teslo/services/dist/services/orders-service/interfaces";

async function fetchOrders(ctx: QueryFunctionContext & FindOrdersByDateDto) {
  const { data } = await ordersService.getOrders(
    ctx.from && ctx.to ? { from: ctx.from, to: ctx.to } : undefined
  );
  return data;
}

export function useFetchOrders(findOrdersByDateDto?: FindOrdersByDateDto) {
  return useQueryState(
    ["orders"],
    (ctx) =>
      fetchOrders({
        ...ctx,
        ...(findOrdersByDateDto ? { ...findOrdersByDateDto } : {}),
      }),
    []
  );
}
