import { translate } from "@/i18n";
import { Provider } from "@teslo/interfaces";
import ConfirmModal from "@teslo/react-ui/Modal/ConfirmModal";
import * as React from "react";

interface IModalDeleteProviderProps {
  provider: Provider;
  show: boolean;
  onClose: () => void;
  onAcceptDelete: () => void;
  isLoading: boolean;
}

const ModalDeleteProvider: React.FunctionComponent<IModalDeleteProviderProps> = (props) => {
  const { provider, onAcceptDelete, onClose, show, isLoading } = props;

  return (
    <ConfirmModal
      title={translate("providers.delete.youSure", {
        name: provider?.name,
      })}
      titleModal={translate("providers.delete")}
      subTitle={translate("providers.delete.youWillNotBeAbleToRecover")}
      showModal={show}
      onClose={onClose}
      onClickButtonAccept={onAcceptDelete}
      buttonAccepText={translate("providers.delete")}
      isLoading={isLoading}
      buttonCancelText={translate("app.cancel")}
    />
  );
};

export default ModalDeleteProvider;
