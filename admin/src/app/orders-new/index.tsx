import * as React from "react";
import FormContainerOrder from "./forms/FormContainer";
import { useCartStore } from "@/store";

interface IOrdersNewProps {}

const OrdersNew: React.FunctionComponent<IOrdersNewProps> = (props) => {
  const {} = props;
  const { cart } = useCartStore();
  return <FormContainerOrder tempProducts={cart} />;
};

export default OrdersNew;
