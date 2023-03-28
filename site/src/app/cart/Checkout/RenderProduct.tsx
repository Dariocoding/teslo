import NcInputNumber from '@/shared/NcImputNumber';
import Prices from '@/shared/Prices';
import { Cart, useCartStore } from '@/store';
import { viewPaths } from '@/utils';
import Link from 'next/link';
import * as React from 'react';
import { icons } from '@/utils';
import Decimal from 'decimal.js-light';

interface IRenderProductProps {
	product: Cart;
}

const RenderProduct: React.FunctionComponent<IRenderProductProps> = props => {
	const { product } = props;
	const { removeCartItem, addCart } = useCartStore();
	const { image, title, slug, price, size, qty } = product;
	return (
		<div className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0">
			<div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
				<img
					src={image}
					alt={title}
					className="h-full w-full object-contain object-center"
				/>
				<Link
					href={viewPaths.viewProduct(slug)}
					className="absolute inset-0"
				></Link>
			</div>

			<div className="ml-3 sm:ml-6 flex flex-1 flex-col">
				<div>
					<div className="flex justify-between flex-wrap">
						<div className="flex-[1.5] ">
							<h3 className="text-base font-semibold">
								<Link
									href={viewPaths.viewProduct(
										slug
									)}
								>
									{title}
								</Link>
							</h3>
							<div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
								<div className="flex items-center space-x-1.5">
									<icons.Resize className="w-4 h-4" />

									<span>{size}</span>
								</div>
							</div>
						</div>

						<div className="text-center relative sm:mx-2 mt-2 sm:mt-0 z-[1]">
							<NcInputNumber
								className="relative z-10"
								defaultValue={qty}
								onChange={() => {
									addCart(product, {
										size,
										qty: 1,
										image,
									});
								}}
							/>
						</div>

						<div className="justify-end inline mt-2 sm:mt-0">
							<Prices
								price={new Decimal(price)
									.mul(qty)
									.toNumber()}
								className="mt-0.5"
							/>
						</div>
					</div>
				</div>

				<div className="flex mt-auto pt-4 items-end justify-between text-sm">
					<button
						className="relative z-[1] flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm"
						onClick={() => removeCartItem(product)}
					>
						<span>Remove</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default RenderProduct;
