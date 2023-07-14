import { useAuthStore } from "@/store";
import { Order, ValidRoles } from "@teslo/interfaces";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormContainerOrder from "../orders-new/forms/FormContainer";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { validPaths } from "@/utils";
import { ordersService } from "@teslo/services";

interface IOrdersEditPageProps {}

const OrdersEditPage: React.FunctionComponent<IOrdersEditPageProps> = props => {
	const {} = props;
	const navigate = useNavigate();
	const { id } = useParams();
	const [order, setOrder] = React.useState<Order>(null);
	const { user } = useAuthStore();

	React.useEffect(() => {
		async function getOrder() {
			if (user.roles.includes(ValidRoles.USER) || user.roles.includes(ValidRoles.SELLER)) {
				navigate(validPaths.orders.path);
				return;
			}
			try {
				showLoader();
				const req = await ordersService.getOrderById(id);
				const reqOrder = req.data;
				if (!reqOrder) {
					navigate(validPaths.orders.path);
					hideLoader();
					return;
				}
				setOrder(reqOrder);
			} catch (error) {
				console.log(error);
				navigate(validPaths.orders.path);
			} finally {
				hideLoader();
			}
		}

		getOrder();
	}, []);

	if (!order) return null;

	return <FormContainerOrder tempProducts={null} order={order} />;
};

export default OrdersEditPage;
