import { translate } from "@/i18n";
import { PaymentMethod } from "@teslo/interfaces";
import Modal from "@/components/ui/Modal";
import * as React from "react";

interface IModalPaymentMethodProps {
  show?: boolean;
  onClose?: () => void;
  paymentMethod: PaymentMethod;
}

const ModalPaymentMethod: React.FunctionComponent<IModalPaymentMethodProps> = (props) => {
  const { show, onClose, paymentMethod } = props;
  if (!paymentMethod || !paymentMethod.idpaymentmethod) return null;
  return (
    <Modal
      showModal={show}
      onClose={onClose}
      size="md"
      title={translate("paymentMethods.view.title")}
    >
      <div className="flex flex-col items-start justify-start gap-y-4 text-sm">
        <div>
          <span className="font-bold">{translate("paymentMethods.label.name")}:</span>{" "}
          {paymentMethod.title}
        </div>
        <div>
          <span className="font-bold">{translate("paymentMethods.label.owner")}:</span>{" "}
          {paymentMethod.owner}
        </div>

        <div>
          <span className="font-bold">{translate("paymentMethods.label.email")}:</span>{" "}
          {paymentMethod.email}
        </div>

        <div>
          <span className="font-bold">{translate("paymentMethods.label.phone")}:</span>{" "}
          {paymentMethod.phone}
        </div>

        <div>
          <span className="font-bold">DNI:</span> {paymentMethod.dni}
        </div>
      </div>
    </Modal>
  );
};

export default ModalPaymentMethod;
