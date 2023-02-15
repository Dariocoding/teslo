import useQueryState from '@/utils/hooks/useQueryState';
import { categoriesService } from '@teslo/services';

async function fetchCategories() {
	const { data } = await categoriesService.getCategories();
	return data;
}

export function useFetchCategories() {
	return useQueryState(['categories'], fetchCategories, []);
}
