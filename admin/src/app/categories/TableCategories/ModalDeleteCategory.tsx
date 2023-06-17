import ConfirmModal from "@teslo/react-ui/Modal/ConfirmModal";
import { Category } from "@teslo/interfaces";
import * as React from "react";
import { translate } from "@/i18n";

interface IModalDeleteCategoryProps {
  showModalDeleteCategory: boolean;
  category?: Category;
  onCloseModalDelete: () => void;
  onAcceptDeleteCategory: () => void;
  isLoading: boolean;
}

const ModalDeleteCategory: React.FunctionComponent<IModalDeleteCategoryProps> = (props) => {
  const {
    category = {},
    showModalDeleteCategory,
    onAcceptDeleteCategory,
    onCloseModalDelete,
    isLoading,
  } = props;

  return (
    <ConfirmModal
      title={translate("categories.delete.youSure", {
        name: `${category?.title}`,
      })}
      titleModal={translate("categories.delete")}
      subTitle={translate("categories.delete.youWillNotBeAbleToRecover")}
      showModal={showModalDeleteCategory}
      onClose={onCloseModalDelete}
      onClickButtonAccept={onAcceptDeleteCategory}
      buttonAccepText={translate("categories.delete")}
      isLoading={isLoading}
      buttonCancelText={translate("app.cancel")}
    />
  );
};

export default ModalDeleteCategory;
