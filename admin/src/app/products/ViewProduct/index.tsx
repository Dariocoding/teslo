import Loader from '@/components/ui/Loader';
import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import * as React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useFetchProduct } from '../hooks/useFetchProduct';
import HeaderViewProduct from './HeaderViewProduct';
import { protectedRoutes } from '@/utils';

interface IViewProductProps {}

const ViewProduct: React.FunctionComponent<IViewProductProps> = props => {
	const {} = props;
	const params = useParams();
	const { data: product, isFetching, error } = useFetchProduct(params.id);

	if (isFetching) return <Loader loading={true} />;

	if (!Object.keys(product).length && error)
		return <Navigate to={protectedRoutes.products.path} />;

	function onUpdateProduct() {}

	function onDeleteProduct() {}

	return (
		<React.Fragment>
			<HeaderDashboard to="/products">Products</HeaderDashboard>

			<HeaderViewProduct
				product={product}
				onDeleteProduct={onDeleteProduct}
				onUpdateProduct={onUpdateProduct}
			/>

			<div className="tile"></div>
		</React.Fragment>
	);
};

export default ViewProduct;
