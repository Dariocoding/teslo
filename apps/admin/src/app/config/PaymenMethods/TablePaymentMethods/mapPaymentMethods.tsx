import { PaymentMethod } from "@teslo/interfaces";
import { PaymentMethodTable } from "../config";
import ActionsPaymentMethods from "./ActionsPaymentMethods";

interface IMapPaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  deletePaymentMethod(paymentMethod: PaymentMethod): void;
  updatePaymentMethod(paymentMethod: PaymentMethod): void;
  setViewOrdersByPaymentMethod(paymentMethod: PaymentMethod): void;
}

const mapPaymentMethods = (props: IMapPaymentMethodsProps): PaymentMethodTable[] =>
  props.paymentMethods.map((paymentMethod) => ({
    ...paymentMethod,
    actions: <ActionsPaymentMethods paymentMethod={paymentMethod} {...props} />,
  }));

export default mapPaymentMethods;
