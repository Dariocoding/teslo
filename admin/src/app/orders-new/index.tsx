import * as React from "react";
import FormContainerOrder from "./forms/FormContainer";
import { useCartStore } from "@/store";

interface IOrdersNewProps {}

const OrdersNew: React.FunctionComponent<IOrdersNewProps> = props => {
	const {} = props;
	const { cart } = useCartStore();
	return (
		<React.Fragment>
			<FormContainerOrder tempProducts={cart} />
		</React.Fragment>
	);
};

export default OrdersNew;
