import { ValidRol, ValidRoles } from '@teslo/interfaces';
import React from 'react';

export const APP_NAME = 'Teslo';
export const APP_PHONE = '042105012';
export const APP_EMAIL = 'teslo@teslo.com';
export const DAY_DURATION = 86400000;
export const API_URL = import.meta.env.VITE_API_URL;
export const PF = import.meta.env.VITE_API_URL + 'files';

export const breakpoints = {
	mobile: 0,
	sm: 640,
	md: 748,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
};

export const formatter = new Intl.NumberFormat('en', {
	maximumFractionDigits: 2,
	minimumFractionDigits: 0,
	style: 'currency',
	currency: 'USD',
});

export interface PageProps {
	path: string;
	authoritys: ValidRol[] | '*';
	component: React.LazyExoticComponent<React.FunctionComponent<any>>;
	fnPath?(query: string | number): string;
}

export const protectedRoutes = {
	dashboard: {
		path: '/dashboard',
		component: React.lazy(() => import('@/app/dashboard')),
		authoritys: '*',
	} as PageProps,
	users: {
		path: '/users',
		component: React.lazy(() => import('@/app/users')),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
	viewUser: {
		path: '/users/:id',
		component: React.lazy(() => import('@/app/users/ViewUser')),
		fnPath: (id: string) => `/users/${id}`,
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
	products: {
		path: '/products',
		component: React.lazy(() => import('@/app/products')),
		authoritys: '*',
	} as PageProps,
	viewProduct: {
		path: '/products/:id',
		component: React.lazy(() => import('@/app/products/ViewProduct')),
		fnPath: (query: string) => `/products/${query}`,
		authoritys: '*',
	} as PageProps,
	categories: {
		path: '/categories',
		component: React.lazy(() => import('@/app/categories')),
		authoritys: '*',
	} as PageProps,
	viewCategory: {
		fnPath: (query: string | number) => `/categories/${query}`,
		path: '/categories/:id',
		component: React.lazy(() => import('@/app/categories/ViewCategory')),
		authoritys: '*',
	} as PageProps,
	profile: {
		path: '/profile',
		component: React.lazy(() => import('@/app/profile')),
		authoritys: '*',
	} as PageProps,
	orders: {
		path: '/orders',
		component: React.lazy(() => import('@/app/orders')),
		authoritys: '*',
	} as PageProps,
	invoiceOrder: {
		path: '/orders/:id',
		component: React.lazy(() => import('@/app/orders/Invoice')),
		authoritys: '*',
		fnPath: id => `/orders/${id}`,
	} as PageProps,
	settings: {
		path: '/settings',
		component: React.lazy(() => import('@/app/config')),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
	paymentMethods: {
		path: '/settings/payment-methods',
		component: React.lazy(() => import('@/app/config/PaymenMethods')),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
};

export const publicRoutes = {
	home: {
		path: '/',
		component: React.lazy(() => import('@/app/login')),
		authoritys: '*',
	} as PageProps,
	recoverPassword: {
		path: '/recover/password/:token/:email',
		component: React.lazy(() => import('@/app/recover/password')),
		authoritys: '*',
	} as PageProps,
};

export const validPaths = {
	...protectedRoutes,
	...publicRoutes,
};

export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
