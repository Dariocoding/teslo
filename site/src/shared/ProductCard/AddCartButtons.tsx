import { useNotificationAddToCart } from '@/utils/hooks/useNotificationAddToCart';
import { Product } from '@teslo/interfaces';
import RenderIf from '@teslo/react-ui/RenderIf';
import * as React from 'react';
import { icons } from '@/utils';
import { useSelectFavoriteProduct } from './hooks/useSelectFavoriteProduct';
import useIsCSR from '@/utils/hooks/useIsCSR';

interface IAddCartButtonsProps {
	product: Product;
	image: string;
}

const AddCartButtons: React.FunctionComponent<IAddCartButtonsProps> = props => {
	const { product, image } = props;
	const { sizes } = product;
	const notifyAddTocart = useNotificationAddToCart();
	const isCSR = useIsCSR();
	const { onClick: addWishList, isLiked } = useSelectFavoriteProduct(product);
	return (
		<div className="absolute bottom-0 inset-x-1 space-x-1.5 flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
			<RenderIf isTrue={sizes.length}>
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
			</RenderIf>

			<RenderIf isTrue={!sizes.length}>
				<div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
					<button
						className="shadow-lg btn btn-warning btn-xs"
						onClick={addWishList}
					>
						<icons.Heart className="w-3.5 h-3.5 mb-0.5" />
						<span className="ml-1">
							{isLiked && isCSR
								? 'Remove Wishlist'
								: 'Add to Wishlist'}
						</span>
					</button>
					<button
						className="shadow-lg btn btn-primary btn-xs"
						onClick={() =>
							notifyAddTocart(
								{ ...product },
								{ size: null, qty: 1, image }
							)
						}
					>
						<icons.Bag className="w-3.5 h-3.5 mb-0.5" />
						<span className="ml-1">Add to bag</span>
					</button>
				</div>
			</RenderIf>
		</div>
	);
};

export default AddCartButtons;
