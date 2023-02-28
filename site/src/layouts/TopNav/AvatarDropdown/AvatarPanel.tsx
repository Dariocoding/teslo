import * as React from 'react';
import { Popover } from '@headlessui/react';
import Link from 'next/link';
import { icons, viewPaths } from '@/utils';
import { useAuthStore } from '@/store';
import RenderIf from '@teslo/react-ui/RenderIf';

interface IAvatarPanelProps {
	close(): void;
}

type Ref = React.ForwardedRef<any>;

const AvatarPanel: React.FC<IAvatarPanelProps> = React.forwardRef((props, ref: Ref) => {
	const { close } = props;
	const { user, authenticated, logOut } = useAuthStore();

	return (
		<Popover.Panel
			className="absolute z-10 w-screen max-w-[260px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0"
			ref={ref}
		>
			<div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
				<div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
					<div className="flex items-center space-x-3">
						<icons.UserAvatar className="w-10 h-10 rounded-full border border-neutral-200 mr-2 p-1.5" />

						<div className="flex-grow">
							<h6 className="font-semibold">
								<RenderIf isTrue={authenticated}>
									{user.firstName}{' '}
									{user.lastName}
								</RenderIf>
								<RenderIf isTrue={!authenticated}>
									<span className="block leading-3">
										Bienvenido
									</span>
									<span>Usuario</span>
								</RenderIf>
							</h6>
						</div>
					</div>

					<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

					<RenderIf isTrue={authenticated}>
						<Link
							href={'/account'}
							className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
							onClick={() => close()}
						>
							<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
								<icons.UserAvatar className="w-6 h-6" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium ">
									My Account
								</p>
							</div>
						</Link>
					</RenderIf>

					<Link
						href={'/cart'}
						className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
						onClick={() => close()}
					>
						<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
							<icons.List className="w-6 h-6" />
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium ">
								My Order
							</p>
						</div>
					</Link>

					<Link
						href={'/account-savelists'}
						className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
						onClick={() => close()}
					>
						<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
							<icons.Heart className="w-6 h-6" />
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium ">
								Wishlist
							</p>
						</div>
					</Link>

					<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

					<Link
						href={'/#'}
						className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
						onClick={() => close()}
					>
						<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
							<icons.LifeJacket className="w-6 h-6" />
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium ">
								{'Help'}
							</p>
						</div>
					</Link>
					<RenderIf isTrue={authenticated}>
						<button
							type="button"
							className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
							onClick={() => {
								logOut();
							}}
						>
							<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
								<icons.LogOut className="w-6 h-6" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium ">
									Log out
								</p>
							</div>
						</button>
					</RenderIf>

					<RenderIf isTrue={!authenticated}>
						<Link
							href={viewPaths.login}
							className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
							onClick={() => {
								close();
							}}
						>
							<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
								<icons.LogIn className="w-6 h-6" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium ">
									Log In
								</p>
							</div>
						</Link>

						<Link
							href={viewPaths.signup}
							className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
							onClick={() => {
								close();
							}}
						>
							<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
								<icons.SignUp className="w-6 h-6" />
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium">
									Sign Up
								</p>
							</div>
						</Link>
					</RenderIf>
				</div>
			</div>
		</Popover.Panel>
	);
});

export default AvatarPanel;
