import { formatter } from "@/utils";
import { Order } from "@teslo/interfaces";
import dayjs from "dayjs";
import { OrderTable } from "../config";
import ActionsTableOrder, { IActionsTableOrderProps } from "./ActionsTableOrder";
import BadgeStatusOrder from "./BadgeStatusOrder";

interface IMapOrdersProps extends Omit<IActionsTableOrderProps, "order"> {
	orders: Order[];
}

const mapOrders = (props: IMapOrdersProps): OrderTable[] => {
	const { orders } = props;
	return orders.map(order => {
		const ivaFormatted = (((order.subtotal || 0) * (order.iva || 0)) / 100).toFixed(2);
		return {
			...order,
			actions: <ActionsTableOrder order={order} {...props} />,
			fullName: order.user.firstName + " " + order.user.lastName,
			dateCreatedFormatted: dayjs(order.dateCreated).format("DD/MM/YYYY"),
			totalFormatted: formatter.format(order.total),
			badgeStatus: <BadgeStatusOrder status={order.status} />,
			subtotalFormatted: formatter.format(order.subtotal || 0),
			ivaFormatted: formatter.format(parseFloat(ivaFormatted)),
			sellerFullName: order.userSell
				? order.userSell.firstName + " " + order.userSell.lastName
				: "",
		};
	});
};

export default mapOrders;
