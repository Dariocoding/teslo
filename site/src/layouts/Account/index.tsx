'use client';
import PrivateRoute from '@/shared/routes/PrivateRoute';
import { useAuthStore } from '@/store';
import { viewPaths } from '@/utils';
import RenderIf from '@teslo/react-ui/RenderIf';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

interface IAccountLayoutProps {
	children?: React.ReactNode;
}

const accountPages = [
	{
		name: 'Account info',
		link: viewPaths.account,
	},
	{
		name: 'Save lists',
		link: viewPaths.savelist,
	},
	{
		name: 'Change password',
		link: viewPaths.account_change_password,
	},
	{
		name: 'Orders',
		link: viewPaths.orders,
	},
];

const AccountLayout: React.FunctionComponent<IAccountLayoutProps> = props => {
	const {} = props;
	const pathname = usePathname();
	const { user } = useAuthStore();

	const page = accountPages.find(route => route.link === pathname);

	return (
		<PrivateRoute>
			<div className="nc-CommonLayoutProps container">
				<div className="mt-14 sm:mt-20">
					<div className="max-w-4xl mx-auto">
						<div className="max-w-2xl">
							<h2 className="text-3xl xl:text-4xl font-semibold">
								{page.name}
							</h2>
							<RenderIf isTrue={page.link === '/account'}>
								<span className="block mt-4 text-neutral-500 text-base sm:text-lg">
									<span className="text-slate-900 font-semibold">
										{user.firstName}{' '}
										{user.lastName},
									</span>{' '}
									{user.email}
								</span>
							</RenderIf>
						</div>
						<hr className="mt-10 border-slate-200"></hr>

						<div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
							{accountPages.map((item, index) => (
								<Link
									key={index}
									href={item.link}
									className={classNames(
										'block py-5 md:py-8 border-b-2 border-transparent flex-shrink-0 text-slate-500 hover:text-slate-800 text-sm sm:text-base',
										pathname ===
											item.link &&
											'!border-primary-500 font-medium !text-slate-900'
									)}
								>
									{item.name}
								</Link>
							))}
						</div>
						<hr className="border-slate-200"></hr>
					</div>
				</div>
				<div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
					{props.children}
				</div>
			</div>
		</PrivateRoute>
	);
};

export default AccountLayout;
