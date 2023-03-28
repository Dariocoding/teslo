'use client';
import React from 'react';
import { Category, Gender, Product } from '@teslo/interfaces';
import HeaderFilterSection from './HeaderFilterSection';
import { Spinner } from '@teslo/react-ui';
import { filtersGenders, INITIAL_VALUES_PRODUCT_HOME } from '@/utils';
import { productsService } from '@teslo/services';
import RenderIf from '@teslo/react-ui/RenderIf';
import ProductCard from '@/shared/ProductCard';
import { useFilterProducts } from './hooks/useFiltersProduct';
import useIsCSR from '@/utils/hooks/useIsCSR';
import { toast } from 'react-hot-toast';

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
	const [changeFilters, setChangeFilters] = React.useState(false);
	const filters = useFilterProducts();
	const isCSR = useIsCSR();
	const { sizesState, tabActive, categoriesState, statusState } = filters;

	const search = React.useCallback(
		async (forcePage?: number) => {
			try {
				const toastID = toast.loading('Loading Products...');
				setIsLoading(true);
				const offset = (forcePage ?? page + 1) * searchQty;
				const products = await productsService.getProducts({
					limit: searchQty,
					offset,
					sizes: sizesState.length ? sizesState : null,
					categories: categoriesState.length
						? (categoriesState
								.map(c => c.idcategory)
								.join(',') as any)
						: null,
					gender:
						tabActive === filtersGenders[0]
							? null
							: (tabActive as Gender),
					status: statusState ? statusState : null,
				});
				toast.dismiss(toastID);

				if (!products.data.length && forcePage === undefined) {
					setNotMoreProduct(true);
					setIsLoading(false);
					toast.success('Thank you for viewing all products');
					return;
				}
				if (forcePage === 0) {
					setData(products.data);
				} else setData([...data, ...products.data]);

				setPage(page + 1);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		},
		[sizesState, tabActive, categoriesState, page, statusState]
	);

	React.useEffect(() => {
		if (!isCSR) return;
		setPage(0);
		setNotMoreProduct(false);
		setChangeFilters(true);
	}, [sizesState, tabActive, categoriesState, statusState]);

	React.useEffect(() => {
		if (changeFilters) {
			setChangeFilters(false);
			search(0);
		}
	}, [changeFilters]);

	return (
		<div className="relative">
			<HeaderFilterSection categories={categories} filters={filters} />
			<div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}>
				{data.map((item, index) => (
					<ProductCard data={item} key={index} />
				))}
			</div>
			<RenderIf isTrue={!data.length ? false : !notMoreProducts}>
				<div className="flex mt-16 justify-center items-center">
					<button
						className="btn btn-dark rounded-2xl"
						onClick={loading ? null : () => search()}
					>
						{loading ? <Spinner /> : 'Show me more'}
					</button>
				</div>
			</RenderIf>
		</div>
	);
};

export default SectionGridFeatureItems;
