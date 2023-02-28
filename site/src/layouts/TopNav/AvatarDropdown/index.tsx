'use client';
import { Popover, Transition } from '@headlessui/react';
import * as React from 'react';
import { icons } from '@/utils';
import AvatarPanel from './AvatarPanel';
import Link from 'next/link';

interface IAvatarDropdownProps {}

const AvatarDropdown: React.FunctionComponent<IAvatarDropdownProps> = props => {
	const {} = props;
	return (
		<React.Fragment>
			<div className="md:block hidden">
				<Popover className="relative">
					{({ close }) => (
						<>
							<Popover.Button
								className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
							>
								<icons.UserAvatar className="w-6 h-6" />
							</Popover.Button>
							<Transition
								as={React.Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<AvatarPanel close={close} />
							</Transition>
						</>
					)}
				</Popover>
			</div>
			<div className="md:hidden block">
				<span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center">
					<Link href={'/account'}>
						<icons.UserAvatar className="w-6 h-6" />
					</Link>
				</span>
			</div>
		</React.Fragment>
	);
};

export default AvatarDropdown;
