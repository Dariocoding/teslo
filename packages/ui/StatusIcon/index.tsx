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
	const { type, custom, className } = props;

	const icon = ICONS[type];

	return (
		<span className={classNames('text-2xL', icon.color, className)}>
			{custom || icon.icon}
		</span>
	);
};

StatusIcon.defaultProps = {
	type: 'info',
};

StatusIcon.propTypes = {
	type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
	custom: PropTypes.node,
};

export default StatusIcon;
