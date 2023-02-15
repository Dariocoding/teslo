import { useFetchOrdersByPayment } from '@/app/orders/hooks/useFetchOrdersByPayment';
import TableOrders from '@/app/orders/TableOrders';
import * as React from 'react';

interface ITableOrdersByPaymentProps {
	id: string | number;
}

const TableOrdersByPayment: React.FunctionComponent<ITableOrdersByPaymentProps> = props => {
	const { id } = props;
	const { refetch, data, setData, isFetching } = useFetchOrdersByPayment(id);

	React.useEffect(() => {
		refetch();
	}, [id]);

	return (
		<div className="tile">
			<TableOrders
				orders={data}
				setOrders={setData}
				refetch={refetch}
				isFetching={isFetching}
			/>
		</div>
	);
};

export default TableOrdersByPayment;
