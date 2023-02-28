import { Category } from './category';
import { DetailOrder } from './order';
import { User } from './user';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXS';

export type Gender = 'men' | 'women' | 'kid' | 'unisex';

export interface Product {
	id?: string;
	title?: string;
	slug?: string;
	price?: number;
	description?: string;
	stock?: number;
	sizes?: Size[];
	gender?: Gender;
	tags?: string[];
	category?: Category;
	images?: string[];
	user?: User;
	dateCreated?: Date;
	detail?: DetailOrder;
}

export interface ProductDto {
	title?: string;
	price?: number;
	description?: string;
	slug?: string;
	stock?: number;
	gender?: Gender;
	tags?: string[];
	images?: string[] | File[];
	sizes?: Size[];
	category?: Category | string;
}
