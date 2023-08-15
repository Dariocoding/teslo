import useQueryState from '@/utils/hooks/useQueryState';
import { QueryFunctionContext } from '@tanstack/react-query';
import { brandsService } from '@teslo/services';

async function fetchBrand(ctx: QueryFunctionContext) {
	const { queryKey } = ctx;
	const { data } = await brandsService.getBrand(queryKey[1] as string);
	return data;
}

export function useFetchBrand(id: string) {
	return useQueryState(['brand', id], fetchBrand, null);
}
