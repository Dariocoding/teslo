import { SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from '@/utils';
import useResponsive from '@/utils/hooks/useResponsive';
import classNames from 'classnames';
import * as React from 'react';
import MenuItems from '../data/data-menu';
import { useDashboardStore } from '../store/dashboardStore';
import '../styles/_menu.css';
import VerticalMenuCollapsedItem from './VerticalMenuCollapsedItem';
import VerticalMenuSingleItem from './VerticalMenuSingleItem';
import { useConfigApp } from '@/store';

interface IVerticalMenuContentProps {}

const sideNavCollapseStyle = {
	width: SIDE_NAV_WIDTH,
	minWidth: SIDE_NAV_WIDTH,
};

const sideNavStyle = {
	width: SIDE_NAV_COLLAPSED_WIDTH,
	minWidth: SIDE_NAV_COLLAPSED_WIDTH,
};

const VerticalMenuContent: React.FC<IVerticalMenuContentProps> = props => {
	const { desktop } = useResponsive();
	const isCollapsed = useDashboardStore(state => state.isCollapsed);
	const { colors } = useConfigApp();
	return (
		<div
			className="px-4 pb-4 mt-8 flex flex-col md:fixed md:pt-16"
			style={desktop ? (isCollapsed ? sideNavCollapseStyle : sideNavStyle) : {}}
		>
			<span
				className={classNames(
					'font-bold select-none mb-2 ml-2',
					colors.isThemed
						? colors.textSubtitleSidebar
						: 'text-gray-500'
				)}
			>
				App
			</span>
			{MenuItems.map(menuItem =>
				!menuItem.subNav ? (
					<VerticalMenuSingleItem
						item={menuItem}
						key={menuItem.path}
					/>
				) : (
					<VerticalMenuCollapsedItem
						item={menuItem}
						key={menuItem.title}
					/>
				)
			)}
		</div>
	);
};

export default VerticalMenuContent;
/*
 */
