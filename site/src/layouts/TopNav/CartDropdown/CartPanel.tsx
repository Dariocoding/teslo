import * as React from 'react';
import { Popover } from '@headlessui/react';
import RenderCart from './RenderCart';
import Link from 'next/link';
import { useCartStore } from '@/store';
import Prices from '@/shared/Prices';
import { formatter } from '@/utils';

interface ICartPanelProps {
	close(): void;
}

type Ref = React.ForwardedRef<any>;

const CartPanel: React.FunctionComponent<ICartPanelProps> = React.forwardRef((props, ref: Ref) => {
	const { close } = props;
	const { cart, clean } = useCartStore();

	const subtotal = cart.reduce((acc, cart) => {
		return acc + cart.qty * cart.price;
	}, 0);

	return (
		<Popover.Panel
			ref={ref}
			className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0"
		>
			<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
				<div className="relative bg-white dark:bg-neutral-800">
					<div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
						<h3 className="text-xl font-semibold">
							Shopping cart
						</h3>
						<div className="divide-y divide-slate-100 dark:divide-slate-700">
							{cart.map(cart => (
								<RenderCart
									key={
										cart.id +
										' - ' +
										cart.size
									}
									close={close}
									cart={cart}
								/>
							))}
						</div>
					</div>
					<div className="bg-neutral-50 dark:bg-slate-900 p-5">
						<p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
							<span>
								<span>Subtotal</span>
								<span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
									Shipping and taxes
									calculated at checkout.
								</span>
							</span>
							<span className="">
								{formatter.format(subtotal)}
							</span>
						</p>
						<div className="flex space-x-2 mt-5">
							<button
								onClick={clean}
								className="btn btn-alternative btn-sm flex-1"
							>
								Clean
							</button>
							<Link
								href={'/cart'}
								className="btn btn-primary btn-sm flex-1"
							>
								View cart
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Popover.Panel>
	);
});

export default CartPanel;
