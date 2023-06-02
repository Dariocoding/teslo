import ConfirmModal from '@teslo/react-ui/Modal/ConfirmModal';
import { Brand } from '@teslo/interfaces';
import * as React from 'react';

interface IModalDeleteBrandProps {
	show: boolean;
	brand?: Brand;
	onClose: () => void;
	onAcceptDelete: () => void;
	isLoading: boolean;
}

const ModalDeleteBrand: React.FunctionComponent<IModalDeleteBrandProps> = props => {
	const { brand = {} as Brand, show, onAcceptDelete, onClose, isLoading } = props;

	return (
		<ConfirmModal
			title={`Are you sure you want to delete this brand: ${brand?.title}?`}
			titleModal={'Delete Brand'}
			subTitle={'You will not be able to recover this information'}
			showModal={show}
			onClose={onClose}
			onClickButtonAccept={onAcceptDelete}
			buttonAccepText={'Delete Brand'}
			isLoading={isLoading}
			buttonCancelText={'Cancel'}
		/>
	);
};

export default ModalDeleteBrand;
