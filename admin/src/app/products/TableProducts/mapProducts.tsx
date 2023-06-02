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
				className={'w-14 rounded-md mx-auto'}
				loading={'lazy'}
			/>
		),
		dateFormatted: dayjs(product.dateCreated).format('DD/MM/YYYY'),
		gender: capitalize(product.gender) as Gender,
		actions: (
			<ActionsProducts
				onDeleteProduct={onDeleteProduct}
				onUpdateProduct={onUpdateProduct}
				product={product}
			/>
		),
		categoriesFormatted: product.categories?.length ? (
			<ul className="text-xs">
				{product.categories.map(c => (
					<li key={c.idcategory}>{c.title}</li>
				))}
			</ul>
		) : null,
		providersFormatted: product.providers?.length ? (
			<ul className="text-xs">
				{product.providers.map(p => (
					<li key={p.idprovider}>{p.name}</li>
				))}
			</ul>
		) : null,
		titleFormatted: (
			<div className="flex flex-col max-w-[110px] whitespace-pre-wrap">
				<div className="text-sm mb-1">{product.title}</div>
				<div className="text-xs">{product.code}</div>
			</div>
		),
	}));
};

export default mapProducts;
