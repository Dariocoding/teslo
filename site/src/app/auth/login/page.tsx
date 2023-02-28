import AuthLayout from '@/layouts/Auth';
import PrivatePublicRoute from '@/shared/routes/PrivatePublicRoute';
import { viewPaths } from '@/utils';
import Link from 'next/link';
import * as React from 'react';
import FormLogin from './FormLogin';

const LogInPage: React.FunctionComponent = () => {
	return (
		<PrivatePublicRoute>
			<AuthLayout
				title={'Log In'}
				footer={
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						New user? {` `}
						<Link
							className="text-green-600"
							href={viewPaths.signup}
						>
							Create an account
						</Link>
					</span>
				}
			>
				<FormLogin />
			</AuthLayout>
		</PrivatePublicRoute>
	);
};

export default LogInPage;
