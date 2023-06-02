import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { validPaths } from '@/utils';
import * as React from 'react';
import { FaPen } from 'react-icons/fa';
import FormProduct from '../forms/FormProduct';
import { useFetchCategories } from '@/app/categories/hooks/useFetchCategories';
import { Link, useParams } from 'react-router-dom';
import RenderIf from '@teslo/react-ui/RenderIf';
import { useFetchProduct } from '../hooks/useFetchProduct';
import { useFetchBrands } from '@/app/brands/hooks/useFetchBrands';
import TileFormProduct from '../shared/TileFormProduct';
import { useFetchProviders } from '@/app/providers/hooks/useFetchProviders';

interface IEditProductPageProps {}

const EditProductPage: React.FunctionComponent<IEditProductPageProps> = props => {
	const {} = props;
	const params = useParams();
	const onSuccess = () => {};
	const {
		data: product,
		isFetching: isFetchingProduct,
		error: errorProduct,
		refetch: refetchProduct,
	} = useFetchProduct(params.id);
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

	const isLoading =
		isFetchingCategories ||
		isFetchingProduct ||
		isFetchingBrands ||
		isFetchingProviders;

	return (
		<HeaderDashboard
			to={validPaths.products.path}
			icon={<FaPen />}
			title={'Edit Product'}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.dashboard.path },
				{ label: 'Products', to: validPaths.products.path },
				{ label: 'Edit Product' },
			]}
		>
			<TileFormProduct
				categories={categories}
				isLoading={isLoading}
				brands={brands}
				errorBrands={errorBrands}
				errorCategories={errorCategories}
				errorProduct={errorProduct}
				errorProviders={errorProviders}
				refetch={() => {
					refetchBrands();
					refetchCategories();
					refetchProduct();
					refetchProviders();
				}}
			>
				<RenderIf isTrue={product}>
					<FormProduct
						onSuccess={onSuccess}
						categories={categories}
						product={product}
						brands={brands}
						providers={providers}
					/>
				</RenderIf>
				<RenderIf isTrue={!product}>
					<h6 className="text-center font-normal">
						404 Error Product Not Found
					</h6>
					<div className="mt-4 flex items-center justify-center">
						<Link
							to={validPaths.products.path}
							className="btn btn-primary btn-sm w-auto mx-auto"
						>
							Product
						</Link>
					</div>
				</RenderIf>
			</TileFormProduct>
		</HeaderDashboard>
	);
};

export default EditProductPage;
