import { Product } from './product';
import { User } from './user';

export interface Order {
	idorder?: number;
	reference?: string;
	status?: StatusOrder;
	total?: number;
	dateCreated?: Date;
	detail?: DetailOrder[];
	user?: User;
	paymentMethod?: PaymentMethod;
}

export interface OrderDto {
	total?: number;
	reference?: string;
	status?: StatusOrder;
	detail?: DetailDto[];
	paymentMethod?: PaymentMethod | string;
}

interface DetailDto {
	total?: number;
	quantity?: number;
	product?: Product;
}

export interface DetailOrder {
	id?: number;
	total?: number;
	quantity?: number;
	title?: string;
	product?: Product;
	order?: Order;
}

export type StatusOrder = 'pending' | 'completed' | 'cancelled' | 'paid';

export interface PaymentMethod {
	idpaymentmethod?: number;
	title?: string;
	owner?: string;
	phone?: string;
	dni?: string;
	email?: string;
}

export interface PaymentMethodDto {
	title?: string;
	owner?: string;
	phone?: string;
	dni?: string;
	email?: string;
}
