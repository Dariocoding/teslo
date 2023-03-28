import { Product } from './product';

export interface Category {
	idcategory?: string;
	title?: string;
	slug?: string;
	products?: Product[];
	dateCreated?: Date;
}

export interface CategoryDto {
	title?: string;
	slug?: string;
}
