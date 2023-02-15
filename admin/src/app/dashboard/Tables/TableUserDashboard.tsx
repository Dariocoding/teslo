import TableUsers from '@/app/users/TableUsers.tsx';
import { HeaderDataTable } from '@teslo/react-ui/DataTable';
import { User } from '@teslo/interfaces';
import * as React from 'react';

interface ITableUserDashboardProps {
	users: User[];
	setUsers: React.Dispatch<User[]>;
}

const heading: HeaderDataTable[] = [
	{ title: 'Date Created', field: 'dateCreatedFormattedWithouHour', center: true },
	{ title: 'Full Name', field: 'fullName' },
	{ title: 'Actions', field: 'actions', center: true },
];

const TableUserDashboard: React.FunctionComponent<ITableUserDashboardProps> = props => {
	const { users, setUsers } = props;
	return (
		<TableUsers
			isFetching={false}
			users={users}
			setUsers={setUsers}
			showCreate={false}
			showPagination={false}
			showSearch={false}
			heading={heading}
		/>
	);
};

export default TableUserDashboard;
