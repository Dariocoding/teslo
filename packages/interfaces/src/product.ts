import { Provider } from "./providers";
import { Category } from "./category";
import { DetailOrder } from "./order";
import { User } from "./user";
import { Brand } from "./brands";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXS";

export type Gender = "men" | "women" | "kid" | "unisex" | "";

export type StatusProduct = "New in" | "50% Discount" | "Sold Out" | "Limited Edition" | "";

export interface Product {
	id?: string;
	title?: string;
	slug?: string;
	price?: number;
	description?: string;
	stock?: number;
	sizes?: Size[];
	gender?: Gender;
	categories?: Category[];
	images?: string[];
	user?: User;
	dateCreated?: Date;
	detail?: DetailOrder;
	status?: StatusProduct;
	providers?: Provider[];
	brand?: Brand;
	code?: number;
	customCode?: string;
}

export interface ProductDto {
	title?: string;
	price?: number;
	description?: string;
	slug?: string;
	stock?: number;
	gender?: Gender;
	images?: string[] | File[];
	sizes?: Size[];
	categories?: Category[] | string[];
	status?: StatusProduct;
	brand?: Brand | string;
	providers?: Provider[] | string[];
	customCode?: string;
}
