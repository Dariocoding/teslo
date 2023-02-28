import { useNotificationAddToCart } from '@/utils/hooks/useNotificationAddToCart';
import { notifyAddTocart } from '@/utils/NotifyAddToCart';
import { Product } from '@teslo/interfaces';
import * as React from 'react';

interface ISizeListProps {
	product: Product;
	image: string;
}

const SizeList: React.FunctionComponent<ISizeListProps> = props => {
	const { product, image } = props;
	const { sizes } = product;
	const notifyAddTocart = useNotificationAddToCart();
	return (
		<div className="absolute bottom-0 inset-x-1 space-x-1.5 flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
			{sizes.map((size, index) => {
				return (
					<div
						key={index}
						className="w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
						onClick={() =>
							notifyAddTocart(
								{ ...product },
								{ size, qty: 1, image }
							)
						}
					>
						{size}
					</div>
				);
			})}
		</div>
	);
};

export default SizeList;
