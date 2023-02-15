import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { protectedRoutes } from '@/utils';
import * as React from 'react';
import { useFetchOrders } from './hooks/useFetchOrders';
import TableOrders from './TableOrders';

interface IOrdersPageProps {}

const OrdersPage: React.FunctionComponent<IOrdersPageProps> = props => {
	const {} = props;
	const { data, isFetching, refetch, setData } = useFetchOrders();
	return (
		<React.Fragment>
			<HeaderDashboard to={protectedRoutes.dashboard.path}>
				Dashboard
			</HeaderDashboard>
			<div className="tile">
				<TableOrders
					orders={data}
					isFetching={isFetching}
					refetch={refetch}
					setOrders={setData}
				/>
			</div>
		</React.Fragment>
	);
};

export default React.memo(OrdersPage);
