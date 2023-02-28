'use client';
import { useAuthStore } from '@/store';
import * as React from 'react';
import FormUserAccount from './FormUserAccount';
import AccountLayout from '@/layouts/Account';
import AccountProfileImage from '@/layouts/Account/AccountProfileImage';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { MdOutlineAccountTree } from 'react-icons/md';

const AccountPage: React.FunctionComponent = props => {
	const {} = props;
	const { user } = useAuthStore();
	return (
		<AccountLayout>
			<div className="space-y-10 sm:space-y-12">
				<h2 className="text-2xl sm:text-3xl font-semibold flex items-center">
					Account infomation <MdOutlineAccountTree className="ml-2" />
				</h2>
				<div className="flex flex-col md:flex-row">
					<AccountProfileImage />
					<div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
						<FormUserAccount user={user} />
					</div>
				</div>
			</div>
		</AccountLayout>
	);
};

export default AccountPage;
