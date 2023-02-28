import AuthLayout from '@/layouts/Auth';
import PrivatePublicRoute from '@/shared/routes/PrivatePublicRoute';
import { viewPaths } from '@/utils';
import Link from 'next/link';
import * as React from 'react';
import FormSignUp from './FormSignUp';

const SignUpPage: React.FunctionComponent = () => {
	return (
		<PrivatePublicRoute>
			<AuthLayout
				title={'Sign Up'}
				footer={
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						Already registered? {` `}
						<Link
							className="text-green-600"
							href={viewPaths.login}
						>
							Log In!
						</Link>
					</span>
				}
			>
				<FormSignUp />
			</AuthLayout>
		</PrivatePublicRoute>
	);
};

export default SignUpPage;
