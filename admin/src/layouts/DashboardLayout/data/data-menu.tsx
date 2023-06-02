import { validPaths } from '@/utils';
import { ValidRol, ValidRoles } from '@teslo/interfaces';
import React from 'react';
import {
	FaBoxes,
	FaHome,
	FaUsers,
	FaStore,
	FaCogs,
	FaPeopleCarry,
	FaFileInvoiceDollar,
} from 'react-icons/fa';
import VerticalMenuIcon, { IVerticalMenuIconProps } from '../VerticalMenuContent/VerticalMenuIcon';
import { RiBillFill } from 'react-icons/ri';

export interface IMenuItem {
	title: string;
	path?: string;
	pathTreeView?: string;
	Icon: React.FunctionComponent<IVerticalMenuIconProps>;
	permissions: ValidRol[] | '*';
	subNav?: Array<{ title: string; path: string }>;
}

const MenuItems: IMenuItem[] = [
	{
		title: 'Dashboard',
		path: validPaths.dashboard.path,
		Icon: props => (
			<VerticalMenuIcon {...props}>
				<FaHome />
			</VerticalMenuIcon>
		),
		permissions: '*',
	},
	{
		title: 'Users',
		Icon: props => (
			<VerticalMenuIcon {...props}>
				<FaUsers />
			</VerticalMenuIcon>
		),
		permissions: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
		path: validPaths.users.path,
	},

	{
		title: 'Products',
		Icon: props => (
			<VerticalMenuIcon {...props}>
				<FaBoxes />
			</VerticalMenuIcon>
		),
		permissions: '*',
		subNav: [
			{ title: 'Products', path: validPaths.products.path },
			{ title: 'Categories', path: validPaths.categories.path },
			{ title: 'Brands', path: validPaths.brands.path },
		],
	},

	{
		title: 'Providers',
		Icon: props => (
			<VerticalMenuIcon {...props}>
				<FaPeopleCarry />
			</VerticalMenuIcon>
		),
		permissions: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
		path: validPaths.providers.path,
	},

	{
		title: 'Orders',
		Icon: props => (
			<VerticalMenuIcon {...props}>
				<FaStore />
			</VerticalMenuIcon>
		),
		permissions: '*',
		subNav: [
			{ title: 'Orders', path: validPaths.orders.path },
			{ title: 'New Order', path: validPaths.newOrder.path },
		],
	},

	{
		title: 'Bills',
		Icon: props => (
			<VerticalMenuIcon {...props}>
				<FaFileInvoiceDollar />
			</VerticalMenuIcon>
		),
		permissions: '*',
		subNav: [
			{ title: 'Bills', path: validPaths.bills.path },
			{ title: 'New Bill', path: validPaths.newBill.path },
		],
	},

	{
		title: 'Settings',
		Icon: props => (
			<VerticalMenuIcon {...props}>
				<FaCogs />
			</VerticalMenuIcon>
		),
		permissions: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
		path: validPaths.settings.path,
	},
];

export default MenuItems;
