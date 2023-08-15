import ConfirmModal from "@/components/ui/Modal/ConfirmModal";
import { PaymentMethod } from "@teslo/interfaces";
import * as React from "react";
import { translate } from "@/i18n";

interface IModalDeletePaymentMethodProps {
  showModalDeletePaymentMethod: boolean;
  paymentMethod?: PaymentMethod;
  onCloseModalDelete: () => void;
  onAcceptDeletePaymentMethod: () => void;
  isLoading: boolean;
}

const ModalDeletePaymentMethod: React.FC<IModalDeletePaymentMethodProps> = (props) => {
  const {
    paymentMethod = {},
    showModalDeletePaymentMethod,
    onAcceptDeletePaymentMethod,
    onCloseModalDelete,
    isLoading,
  } = props;

  return (
    <ConfirmModal
      title={translate("paymentMethods.delete.youSure", {
        name: paymentMethod?.title,
      })}
      titleModal={translate("paymentMethods.delete")}
      subTitle={translate("paymentMethods.delete.youWillNotBeAbleToRecover")}
      showModal={showModalDeletePaymentMethod}
      onClose={onCloseModalDelete}
      onClickButtonAccept={onAcceptDeletePaymentMethod}
      buttonAccepText={translate("paymentMethods.delete")}
      isLoading={isLoading}
      buttonCancelText={translate("app.cancel")}
    />
  );
};

export default ModalDeletePaymentMethod;
