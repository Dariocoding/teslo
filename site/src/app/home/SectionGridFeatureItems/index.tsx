'use client';
import React from 'react';
import { Category, Product } from '@teslo/interfaces';
import HeaderFilterSection from './HeaderFilterSection';
import { Spinner } from '@teslo/react-ui';
import { INITIAL_VALUES_PRODUCT_HOME } from '@/utils';
import { productsService } from '@teslo/services';
import RenderIf from '@teslo/react-ui/RenderIf';
import ProductCard from '@/shared/ProductCard';

interface SectionGridFeatureItemsProps {
	data?: Product[];
	categories: Category[];
}

const searchQty = INITIAL_VALUES_PRODUCT_HOME;

const SectionGridFeatureItems: React.FC<SectionGridFeatureItemsProps> = props => {
	const { data: initalData = [], categories } = props;
	const [data, setData] = React.useState(initalData);
	const [loading, setIsLoading] = React.useState(false);
	const [page, setPage] = React.useState(0);
	const [notMoreProducts, setNotMoreProduct] = React.useState(false);

	async function search() {
		try {
			setIsLoading(true);
			const products = await productsService.getProducts({
				limit: searchQty,
				offset: (page + 1) * searchQty,
			});
			if (!products.data.length) {
				setNotMoreProduct(true);
				setIsLoading(false);
				return;
			}
			setData([...data, ...products.data]);
			setPage(page + 1);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="relative">
			<HeaderFilterSection categories={categories} />
			<div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}>
				{data.map((item, index) => (
					<ProductCard data={item} key={index} />
				))}
			</div>
			<RenderIf isTrue={!notMoreProducts}>
				<div className="flex mt-16 justify-center items-center">
					<button
						className="btn btn-dark rounded-2xl"
						onClick={search}
					>
						{loading ? <Spinner /> : 'Show me more'}
					</button>
				</div>
			</RenderIf>
		</div>
	);
};

export default SectionGridFeatureItems;
