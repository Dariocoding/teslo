import Loader from '@/components/ui/Loader';
import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import * as React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useFetchProduct } from '../hooks/useFetchProduct';
import HeaderViewProduct from './HeaderViewProduct';
import { protectedRoutes, validPaths } from '@/utils';
import { FaBox } from 'react-icons/fa';
import { RenderIf } from 'react-rainbow-components';
import ModalDeleteProduct from '../TableProducts/ModalDeleteProduct';
import { Product } from '@teslo/interfaces';
import toast from 'react-hot-toast';
import { productsService } from '@teslo/services';

interface IViewProductProps {}

const ViewProduct: React.FunctionComponent<IViewProductProps> = props => {
	const {} = props;
	const params = useParams();
	const navigate = useNavigate();
	const { data: product, isFetching, error } = useFetchProduct(params.id);
	const [showModalDeleteProduct, setShowModalDeleteProduct] = React.useState(false);
	const [stateProductDelete, setStateProductDelete] = React.useState<Product>(null);
	const [isLoadingDeleteProduct, setIsLoadingDeleteProduct] = React.useState(null);

	if (isFetching) return <Loader loading={true} />;

	if (!Object.keys(product).length && error)
		return <Navigate to={protectedRoutes.products.path} />;

	const onCloseModalDelete = () => {
		setShowModalDeleteProduct(false);
		setStateProductDelete(null);
	};

	const onDeleteProduct = () => {
		setShowModalDeleteProduct(true);
		setStateProductDelete(product);
	};

	const onAcceptDeleteProduct = async () => {
		try {
			setIsLoadingDeleteProduct(true);
			await productsService.deleteProduct(stateProductDelete.id);
			navigate(validPaths.products.path);
			onCloseModalDelete();
			toast.success('Product deleted successfully');
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.message ||
					'There was an error deleting the product. Please try again'
			);
		} finally {
			setIsLoadingDeleteProduct(false);
		}
	};

	return (
		<HeaderDashboard
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.home.path },
				{ label: 'Products', to: validPaths.products.path },
				{ label: product.title || 'Product' },
			]}
			icon={<FaBox />}
			title={'Products'}
			to={validPaths.products.path}
		>
			<HeaderViewProduct product={product} onDeleteProduct={onDeleteProduct} />
			<div className="tile"></div>
			<RenderIf isTrue={showModalDeleteProduct}>
				<React.Suspense fallback={<></>}>
					<ModalDeleteProduct
						onAcceptDeleteProduct={onAcceptDeleteProduct}
						onCloseModalDelete={onCloseModalDelete}
						showModalDeleteProduct={showModalDeleteProduct}
						product={stateProductDelete}
						isLoading={isLoadingDeleteProduct}
					/>
				</React.Suspense>
			</RenderIf>
		</HeaderDashboard>
	);
};

export default ViewProduct;
