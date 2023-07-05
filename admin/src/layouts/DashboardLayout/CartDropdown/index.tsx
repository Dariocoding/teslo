import * as React from "react";
import { Popover, Transition } from "@headlessui/react";
import CartPanel from "./CartPanel";
import { useCartStore } from "@/store";
import RenderIf from "@teslo/react-ui/RenderIf";
import classNames from "classnames";
import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { validPaths } from "@/utils";

interface ICartDropdownProps {}

const CartDropdown: React.FunctionComponent<ICartDropdownProps> = props => {
	const {} = props;
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
							"group w-8 h-8 hover:bg-slate-10 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative",
							open && "text-opacity-90"
						)}
					>
						<RenderIf isTrue={totalProducts <= 99 && cart.length}>
							<span className="w-[1.10rem] h-[1.10rem] flex items-center justify-center bg-blue-500 absolute -top-1 -right-1 rounded-full text-[11px] leading-none text-white font-medium">
								<span className="mt-[1px]" suppressHydrationWarning>
									{totalProducts}
								</span>
							</span>
						</RenderIf>

						<HiShoppingCart className="w-5 h-5" />

						<Link
							className="block md:hidden absolute inset-0"
							to={validPaths.newOrder.path}
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
