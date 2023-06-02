import useQueryState from '@/utils/hooks/useQueryState';
import { QueryFunctionContext } from '@tanstack/react-query';
import { FindBillsByDateDto, billsService, ordersService } from '@teslo/services';

async function fetchBills(ctx: QueryFunctionContext & FindBillsByDateDto) {
	const { data } = await billsService.findBills(
		ctx.from && ctx.to ? { from: ctx.from, to: ctx.to } : undefined
	);
	return data;
}

export function useFetchBills(findBillsByDateDto?: FindBillsByDateDto) {
	return useQueryState(
		['bills'],
		ctx =>
			fetchBills({
				...ctx,
				...(findBillsByDateDto ? { ...findBillsByDateDto } : {}),
			}),
		[]
	);
}
