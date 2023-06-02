import { Tab, Tabs } from '@teslo/react-ui/Tabs';
import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { User, ValidRoles } from '@teslo/interfaces';
import * as React from 'react';
import { useFetcUsers } from './hooks/useFetchUsers';
import TableUsers from './TableUsers.tsx';
import { validPaths } from '@/utils';
import { FaUsers } from 'react-icons/fa';

interface IUsersPageProps {}

const UsersPage: React.FunctionComponent<IUsersPageProps> = props => {
	const {} = props;
	const { data: users, setData, isFetching, refetch } = useFetcUsers();

	const [selectedValue, setSelected] = React.useState(ValidRoles.ADMIN);
	const usersSelected = users.filter(user => user.roles.includes(selectedValue));

	return (
		<HeaderDashboard
			to={validPaths.dashboard.path}
			title={'Users'}
			icon={<FaUsers />}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.home.path },
				{ label: 'Users' },
			]}
		>
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
		</HeaderDashboard>
	);
};

export default React.memo(UsersPage);
