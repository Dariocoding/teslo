import { HeaderDataTable } from '@teslo/react-ui/DataTable';

const defaultHeadingPaymentMethods: HeaderDataTable[] = [
	{ title: 'ID', field: 'idpaymentmethod', center: true },
	{ title: 'Name', field: 'title', center: true },
	{ title: 'Owner', field: 'owner', center: true },

	{ title: 'DNI', field: 'dni', center: true },

	{ title: 'Email', field: 'email', center: true },

	{ title: 'Actions', field: 'actions', center: true },
];

export default defaultHeadingPaymentMethods;
