import React from 'react';
import { HiOutlineMenuAlt2, HiOutlineMenu } from 'react-icons/hi';
import classNames from 'classnames';
import { IS_THEMED, THEMED_SIDEBAR_CLASSNAMES } from '@/utils';

interface INavToggleProps {
	className?: string;
	toggled: boolean;
	onClick(): void;
}
const NavToggle: React.FC<INavToggleProps> = props => {
	const { onClick, toggled, className } = props;
	return (
		<span
			onClick={onClick}
			className={classNames(
				'nav_toggle',
				IS_THEMED && THEMED_SIDEBAR_CLASSNAMES.textColor,
				IS_THEMED && THEMED_SIDEBAR_CLASSNAMES.hoverNavToggle,
				className
			)}
		>
			{toggled ? <HiOutlineMenu /> : <HiOutlineMenuAlt2 />}
		</span>
	);
};

export default NavToggle;
