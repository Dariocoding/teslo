import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { validPaths } from '@/utils';
import * as React from 'react';
import { FaPlus } from 'react-icons/fa';
import FormProduct from '../forms/FormProduct';
import { useFetchCategories } from '@/app/categories/hooks/useFetchCategories';
import { useFetchBrands } from '@/app/brands/hooks/useFetchBrands';
import TileFormProduct from '../shared/TileFormProduct';
import { Product, ProductDto } from '@teslo/interfaces';
import { FormikHelpers } from 'formik';
import { useFetchProviders } from '@/app/providers/hooks/useFetchProviders';

interface INewProductPageProps {}

const NewProductPage: React.FunctionComponent<INewProductPageProps> = props => {
	const {} = props;
	const onSuccess = (data: Product, actions: FormikHelpers<ProductDto>) => {
		actions.resetForm();
	};
	const {
		data: categories,
		isFetching: isFetchingCategories,
		error: errorCategories,
		refetch: refetchCategories,
	} = useFetchCategories();
	const {
		data: brands,
		isFetching: isFetchingBrands,
		error: errorBrands,
		refetch: refetchBrands,
	} = useFetchBrands();
	const {
		data: providers,
		isFetching: isFetchingProviders,
		error: errorProviders,
		refetch: refetchProviders,
	} = useFetchProviders();

	const isLoading = isFetchingCategories || isFetchingBrands || isFetchingProviders;

	return (
		<HeaderDashboard
			to={validPaths.products.path}
			icon={<FaPlus />}
			title={'New Product'}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.dashboard.path },
				{ label: 'Products', to: validPaths.products.path },
				{ label: 'New Product' },
			]}
		>
			<TileFormProduct
				categories={categories}
				isLoading={isLoading}
				errorBrands={errorBrands}
				errorProviders={errorProviders}
				errorCategories={errorCategories}
				brands={brands}
				refetch={() => {
					refetchCategories();
					refetchBrands();
					refetchProviders();
				}}
			>
				<FormProduct
					onSuccess={onSuccess}
					categories={categories}
					brands={brands}
					providers={providers}
				/>
			</TileFormProduct>
		</HeaderDashboard>
	);
};

export default NewProductPage;
