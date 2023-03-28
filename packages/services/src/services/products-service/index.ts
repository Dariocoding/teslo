import { Product, ProductDto } from '@teslo/interfaces';
import { axiosClient } from '../../config/axios';
import { PaginationProductsDto } from './interfaces';

export const productsService = {
	getAllProducts: () => axiosClient.get<Product[]>('/products/all'),
	getAllProductsByCategory: (idcategory: string) =>
		axiosClient.get<Product[]>(`/products/all/${idcategory}`),
	getProducts: (pagination: PaginationProductsDto) =>
		axiosClient.get<Product[]>('/products', { params: pagination }),
	getProduct: (term: string) => axiosClient.get<Product>(`/products/${term}`),
	createProduct: (productDto: ProductDto) =>
		axiosClient.post<Product>('/products', productDto),
	selectProducts: (ids: string[]) =>
		axiosClient.get<Product[]>('/products/select/' + ids.join(',')),
	updateProduct: (idproducto: string, productDto: ProductDto) =>
		axiosClient.put<Product>(`/products/${idproducto}`, productDto),
	search: (term: string) => axiosClient.get<Product[]>('/products/search/' + term),
	deleteProduct: (idproducto: string) => axiosClient.delete(`/products/${idproducto}`),
};

export default productsService;

export * from './interfaces';
