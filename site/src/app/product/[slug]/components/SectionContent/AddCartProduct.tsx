'use client';

import { Product, ValidSizes } from '@teslo/interfaces';
import * as React from 'react';
import ButtonsProduct from './ButtonsProduct';
import SizeList from './SizeList';

interface IAddCartProductProps {
	product: Product;
}

const AddCartProduct: React.FunctionComponent<IAddCartProductProps> = props => {
	const { product } = props;
	const [sizeSelected, setSizeSelected] = React.useState(product.sizes[0]);
	return (
		<React.Fragment>
			<div className="">
				<SizeList
					product={product}
					sizeSelected={sizeSelected}
					setSizeSelected={setSizeSelected}
				/>
			</div>
			<ButtonsProduct product={product} sizeSelected={sizeSelected} />
		</React.Fragment>
	);
};

export default AddCartProduct;
