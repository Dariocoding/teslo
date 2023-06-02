import { Provider } from './providers';
import { StatusOrder } from './order';
import { Product } from './product';

export interface Bill {
	idbill: number;
	dateCreated: Date;
	dateUpdated: Date;
	status: StatusOrder;
	reference: string;
	details: DetailBill[];
	description: string;
	total: number;
	subtotal: number;
	provider: Provider;
	delivery: number;
	tax: number;
}

export interface DetailBill {
	iddetailbill: number;
	price: number;
	qty: number;
	bill?: Bill;
	product: Product;
}

export interface BillDto extends Omit<Bill, 'idbill' | 'dateCreated' | 'dateUpdated' | 'details'> {
	details: DetailBillDto[];
}

export interface UpdateBillDto extends Partial<BillDto> {}

export interface DetailBillDto extends Omit<DetailBill, 'iddetailbill'> {}
