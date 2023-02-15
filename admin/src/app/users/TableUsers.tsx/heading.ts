import { HeaderDataTable } from '@teslo/react-ui/DataTable';

const defaultHeadingUsers: HeaderDataTable[] = [
	{ title: 'ID', field: 'iduser' },
	{ title: 'First Name', field: 'firstName' },
	{ title: 'Last Name', field: 'lastName' },
	{ title: 'Email', field: 'email' },
	{ title: 'Rol', field: 'userRol' },
	{ title: 'Phone', field: 'phone' },
	{ title: 'Date Created', field: 'dateCreatedFormatted', center: true },
	{ title: 'Status', field: 'isActiveFormatted', center: true },
	{ title: 'Actions', field: 'actions', center: true },
];

export default defaultHeadingUsers;
