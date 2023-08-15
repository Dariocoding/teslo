import useQueryState from '@/utils/hooks/useQueryState';
import { QueryFunctionContext } from '@tanstack/react-query';
import { productsService } from '@teslo/services';

async function fetchProduct(ctx: QueryFunctionContext) {
	const id = ctx.queryKey[1];
	const { data } = await productsService.getProduct(id as string);
	return data;
}

export function useFetchProduct(id: string) {
	return useQueryState(['products-by-id', id], fetchProduct, {});
}
