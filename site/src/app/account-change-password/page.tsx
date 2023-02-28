import * as React from 'react';
import AccountLayout from '@/layouts/Account';
import FormChangePassword from './FormChangePassword';
import AccountProfileImage from '@/layouts/Account/AccountProfileImage';
import { BsShieldLock } from 'react-icons/bs';

const AccountChangePasswordPage: React.FunctionComponent = props => {
	const {} = props;
	return (
		<AccountLayout>
			<div className="space-y-10 sm:space-y-12">
				<h2 className="text-2xl sm:text-3xl font-semibold flex items-center">
					Security <BsShieldLock className="ml-2" />
				</h2>
				<div className="flex flex-col md:flex-row">
					<AccountProfileImage />
					<div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
						<FormChangePassword />
					</div>
				</div>
			</div>
		</AccountLayout>
	);
};

export default AccountChangePasswordPage;
