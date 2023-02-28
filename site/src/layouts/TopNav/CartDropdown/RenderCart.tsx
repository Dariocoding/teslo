import Prices from '@/shared/Prices';
import { Cart, useCartStore } from '@/store';
import { PF, viewPaths } from '@/utils';
import Link from 'next/link';
import * as React from 'react';

interface IRenderProductProps {
	close(): void;
	cart: Cart;
}

const RenderProduct: React.FunctionComponent<IRenderProductProps> = props => {
	const { close, cart } = props;
	const { removeCart } = useCartStore();
	const { images, title, size, price, qty } = cart;

	return (
		<div className="flex py-5 last:pb-0">
			<div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
				<img
					src={PF.product(images[0])}
					alt={title}
					className="h-full w-full object-contain object-center"
				/>
				<Link
					onClick={close}
					className="absolute inset-0"
					href={viewPaths.viewProduct(cart.slug)}
				/>
			</div>

			<div className="ml-4 flex flex-1 flex-col">
				<div>
					<div className="flex justify-between ">
						<div>
							<h3 className="text-base font-medium ">
								<Link
									onClick={close}
									href={viewPaths.viewProduct(
										cart.slug
									)}
								>
									{title}
								</Link>
							</h3>
							<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
								<span>{size}</span>
							</p>
						</div>
						<Prices price={price * qty} className="mt-0.5" />
					</div>
				</div>
				<div className="flex flex-1 items-end justify-between text-sm">
					<p className="text-gray-500 dark:text-slate-400">
						Qty {qty}
					</p>

					<div className="flex">
						<button
							type="button"
							className="font-medium transition hover:text-red-500"
							onClick={() =>
								removeCart(cart, { size, qty: 1 })
							}
						>
							Remove
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RenderProduct;
