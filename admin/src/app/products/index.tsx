import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import * as React from 'react';
import { useFetchProducts } from './hooks/useFetchProducts';
import TableProducts from './TableProducts';

interface IProductsPageProps {}

const ProductsPage: React.FunctionComponent<IProductsPageProps> = props => {
	const {} = props;
	const { data: products, setData, isFetching, refetch } = useFetchProducts();
	return (
		<>
			<HeaderDashboard to="/dashboard">Dashboard</HeaderDashboard>
			<div className="tile">
				<TableProducts
					products={products}
					setProducts={setData}
					isFetching={isFetching}
					refetch={refetch}
				/>
			</div>
		</>
	);
};

export default React.memo(ProductsPage);
