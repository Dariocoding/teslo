'use client';
import { Popover, Transition } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { Fragment } from 'react';

import PanelCategories from './PanelCategories';

export default function DropdownCategories() {
	return (
		<div className="DropdownCategories">
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<Popover.Button
							className={`${open ? '' : 'text-opacity-90'}
                group py-2 h-10 sm:h-12 flex items-center rounded-md text-sm sm:text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0 `}
						>
							<span>Shops</span>
							<HiOutlineChevronDown
								className={`${
									open
										? '-rotate-180'
										: 'text-opacity-70 '
								}
                  ml-2 h-5 w-5 text-neutral-700 group-hover:text-opacity-80 transition ease-in-out duration-150 `}
								aria-hidden="true"
							/>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PanelCategories close={close} />
						</Transition>
					</>
				)}
			</Popover>
		</div>
	);
}
