import { StatusOrder } from './order';
import { Gender, Size } from './product';

export enum ValidSizes {
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
export const ARRSIZES: Size[] = ['L', 'M', 'S', 'XL', 'XS', 'XXL'];

export enum ValidStatusOrder {
	PENDING = 'pending',
	COMPLETED = 'completed',
	CANCELED = 'cancelled',
}

export const ARRSTATUSORDER: StatusOrder[] = [
	ValidStatusOrder.CANCELED,
	ValidStatusOrder.COMPLETED,
	ValidStatusOrder.PENDING,
];

export * from './category';
export * from './order';
export * from './product';
export * from './user';
