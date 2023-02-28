import { toast } from 'react-hot-toast';
import { Transition } from '@headlessui/react';
import { Product } from '@teslo/interfaces';
import Prices from '@/shared/Prices';
import { icons } from '@/utils';

export type ProductNotify = Product & { size: string; image: string; qty: number };

export const notifyAddTocart = (product: ProductNotify) => {
	const { title, image, size, price, qty } = product;
	const idtoast = toast.custom(
		t => (
			<Transition
				appear
				show={t.visible}
				className="p-4 max-w-md relative w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
				enter="transition-all duration-150"
				enterFrom="opacity-0 translate-x-20"
				enterTo="opacity-100 translate-x-0"
				leave="transition-all duration-150"
				leaveFrom="opacity-100 translate-x-0"
				leaveTo="opacity-0 translate-x-20"
			>
				<p className="block text-base font-semibold leading-none">
					Added to cart!
				</p>
				<span
					className="absolute top-4 right-4 text-black cursor-pointer"
					onClick={() => toast.remove(idtoast)}
				>
					<icons.Xclear className="w-4 h-4" />
				</span>

				<div className="border-t border-slate-200 dark:border-slate-700 my-4" />
				<div className="flex ">
					<div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
						<img
							src={image}
							alt={title}
							className="h-full w-full object-cover object-center"
						/>
					</div>

					<div className="ml-4 flex flex-1 flex-col">
						<div>
							<div className="flex justify-between ">
								<div>
									<h3 className="text-base font-medium ">
										{title}
									</h3>
									<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
										<span>{size}</span>
									</p>
								</div>
								<Prices
									price={price}
									className="mt-0.5"
								/>
							</div>
						</div>
						<div className="flex flex-1 items-end justify-between text-sm">
							<p className="text-gray-500 dark:text-slate-400">
								Qty {qty}
							</p>

							<div className="flex">
								<button
									type="button"
									className="font-medium text-primary-6000 dark:text-primary-500 "
									onClick={e => {
										e.preventDefault();
									}}
								>
									View cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		),
		{ position: 'bottom-right', id: 'nc-product-notify', duration: 3000 }
	);
};
