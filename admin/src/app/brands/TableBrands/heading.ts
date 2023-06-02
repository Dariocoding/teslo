import { HeaderDataTable } from '@teslo/react-ui/DataTable';

const headingBrands: HeaderDataTable[] = [
	{ title: 'ID', field: 'idbrand' },

	{ title: 'Name', field: 'title' },
	{ title: 'Date Created', field: 'dateFormatted', center: true },
	{ title: 'Actions', field: 'actions', center: true },
];

export default headingBrands;
