import useQueryState from '@/utils/hooks/useQueryState';
import { QueryFunctionContext } from '@tanstack/react-query';
import { providersService } from '@teslo/services';

async function fetchProvider(ctx: QueryFunctionContext) {
	const { queryKey } = ctx;
	const { data } = await providersService.get(queryKey[1] as string);
	return data;
}

export function useFetchProvider(id: string) {
	return useQueryState(['provider', id], fetchProvider, null);
}
