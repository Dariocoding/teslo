import Prices from "@/components/ui/Prices";
import { Cart, useCartStore } from "@/store";
import { PF, imageProduct, validPaths } from "@/utils";
import * as React from "react";
import { Link } from "react-router-dom";

interface IRenderCartProps {
	close(): void;
	cart: Cart;
}

const RenderCart: React.FunctionComponent<IRenderCartProps> = props => {
	const { close, cart } = props;
	const { removeCart } = useCartStore();
	const { size, qty, product } = cart;
	const { title, slug, price } = product;

	return (
		<div className="flex py-5 last:pb-0">
			<div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
				<img
					src={imageProduct(product)}
					alt={title}
					className="h-full w-full object-contain object-center"
				/>
				<Link
					onClick={close}
					className="absolute inset-0"
					to={validPaths.viewProduct.fnPath(slug)}
				/>
			</div>

			<div className="ml-4 flex flex-1 flex-col">
				<div>
					<div className="flex justify-between ">
						<div>
							<h3 className="text-base font-medium text-black">
								<Link onClick={close} to={validPaths.viewProduct.fnPath(slug)}>
									{title}
								</Link>
							</h3>
							<p className="mt-1 text-sm text-slate-500">
								<span>{size}</span>
							</p>
						</div>
						<Prices price={price * qty} className="mt-0.5" />
					</div>
				</div>
				<div className="flex flex-1 items-end justify-between text-sm">
					<p className="text-gray-500">Qty {qty}</p>

					<div className="flex">
						<button
							type="button"
							className="font-medium transition hover:text-red-500 text-black"
							onClick={() => removeCart(cart, { size, qty: 1 })}
						>
							Remove
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RenderCart;
