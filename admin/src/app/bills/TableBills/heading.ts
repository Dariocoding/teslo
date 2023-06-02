import { HeaderDataTable } from '@teslo/react-ui/DataTable';

const defaultHeadingBills: HeaderDataTable[] = [
	{ title: 'ID', field: 'idbill', center: true },
	{ title: 'Reference', field: 'reference', center: true },
	{ title: 'Subtotal', field: 'subtotalFormatted', center: true },
	{ title: 'Tax', field: 'taxFormatted', center: true },
	{ title: 'Dlv. Price', field: 'deliveryFormatted', center: true },
	{ title: 'Total', field: 'totalFormatted', center: true },
	{ title: 'Status', field: 'statusFormatted', center: true },
	{ title: 'Date created', field: 'dateCreatedFormatted', center: true },
	{ title: 'Date updated', field: 'dateUpdatedFormatted', center: true },
	{ title: 'Actions', field: 'actions', center: true },
];

export default defaultHeadingBills;
