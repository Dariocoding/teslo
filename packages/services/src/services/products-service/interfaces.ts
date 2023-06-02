import { Gender, StatusProduct } from '@teslo/interfaces';
import { Pagination } from '../interfaces.api';

export interface PaginationProductsDto extends Pagination {
	gender?: Gender;

	categories?: string[];

	sizes?: string[];

	status?: StatusProduct;
}

export interface FiltersAllProductDto {
	categoryID?: string;

	providerID?: string;

	brandID?: string;
}
