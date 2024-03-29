import { Order } from "./order";
import { Product } from "./product";

export interface User {
	iduser?: string;
	email?: string;
	phone?: string;
	firstName?: string;
	lastName?: string;
	password?: string;
	isActive?: boolean;
	token?: string;
	isDelete?: boolean;
	roles?: ValidRol[];
	product?: Product;
	dateCreated?: Date;
	orders?: Order[];
	wishlist?: string[];
	prefix?: string;
	dni?: string;
}

export type ValidRol = "admin" | "super-user" | "user" | "seller" | "supervisor";

export interface UserDto {
	firstName?: string;
	lastName?: string;
	password?: string;
	email?: string;
	phone?: string;
	isActive?: boolean;
	roles?: ValidRol[];
	wishlist?: string[];
	prefix?: string;
	dni?: string;
}
