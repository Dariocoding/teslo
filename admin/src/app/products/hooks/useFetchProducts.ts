import useQueryState from '@/utils/hooks/useQueryState';
import { productsService } from '@teslo/services';

async function fetchProducts() {
	const { data } = await productsService.getAllProducts();
	return data;
}

export function useFetchProducts() {
	return useQueryState(['products'], fetchProducts, []);
}
