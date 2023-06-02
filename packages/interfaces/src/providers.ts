import { Product } from './product';

export interface Provider {
	idprovider: string;
	name: string;
	slug: string;
	products?: Product[];
	dateCreated: Date;
	phone1: string;
	phone2: string;
	email: string;
}

export interface ProviderDto {
	name?: string;
	phone1?: string;
	phone2?: string;
	email?: string;
}
