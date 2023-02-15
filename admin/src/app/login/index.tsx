import AuthLayout from '@/layouts/AuthLayout';
import * as React from 'react';
import SignInForm from './SignInForm';

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = props => {
	return (
		<AuthLayout>
			<div className="mb-4">
				<h6 className="text-center">Welcome back!</h6>
			</div>
			<SignInForm />
		</AuthLayout>
	);
};

export default LoginPage;
