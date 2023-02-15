import ConfirmModal from '@teslo/react-ui/Modal/ConfirmModal';
import { Product } from '@teslo/interfaces';
import * as React from 'react';

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
			title={`Are you sure you want to delete this product: ${product?.title}?`}
			titleModal={'Delete Product'}
			subTitle={'You will not be able to recover this information'}
			showModal={showModalDeleteProduct}
			onClose={onCloseModalDelete}
			onClickButtonAccept={onAcceptDeleteProduct}
			buttonAccepText={'Delete Product'}
			isLoading={isLoading}
			buttonCancelText={'Cancel'}
		/>
	);
};

export default ModalDeleteProduct;
