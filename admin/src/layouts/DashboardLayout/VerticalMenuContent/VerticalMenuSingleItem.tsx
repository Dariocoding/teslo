import AuthorityCheck from '@/components/AuthorityCheck';
import RenderIf from '@teslo/react-ui/RenderIf';
import ToolTip from '@teslo/react-ui/Tooltip';
import { IS_THEMED, THEMED_SIDEBAR_CLASSNAMES } from '@/utils';
import useResponsive from '@/utils/hooks/useResponsive';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IMenuItem } from '../data/data-menu';
import { useDashboardStore } from '../store/dashboardStore';

interface ICollpasedItemProps {
	title: string;
	children?: React.ReactNode;
}

const CollpasedItem: React.FunctionComponent<ICollpasedItemProps> = props => {
	const { title, children } = props;
	return (
		<ToolTip placement="right" message={title}>
			{children}
		</ToolTip>
	);
};

interface IDefaultItemProps {
	item: IMenuItem;
}

const DefaultItem: React.FunctionComponent<IDefaultItemProps> = props => {
	const { item } = props;
	const { isCollapsed } = useDashboardStore();
	const { desktop } = useResponsive();
	return (
		<Link
			to={item.path}
			className={classNames(
				'side-nav-item justify-start',
				IS_THEMED && desktop && THEMED_SIDEBAR_CLASSNAMES.sidebarItemHover
			)}
		>
			<item.Icon /> {isCollapsed ? item.title : null}
		</Link>
	);
};

interface IVerticalMenuSingleItemProps {
	item: IMenuItem;
}

const VerticalMenuSingleItem: React.FunctionComponent<IVerticalMenuSingleItemProps> = props => {
	const { item } = props;
	const { isCollapsed } = useDashboardStore();

	return (
		<AuthorityCheck validRoles={item.permissions}>
			<RenderIf isTrue={!isCollapsed}>
				<CollpasedItem title={item.title}>
					<DefaultItem item={item} />
				</CollpasedItem>
			</RenderIf>
			<RenderIf isTrue={isCollapsed}>
				<DefaultItem item={item} />
			</RenderIf>
		</AuthorityCheck>
	);
};

export default VerticalMenuSingleItem;
