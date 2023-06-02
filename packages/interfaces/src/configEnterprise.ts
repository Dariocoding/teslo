export interface ConfigEnterprise {
	name: string;
	phone: string;
	email: string;
	address: string;
	iva: number;
	prefixes: string[];
}

export interface ConfigEnterpriseDto extends Partial<ConfigEnterprise> {}
