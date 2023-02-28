'use client';
import { Product, Size } from '@teslo/interfaces';
import { icons, PF } from '@/utils';
import * as React from 'react';
import NcInputNumber from '@/shared/NcImputNumber';
import { useNotificationAddToCart } from '@/utils/hooks/useNotificationAddToCart';

interface IButtonsProductProps {
	product: Product;
	sizeSelected: Size;
}

const ButtonsProduct: React.FunctionComponent<IButtonsProductProps> = props => {
	const { product, sizeSelected } = props;
	const addCart = useNotificationAddToCart();
	const [qualitySelected, setQualitySelected] = React.useState(1);

	React.useEffect(() => {
		setQualitySelected(1);
	}, [sizeSelected]);

	return (
		<div className="flex space-x-3.5">
			<div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
				<NcInputNumber
					defaultValue={qualitySelected}
					onChange={setQualitySelected}
				/>
			</div>
			<button
				className="btn btn-dark btn-sm flex-1 flex-shrink-0"
				onClick={() =>
					addCart(
						{ ...product },
						{
							size: sizeSelected,
							image:
								product.images[0] &&
								PF.product(product.images[0]),
							qty: qualitySelected,
						}
					)
				}
			>
				<icons.Bag className="hidden sm:inline-block w-5 h-5 mb-0.5" />
				<span className="ml-3">Add to cart</span>
			</button>
		</div>
	);
};

export default ButtonsProduct;
