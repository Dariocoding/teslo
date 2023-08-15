import useQueryState from '@/utils/hooks/useQueryState';
import { QueryFunctionContext } from '@tanstack/react-query';
import { billsService } from '@teslo/services';

async function fetchBill(ctx: QueryFunctionContext) {
	const { data } = await billsService.findBill(ctx.queryKey[1] as string);
	return data;
}

export function useFetchBill(id: number | string) {
	return useQueryState(['bill', id.toString()], fetchBill, {});
}
