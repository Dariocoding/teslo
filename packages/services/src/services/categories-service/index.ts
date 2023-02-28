import { Category, CategoryDto } from '@teslo/interfaces';
import { axiosClient } from '../../config/axios';
import { CategoryRequestResponse } from './interfaces';

export const categoriesService = {
	getCategories: () => axiosClient.get<Category[]>('/categories'),
	getCategory: (term: string) => axiosClient.get<Category>(`/categories/${term}`),
	createCategory: (data: CategoryDto) =>
		axiosClient.post<CategoryRequestResponse>('/categories', data),
	updateCategory: (idcategory: string, data: CategoryDto) =>
		axiosClient.put<CategoryRequestResponse>(`/categories/${idcategory}`, data),
	deleteCategory: (idcategory: string) => axiosClient.delete(`/categories/${idcategory}`),
};

export * from './interfaces';
