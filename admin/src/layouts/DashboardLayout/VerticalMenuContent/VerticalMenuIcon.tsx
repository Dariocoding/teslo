import classNames from 'classnames';
import React from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export interface IVerticalMenuIconProps {
	children?: React.ReactNode;
	gutter?: boolean;
}

const VerticalMenuIcon: React.FunctionComponent<IVerticalMenuIconProps> = props => {
	const { gutter, children } = props;
	const isCollapsed = useDashboardStore(state => state.isCollapsed);
	return (
		<span
			className={classNames(
				isCollapsed ? 'text-sm' : 'text-xl',
				gutter && 'mr-1.5'
			)}
		>
			{children}
		</span>
	);
};

VerticalMenuIcon.defaultProps = {
	gutter: true,
};

export default VerticalMenuIcon;
