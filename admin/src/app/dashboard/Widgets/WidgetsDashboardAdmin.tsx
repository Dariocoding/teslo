import { protectedRoutes } from '@/utils';
import { TotalCountersResponse } from '@teslo/services';
import * as React from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import WidgetDashboard from '../Widget';

interface IWidgetsDashboardAdminProps {
	totales: TotalCountersResponse;
}

const WidgetsDashboardAdmin: React.FunctionComponent<IWidgetsDashboardAdminProps> = props => {
	const { totales } = props;
	return (
		<React.Fragment>
			<WidgetDashboard
				title="Categories"
				Icon={AiFillAppstore}
				value={totales.totalCategories}
				path={protectedRoutes.categories.path}
				colouredIcon={'#04ccd6'}
			/>

			<WidgetDashboard
				title="Products"
				Icon={BsBoxSeam}
				value={totales.totalProducts}
				path={protectedRoutes.products.path}
				colouredIcon={'#ff5252'}
			/>

			<WidgetDashboard
				title="Users"
				Icon={FaUsers}
				value={totales.totalUsers}
				path={protectedRoutes.users.path}
				colouredIcon={'#40407a'}
			/>

			<WidgetDashboard
				title="Orders"
				Icon={RiMoneyDollarCircleFill}
				value={totales.totalOrders}
				path={protectedRoutes.orders.path}
				colouredIcon={'#3ae374'}
			/>
		</React.Fragment>
	);
};

export default WidgetsDashboardAdmin;
