import { Tab, Tabs } from '@teslo/react-ui/Tabs';
import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { User, ValidRoles } from '@teslo/interfaces';
import * as React from 'react';
import { useFetcUsers } from './hooks/useFetchUsers';
import TableUsers from './TableUsers.tsx';

interface IUsersPageProps {}

const UsersPage: React.FunctionComponent<IUsersPageProps> = props => {
	const {} = props;
	const { data: users, setData, isFetching, refetch } = useFetcUsers();

	const [selectedValue, setSelected] = React.useState(ValidRoles.ADMIN);
	const usersSelected = users.filter(user => user.roles.includes(selectedValue));

	return (
		<React.Fragment>
			<HeaderDashboard to={'/dashboard'}>Dashboard</HeaderDashboard>
			<div className="tile">
				<div className="mb-4">
					<Tabs
						setSelectedValue={setSelected}
						selectedValue={selectedValue}
					>
						<Tab value={ValidRoles.ADMIN}>Admins</Tab>
						<Tab value={ValidRoles.USER}>Users</Tab>
					</Tabs>
				</div>
				<TableUsers
					users={usersSelected}
					setUsers={(data: User[]) =>
						setData([
							...data,
							...users.filter(
								user =>
									!user.roles.includes(
										selectedValue
									)
							),
						])
					}
					isFetching={isFetching}
					refetch={refetch}
					validRol={selectedValue}
				/>
			</div>
		</React.Fragment>
	);
};

export default React.memo(UsersPage);
