import ConfirmModal from '@teslo/react-ui/Modal/ConfirmModal';
import * as React from 'react';

interface IConfirmModalDeleteSaveListProps {
	showModal: boolean;
	onClose(): void;
	onAccept(): void;
	isLoading: boolean;
}

const ConfirmModalDeleteSaveList: React.FC<IConfirmModalDeleteSaveListProps> = props => {
	const { onAccept, onClose, showModal, isLoading } = props;
	return (
		<ConfirmModal
			buttonAccepText={'Delete Save List'}
			buttonCancelText={'Cancel'}
			onClickButtonAccept={onAccept}
			titleModal={'Delete all Save List'}
			title={'Delete all Save List'}
			subTitle={'Are you want to delete all Save List?'}
			showModal={showModal}
			onClose={onClose}
			isLoading={isLoading}
		/>
	);
};

export default ConfirmModalDeleteSaveList;

/* titleModal?: React.ReactNode;
title?: React.ReactNode;
subTitle?: React.ReactNode;
showModal?: boolean;
onClose?: () => void;
buttonCancelText?: React.ReactNode;
buttonAccepText?: React.ReactNode;
onClickButtonAccept: () => void;
isLoading?: boolean; */
