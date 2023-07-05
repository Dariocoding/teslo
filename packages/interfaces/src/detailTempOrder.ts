import { User } from "./user";
import { Product, Size } from "./product";

export interface DetailOrderTempDto {
	product: Product;
	qty: number;
	size?: Size;
}

export interface DetailOrderTemp {
	id: number;
	userOrder?: User;
	product: Product;
	qty: number;
	size?: Size;
}
