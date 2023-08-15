import useQueryState from '@/utils/hooks/useQueryState';
import { QueryFunctionContext } from '@tanstack/react-query';
import { productsService } from '@teslo/services';

async function fetchProducts(ctx: QueryFunctionContext) {
	const id = ctx.queryKey[1];
	const { data } = await productsService.getAllProductsByProvider(id as string);
	return data;
}

export function useFetchProductsByProviderId(id: string) {
	return useQueryState(['products-by-provider-id', id], fetchProducts, []);
}
