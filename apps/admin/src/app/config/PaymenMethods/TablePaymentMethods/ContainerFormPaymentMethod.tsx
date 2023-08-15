import { translate } from "@/i18n";
import classNames from "classnames";
import * as React from "react";
import FormPaymentMethod from "../Forms/FormPaymentMethod";
import { PaymentMethod } from "@teslo/interfaces";

interface IContainerFormPaymentMethodProps {
  status: "update" | "create";
  onSuccessForm: (paymentMethod: PaymentMethod) => void;
  tempPaymentMethod: PaymentMethod;
}

const ContainerFormPaymentMethod: React.FC<IContainerFormPaymentMethodProps> = (props) => {
  const { status, onSuccessForm, tempPaymentMethod } = props;
  return (
    <div className="lg:col-span-2">
      <div
        className={classNames(
          "tile mb-0 rounded-b-none text-white py-3",
          status === "create" && "bg-blue-600",
          status === "update" && "bg-red-600"
        )}
      >
        <h6>
          {translate(
            status === "create" ? "paymentMethods.add.title" : "paymentMethods.edit.title"
          )}
        </h6>
      </div>
      <div className="tile rounded-t-none">
        <FormPaymentMethod
          state={status}
          onSuccess={onSuccessForm}
          paymentMethod={tempPaymentMethod}
        />
      </div>
    </div>
  );
};

export default ContainerFormPaymentMethod;
