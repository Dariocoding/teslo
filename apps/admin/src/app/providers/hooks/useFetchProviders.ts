import useQueryState from '@/utils/hooks/useQueryState';
import { providersService } from '@teslo/services';

async function fetchProviders() {
	const { data } = await providersService.getAll();
	return data;
}

export function useFetchProviders() {
	return useQueryState(['providers-all'], fetchProviders, []);
}
