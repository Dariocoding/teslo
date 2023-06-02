import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { protectedRoutes, validPaths } from '@/utils';
import * as React from 'react';
import { useFetchOrders } from './hooks/useFetchOrders';
import TableOrders from './TableOrders';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { FindOrdersByDateDto } from '@teslo/services/dist/services/orders-service/interfaces';

interface IOrdersPageProps {}

const OrdersPage: React.FunctionComponent<IOrdersPageProps> = props => {
	const {} = props;

	const { data, isFetching, refetch, setData } = useFetchOrders({
		from: new Date(),
		to: new Date(),
	});

	return (
		<HeaderDashboard
			title={'Orders'}
			icon={<RiMoneyDollarCircleFill />}
			to={protectedRoutes.dashboard.path}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.home.path },
				{ label: 'Orders' },
			]}
		>
			<div className="tile">
				<TableOrders
					orders={data}
					isFetching={isFetching}
					refetch={refetch}
					setOrders={setData}
					showSelects
				/>
			</div>
		</HeaderDashboard>
	);
};

export default React.memo(OrdersPage);
