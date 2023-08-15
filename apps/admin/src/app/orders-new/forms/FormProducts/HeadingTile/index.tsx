import { PaymentMethod } from "@teslo/interfaces";
import * as React from "react";
import { Select } from "react-rainbow-components";
import { useOrdersFormContext } from "../../FormContainer";
import { FaEye } from "react-icons/fa";
import ModalPaymentMethod from "@/app/config/PaymenMethods/shared/ModalPaymentMethod";

interface IHeadingTileProps {
  paymentMethods: PaymentMethod[];
  title?: React.ReactNode;
}

const HeadingTile: React.FunctionComponent<IHeadingTileProps> = (props) => {
  const { paymentMethods, title } = props;
  const [showModalPaymentMethod, setShowPaymentMethod] = React.useState(false);
  const { values, setValues } = useOrdersFormContext();

  return (
    <div className="flex items-center justify-between mb-3 w-full">
      <span className="font-semibold text-xl">{title}</span>
      <span className="flex items-center gap-1">
        <Select
          options={paymentMethods.map((p) => ({
            label: p.title,
            value: p.idpaymentmethod.toString(),
          }))}
          value={values.paymentMethod.idpaymentmethod}
          onChange={(e) => {
            setValues({
              ...values,
              paymentMethod: paymentMethods.find((p) => p.idpaymentmethod === +e.target.value),
            });
          }}
          size="small"
          borderRadius="semi-square"
        />
        <button
          type="button"
          onClick={() => setShowPaymentMethod(true)}
          className="mb-0 btn btn-xs btn-success shadow-none"
        >
          <FaEye />
        </button>
      </span>
      <ModalPaymentMethod
        show={showModalPaymentMethod}
        onClose={() => setShowPaymentMethod(false)}
        paymentMethod={values.paymentMethod}
      />
    </div>
  );
};

export default HeadingTile;
