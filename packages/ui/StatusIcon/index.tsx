import classNames from 'classnames';
import PropTypes from 'prop-types';
import { HiCheckCircle, HiInformationCircle, HiExclamation, HiXCircle } from 'react-icons/hi';
import { AlertType } from '../Alert';

const ICONS = {
	success: {
		color: 'text-emerald-400',
		icon: <HiCheckCircle />,
	},
	info: {
		color: 'text-blue-400',
		icon: <HiInformationCircle />,
	},
	warning: {
		color: 'text-yellow-400',
		icon: <HiExclamation />,
	},
	danger: {
		color: 'text-red-400',
		icon: <HiXCircle />,
	},
};

interface IStatusIconProps {
	type?: AlertType;
	custom?: React.ReactNode;
	className?: string;
}

const StatusIcon: React.FunctionComponent<IStatusIconProps> = props => {
	const { type = 'info', custom, className } = props;

	const icon = ICONS[type];

	return (
		<span className={classNames('text-2xL', icon.color, className)}>
			{custom || icon.icon}
		</span>
	);
};

export default StatusIcon;
