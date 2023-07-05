import { Product, ProductDto } from "@teslo/interfaces";
import { axiosClient } from "../../config/axios";
import { FiltersAllProductDto, PaginationProductsDto } from "./interfaces";
import { AxiosRequestConfig } from "axios";

export const productsService = {
	getAllProducts: () => axiosClient.get<Product[]>("/products/all"),
	getAllProductsByCategory: (idcategory: string) =>
		axiosClient.get<Product[]>(`/products/all/category/${idcategory}`),
	getAllProductsByBrand: (idbrand: string) =>
		axiosClient.get<Product[]>(`/products/all/brand/${idbrand}`),
	getAllProductsByProvider: (idprovider: string) =>
		axiosClient.get<Product[]>(`/products/all/provider/${idprovider}`),
	getAllByFilters: (filters: FiltersAllProductDto) =>
		axiosClient.get<Product[]>("/products/all/filters", { params: filters }),
	getProducts: (pagination: PaginationProductsDto) =>
		axiosClient.get<Product[]>("/products", { params: pagination }),
	getProduct: (term: string) => axiosClient.get<Product>(`/products/${term}`),
	createProduct: (productDto: ProductDto) => axiosClient.post<Product>("/products", productDto),
	selectProducts: (ids: string[]) =>
		axiosClient.get<Product[]>("/products/select/" + ids.join(",")),
	updateProduct: (idproducto: string, productDto: ProductDto) =>
		axiosClient.put<Product>(`/products/${idproducto}`, productDto),
	search: (term: string, config?: AxiosRequestConfig<string>) =>
		axiosClient.get<Product[]>("/products/search/" + term, config),
	deleteProduct: (idproducto: string) => axiosClient.delete(`/products/${idproducto}`),
};

export default productsService;

export * from "./interfaces";
