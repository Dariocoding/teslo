import twFocusClass from '@/utils/twFocusClass';
import classNames from 'classnames';
import React from 'react';

export interface NavItemProps {
	className?: string;
	radius?: string;
	onClick?: () => void;
	isActive?: boolean;
	renderX?: React.ReactNode;
	children?: React.ReactNode;
}

const NavItem: React.FunctionComponent<NavItemProps> = props => {
	const {
		className = 'px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize',
		radius = 'rounded-full',
		children,
		onClick = () => {},
		isActive = false,
		renderX,
	} = props;

	return (
		<li className="relative">
			{renderX}
			<button
				className={classNames(
					'block !leading-none font-medium whitespace-nowrap',
					className,
					radius,
					isActive
						? 'bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 '
						: 'text-slate-500 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-800 hover:bg-slate-100/75 dark:hover:bg-slate-800',
					twFocusClass()
				)}
				onClick={onClick}
			>
				{children}
			</button>
		</li>
	);
};

export default NavItem;
