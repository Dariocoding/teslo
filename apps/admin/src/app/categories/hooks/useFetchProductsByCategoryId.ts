import useQueryState from '@/utils/hooks/useQueryState';
import { QueryFunctionContext } from '@tanstack/react-query';
import { productsService } from '@teslo/services';

async function fetchProducts(ctx: QueryFunctionContext) {
	const id = ctx.queryKey[1];
	const { data } = await productsService.getAllProductsByCategory(id as string);
	return data;
}

export function useFetchProductsByCategoryId(id: string) {
	return useQueryState(['products-by-category-id', id], fetchProducts, []);
}
