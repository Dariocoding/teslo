import { HeaderDataTable } from '@teslo/react-ui/DataTable';

const defaultHeadingOrders: HeaderDataTable[] = [
	{ title: 'ID', field: 'idorder' },
	{ title: 'Reference', field: 'reference' },
	{ title: 'Full name', field: 'fullName' },
	{ title: 'Date', field: 'dateCreatedFormatted' },
	{ title: 'Payment Method', field: 'paymentMethod.title' },
	{ title: 'Total', field: 'totalFormatted', center: true },
	{ title: 'status', field: 'badgeStatus', center: true },
	{ title: 'Actions', field: 'actions', center: true },
];

export default defaultHeadingOrders;
