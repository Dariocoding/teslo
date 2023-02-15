import useQueryState from '@/utils/hooks/useQueryState';
import { QueryFunctionContext } from '@tanstack/react-query';
import { categoriesService } from '@teslo/services';

async function fetchCategory(ctx: QueryFunctionContext) {
	const { queryKey } = ctx;
	const { data } = await categoriesService.getCategory(queryKey[0] as string);
	return data;
}

export function useFetchCategory(id: string) {
	return useQueryState([id], fetchCategory, null);
}
