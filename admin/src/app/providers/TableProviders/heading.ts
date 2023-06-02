import { HeaderDataTable } from '@teslo/react-ui/DataTable';

export const DefaultTableHeadingProviders: HeaderDataTable[] = [
	{ title: 'ID', field: 'idprovider' },
	{ title: 'Name', field: 'name' },
	{ title: 'Phone 1', field: 'phone1' },
	{ title: 'Phone 2', field: 'phone2' },
	{ title: 'E-mail', field: 'email' },
	{ title: 'Actions', field: 'actions', center: true },
];
