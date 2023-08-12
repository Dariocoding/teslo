import { PaymentMethod } from "@teslo/interfaces";
import * as React from "react";
import PaymentMethodBadge from "./PaymentMethod";
import { AiFillCreditCard } from "react-icons/ai";
import { useOrderFormContext } from "..";
import { translate } from "@/i18n";

interface IPaymentMethodsOrderProps {
  className?: string;
  paymentMethods: PaymentMethod[];
}

const PaymentMethodsOrder: React.FunctionComponent<IPaymentMethodsOrderProps> = (props) => {
  const { className, paymentMethods } = props;
  const { values } = useOrderFormContext();
  const { paymentMethod } = values;

  return (
    <div className={className}>
      <PaymentMethodBadge className="font-bold sm:min-w-[300px]" classNameBg="bg-blue-600">
        <div className="flex gap-1 items-center text-base">
          <span>
            <AiFillCreditCard />
          </span>
          <span className="text-sm">{translate("paymentMethods.title")}:</span>
        </div>
      </PaymentMethodBadge>
      {paymentMethods.map((p) => (
        <PaymentMethodBadge
          key={p.idpaymentmethod}
          className="uppercase font-bold cursor-pointer hover:bg-teal-700"
          selectedPaymentMethod={paymentMethod}
          paymentMethod={p}
        >
          {p.title}
        </PaymentMethodBadge>
      ))}
    </div>
  );
};

export default PaymentMethodsOrder;
/*  */
