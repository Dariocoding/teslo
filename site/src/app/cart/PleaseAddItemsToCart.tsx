import { viewPaths } from '@/utils';
import Link from 'next/link';
import * as React from 'react';

interface IPleaseAddItemsToCartProps {}

const PleaseAddItemsToCart: React.FunctionComponent<IPleaseAddItemsToCartProps> = props => {
	const {} = props;
	return (
		<div className="container relative space-y-8 my-12 py-6">
			<img
				src={'/images/cart-shop.jpg'}
				alt={'Add Items to Cart Shop image'}
				className={'w-96 mx-auto rounded-xl'}
			/>
			<div className="flex items-center justify-center space-y-4 flex-col">
				<h6>
					There are no products in the cart, please start adding
					products
				</h6>
				<Link href={viewPaths.home} className="btn btn-primary btn-sm px-8">
					Shop
				</Link>
			</div>
		</div>
	);
};

export default PleaseAddItemsToCart;
