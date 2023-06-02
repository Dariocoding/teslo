import { Provider } from '@teslo/interfaces';
import ConfirmModal from '@teslo/react-ui/Modal/ConfirmModal';
import * as React from 'react';

interface IModalDeleteProviderProps {
	provider: Provider;
	show: boolean;
	onClose: () => void;
	onAcceptDelete: () => void;
	isLoading: boolean;
}

const ModalDeleteProvider: React.FunctionComponent<IModalDeleteProviderProps> = props => {
	const { provider, onAcceptDelete, onClose, show, isLoading } = props;

	return (
		<ConfirmModal
			title={`Are you sure you want to delete this provider: ${provider?.name}?`}
			titleModal={'Delete Provider'}
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

export default ModalDeleteProvider;
