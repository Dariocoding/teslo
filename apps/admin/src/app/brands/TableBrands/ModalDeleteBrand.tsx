import ConfirmModal from "@/components/ui/Modal/ConfirmModal";
import { Brand } from "@teslo/interfaces";
import * as React from "react";
import { translate } from "@/i18n";

interface IModalDeleteBrandProps {
  show: boolean;
  brand?: Brand;
  onClose: () => void;
  onAcceptDelete: () => void;
  isLoading: boolean;
}

const ModalDeleteBrand: React.FunctionComponent<IModalDeleteBrandProps> = (props) => {
  const { brand = {} as Brand, show, onAcceptDelete, onClose, isLoading } = props;

  return (
    <ConfirmModal
      title={translate("brands.delete.youSure", {
        name: brand?.title,
      })}
      titleModal={translate("brands.delete")}
      subTitle={translate("brands.delete.youWillNotBeAbleToRecover")}
      showModal={show}
      onClose={onClose}
      onClickButtonAccept={onAcceptDelete}
      buttonAccepText={translate("brands.delete")}
      isLoading={isLoading}
      buttonCancelText={translate("app.cancel")}
    />
  );
};

export default ModalDeleteBrand;
