import useQueryState from '@/utils/hooks/useQueryState';
import { brandsService } from '@teslo/services';

async function fetchBrands() {
	const { data } = await brandsService.getAll();
	return data;
}

export function useFetchBrands() {
	return useQueryState(['brands-all'], fetchBrands, []);
}
