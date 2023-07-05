import ConfirmModal from "@teslo/react-ui/Modal/ConfirmModal";
import { Product } from "@teslo/interfaces";
import * as React from "react";
import { translate } from "@/i18n";

interface IModalDeleteProductProps {
	onAcceptDeleteProduct(): void;
	onCloseModalDelete(): void;
	showModalDeleteProduct: boolean;
	product: Product;
	isLoading: boolean;
}

const ModalDeleteProduct: React.FunctionComponent<IModalDeleteProductProps> = props => {
	const {
		onAcceptDeleteProduct,
		onCloseModalDelete,
		showModalDeleteProduct,
		product,
		isLoading,
	} = props;
	return (
		<ConfirmModal
			title={translate("products.delete.youSure", {
				name: `${product?.title}`,
			})}
			titleModal={translate("products.delete.title")}
			subTitle={translate("products.delete.youWillNotBeAbleToRecover")}
			showModal={showModalDeleteProduct}
			onClose={onCloseModalDelete}
			onClickButtonAccept={onAcceptDeleteProduct}
			buttonAccepText={translate("products.delete.title")}
			isLoading={isLoading}
			buttonCancelText={translate("app.cancel")}
		/>
	);
};

export default ModalDeleteProduct;
