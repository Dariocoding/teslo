import { PageProps } from '@/utils';
import { ValidRoles } from '@teslo/interfaces';
import React from 'react';

export const providerPages = {
	providers: {
		path: '/providers',
		component: React.memo(React.lazy(() => import('@/app/providers'))),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
	viewProvider: {
		path: '/providers/:id',
		component: React.memo(React.lazy(() => import('@/app/providers/ViewProvider'))),
		fnPath: (query: string | number) => `/providers/${query}`,
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
};
