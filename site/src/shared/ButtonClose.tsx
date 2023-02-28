import * as React from 'react';
import classNames from 'classnames';
import { GrFormClose } from 'react-icons/gr';

interface IButtonCloseProps {
	className?: string;
	onClose(): void;
}

const ButtonClose: React.FunctionComponent<IButtonCloseProps> = props => {
	const { className, onClose } = props;
	return (
		<button className={classNames('btn btn-xs', className)} onClick={onClose}>
			<GrFormClose />
		</button>
	);
};

export default ButtonClose;
