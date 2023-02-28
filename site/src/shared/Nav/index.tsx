import classNames from 'classnames';
import React, { FC } from 'react';

export interface NavProps {
	containerClassName?: string;
	className?: string;
	children?: React.ReactNode;
}

const Nav: React.FunctionComponent<NavProps> = props => {
	const { containerClassName, className, children } = props;
	return (
		<nav className={containerClassName}>
			<ul className={classNames('flex', className)}>{children}</ul>
		</nav>
	);
};

export default Nav;
