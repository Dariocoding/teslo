import { Gender, StatusProduct } from '@teslo/interfaces';
import { Pagination } from '../interfaces.api';

export interface PaginationProductsDto extends Pagination {
	gender?: Gender;

	categories?: string[];

	sizes?: string[];

	status?: StatusProduct;
}
