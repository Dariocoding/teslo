'use client';
import * as React from 'react';
import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { icons } from '@/utils';
import CartPanel from './CartPanel';
import { useCartStore } from '@/store';
import RenderIf from '@teslo/react-ui/RenderIf';
import classNames from 'classnames';
import useIsCSR from '@/utils/hooks/useIsCSR';

interface ICartDropdownProps {}

const CartDropdown: React.FunctionComponent<ICartDropdownProps> = props => {
	const {} = props;
	const isCSR = useIsCSR();
	const { cart } = useCartStore();

	const totalProducts = cart.reduce((total, curr) => {
		return total + curr.qty;
	}, 0);

	return (
		<Popover className="relative">
			{({ open, close }) => (
				<>
					<Popover.Button
						className={classNames(
							'group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative',
							open && 'text-opacity-90'
						)}
					>
						<RenderIf
							isTrue={
								totalProducts <= 99 &&
								cart.length &&
								isCSR
							}
						>
							<span className="w-[1.10rem] h-[1.10rem] flex items-center justify-center bg-blue-500 absolute top-1 right-1 rounded-full text-[11px] leading-none text-white font-medium">
								<span
									className="mt-[1px]"
									suppressHydrationWarning
								>
									{totalProducts}
								</span>
							</span>
						</RenderIf>

						<icons.CartShop className="w-6 h-6" />

						<Link
							className="block md:hidden absolute inset-0"
							href={'/cart'}
						/>
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
						<CartPanel close={close} />
					</Transition>
				</>
			)}
		</Popover>
	);
};

export default CartDropdown;
