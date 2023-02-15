import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '@/app/login';
import ProtectedRoute from './ProtectedRoute';
import { PageProps, protectedRoutes, validPaths, publicRoutes } from '@/utils';
import Loader from '../ui/Loader';
import AppRoute from './AppRoute';
import AuthorityCheck from '../AuthorityCheck';
import PublicProtectedRoute from './PublicProtectedRoute';

const DashboardLayout = React.lazy(() => import('@/layouts/DashboardLayout'));

interface IAppRouterProps {}

const AppRouter: React.FunctionComponent<IAppRouterProps> = props => {
	const {} = props;
	return (
		<React.Suspense fallback={<Loader loading={true} />}>
			<Routes>
				<Route element={<ProtectedRoute />}>
					{Object.keys(protectedRoutes).map((key, idx) => {
						const route: PageProps = protectedRoutes[key];
						return (
							<Route
								key={key + idx}
								path={route.path}
								element={
									<AuthorityCheck
										validRoles={
											route.authoritys
										}
									>
										<DashboardLayout>
											<AppRoute
												component={
													route.component
												}
											/>
										</DashboardLayout>
									</AuthorityCheck>
								}
							/>
						);
					})}

					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>

				<Route element={<PublicProtectedRoute />}>
					{Object.keys(publicRoutes).map((key, idx) => {
						const route: PageProps = publicRoutes[key];
						return (
							<Route
								key={key + idx}
								path={route.path}
								element={
									<AppRoute
										component={
											route.component
										}
									/>
								}
							/>
						);
					})}
				</Route>
			</Routes>
		</React.Suspense>
	);
};

export default AppRouter;
