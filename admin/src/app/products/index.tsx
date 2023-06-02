import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import * as React from 'react';
import { useFetchProducts } from './hooks/useFetchProducts';
import TableProducts from './TableProducts';
import { validPaths } from '@/utils';
import { FaBoxes } from 'react-icons/fa';
import { useFetchCategories } from '../categories/hooks/useFetchCategories';
import { useFetchProviders } from '../providers/hooks/useFetchProviders';
import { useFetchBrands } from '../brands/hooks/useFetchBrands';

interface IProductsPageProps {}

const ProductsPage: React.FunctionComponent<IProductsPageProps> = props => {
	const {} = props;
	const { data: products, setData, isFetching, refetch } = useFetchProducts();
	const { data: categories, isFetching: isFetchingCategories } = useFetchCategories();
	const { data: providers, isFetching: isFetchingProviders } = useFetchProviders();
	const { data: brands, isFetching: isFetchingBrands } = useFetchBrands();
	return (
		<HeaderDashboard
			to={validPaths.home.path}
			icon={<FaBoxes />}
			title={'Products'}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.home.path },
				{ label: 'Products' },
			]}
		>
			<div className="tile">
				<TableProducts
					products={products}
					setProducts={setData}
					isFetching={isFetching}
					refetch={refetch}
					providers={providers}
					categories={categories}
					brands={brands}
					loadingBrands={isFetchingBrands}
					loadingCategories={isFetchingCategories}
					loadingProviders={isFetchingProviders}
				/>
			</div>
		</HeaderDashboard>
	);
};

export default React.memo(ProductsPage);
