import { StatusOrder } from './order';
import { Gender, Size, StatusProduct } from './product';

export enum ValidSizes {
	XXS = 'XXS',
	XS = 'XS',
	S = 'S',
	M = 'M',
	L = 'L',
	XL = 'XL',
	XXL = 'XXL',
}

export enum ValidRoles {
	ADMIN = 'admin',
	SUPER_USER = 'super-user',
	USER = 'user',
}

export const ARRGENDERS: Gender[] = ['kid', 'men', 'unisex', 'women'];
export const ARRSIZES: Size[] = ['L', 'M', 'S', 'XL', 'XS', 'XXS', 'XXL'];
export const ARRSTATUSPRODUCT: StatusProduct[] = [
	'50% Discount',
	'Limited Edition',
	'New in',
	'Sold Out',
];

export enum ValidStatusOrder {
	PENDING = 'pending',
	COMPLETED = 'completed',
	CANCELED = 'cancelled',
	PAID = 'paid',
}

export const ARRSTATUSORDER: StatusOrder[] = [
	ValidStatusOrder.CANCELED,
	ValidStatusOrder.COMPLETED,
	ValidStatusOrder.PENDING,
	ValidStatusOrder.PAID,
];

export * from './category';
export * from './order';
export * from './product';
export * from './user';
export * from './brands';
export * from './providers';
export * from './configEnterprise';
export * from './configApp';
export * from './bills';
