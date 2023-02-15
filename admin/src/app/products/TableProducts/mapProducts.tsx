import { capitalize, formatter, PF } from '@/utils';
import { Gender, Product } from '@teslo/interfaces';
import dayjs from 'dayjs';
import { ProductTable } from '../config';
import ActionsProducts from './ActionsProducts';

interface IMapProductsProps {
	products: Product[];
	onDeleteProduct: (product: Product) => void;
	onUpdateProduct: (product: Product) => void;
}

const mapProducts = (props: IMapProductsProps): ProductTable[] => {
	const { products, onDeleteProduct, onUpdateProduct } = props;
	return products.map(product => ({
		...product,
		priceFormatted: formatter.format(product.price),
		sizesFormatted: product.sizes.join(', '),
		image: (
			<img
				src={
					product.images.length
						? PF +
						  '/product/' +
						  product.images[product.images.length - 1]
						: '/img/others/box.png'
				}
				className={'w-24 mx-auto'}
				loading={'lazy'}
			/>
		),
		dateFormatted: dayjs(product.dateCreated).format('DD/MM/YYYY HH:mm:ss'),
		gender: capitalize(product.gender) as Gender,
		actions: (
			<ActionsProducts
				onDeleteProduct={onDeleteProduct}
				onUpdateProduct={onUpdateProduct}
				product={product}
			/>
		),
	}));
};

export default mapProducts;
