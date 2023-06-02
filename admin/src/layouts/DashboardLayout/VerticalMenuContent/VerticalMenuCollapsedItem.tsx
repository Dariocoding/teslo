import AuthorityCheck from '@/components/AuthorityCheck';
import classNames from 'classnames';
import * as React from 'react';
import { FaChevronDown, FaCircleNotch } from 'react-icons/fa';
import { IMenuItem } from '../data/data-menu';
import { Collapse } from 'react-collapse';
import { useDashboardStore } from '../store/dashboardStore';
import { Link } from 'react-router-dom';
import Dropdown from '@teslo/react-ui/Dropdown';
import DropdownItem from '@teslo/react-ui/Dropdown/DropdownItem';
import useResponsive from '@/utils/hooks/useResponsive';
import { useConfigApp } from '@/store';

interface IDefaultItemProps {
	item: IMenuItem;
}

const DefaultItem: React.FunctionComponent<IDefaultItemProps> = props => {
	const { item } = props;
	const isCollapsed = useDashboardStore(state => state.isCollapsed);
	const setExpanded = useDashboardStore(state => state.setExpanded);
	const expanded = useDashboardStore(state => state.expanded);
	const { desktop } = useResponsive();
	const isExpanded = expanded === item.title;
	const toggleExpand = () => setExpanded(isExpanded ? null : item.title);
	const { colors } = useConfigApp();
	return (
		<React.Fragment>
			<div
				className={classNames(
					'side-nav-item',
					colors.isThemed && desktop && colors.sidebarItemHover
				)}
				onClick={toggleExpand}
			>
				<span className="flex items-center">
					<item.Icon />
					{!isCollapsed ? null : item.title}
				</span>

				<FaChevronDown
					className={classNames(
						'text-xs transition',
						isExpanded && 'rotate-90'
					)}
				/>
			</div>
			<div
				className={classNames(
					'side-nav-item-collapsed-container',
					colors.isThemed &&
						desktop &&
						colors.sidebarDropdownCollapsedContainer,
					!isCollapsed && 'hidden'
				)}
			>
				<Collapse isOpened={isExpanded}>
					<div>
						{item.subNav.map(nav => (
							<Link
								to={nav.path}
								className={classNames(
									'side-nav-item-collapsed',
									colors.isThemed &&
										desktop &&
										colors.sidebarItemDropdown
								)}
								key={nav.path}
							>
								<FaCircleNotch className="mr-1.5 text-xs" />{' '}
								{nav.title}
							</Link>
						))}
					</div>
				</Collapse>
			</div>
		</React.Fragment>
	);
};

interface ICollapsedItemProps {
	item: IMenuItem;
}

const CollapsedItem: React.FunctionComponent<ICollapsedItemProps> = props => {
	const { item } = props;
	const { colors } = useConfigApp();
	return (
		<Dropdown
			placement="right"
			showOnHover
			displayButton={
				<span
					className={classNames(
						'px-3 py-2.5 flex items-center justify-center transition rounded-xl pr-8',
						!colors.isThemed
							? 'hover:bg-gray-200'
							: colors.sidebarItemHover
					)}
				>
					<item.Icon />
				</span>
			}
		>
			{item.subNav.map(subNavItem => (
				<DropdownItem
					className="flex items-center pr-12 hover:text-black whitespace-nowrap"
					key={subNavItem.title}
				>
					<FaCircleNotch className="mr-1 text-xs" />{' '}
					<Link to={subNavItem.path}>{subNavItem.title}</Link>
				</DropdownItem>
			))}
		</Dropdown>
	);
};

interface IVerticalMenuCollapsedItemProps {
	item: IMenuItem;
}

const VerticalMenuCollapsedItem: React.FC<IVerticalMenuCollapsedItemProps> = props => {
	const { item } = props;
	const isCollapsed = useDashboardStore(state => state.isCollapsed);

	return (
		<AuthorityCheck validRoles={item.permissions}>
			{!isCollapsed ? <CollapsedItem item={item} /> : <DefaultItem item={item} />}
		</AuthorityCheck>
	);
};

export default VerticalMenuCollapsedItem;
