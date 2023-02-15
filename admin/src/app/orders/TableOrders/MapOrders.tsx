import { formatter } from '@/utils';
import { Order } from '@teslo/interfaces';
import dayjs from 'dayjs';
import { OrderTable } from '../config';
import ActionsTableOrder from './ActionsTableOrder';
import BadgeStatusOrder from './BadgeStatusOrder';

interface IMapOrdersProps {
	orders: Order[];
	onClickUpdateOrder(order: Order): void;
	onClickViewUser(order: Order): void;
}

const mapOrders = (props: IMapOrdersProps): OrderTable[] => {
	const { orders, onClickUpdateOrder, onClickViewUser } = props;
	return orders.map(order => ({
		...order,
		actions: (
			<ActionsTableOrder
				order={order}
				onClickUpdateOrder={onClickUpdateOrder}
				onClickViewUser={onClickViewUser}
			/>
		),
		fullName: order.user.firstName + ' ' + order.user.lastName,
		dateCreatedFormatted: dayjs(order.dateCreated).format('DD/MM/YYYY'),
		totalFormatted: formatter.format(order.total),
		badgeStatus: <BadgeStatusOrder status={order.status} />,
	}));
};

export default mapOrders;
