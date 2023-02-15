import DataTable, { HeaderDataTable } from '@teslo/react-ui/DataTable';
import { useModalStore } from '@/store';
import * as React from 'react';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';
import defaultHeadingProducts from './heading';
import mapProducts from './mapProducts';
import RenderIf from '@teslo/react-ui/RenderIf';
import { toast } from 'react-toastify';
import { hideLoader, showLoader } from '@/components/ui/Loader';
import { Product } from '@teslo/interfaces';
import { categoriesService, productsService } from '@teslo/services';
import { TablePlaceholder } from '@/components/placeholders';

interface ITableProductsProps {
	products: Product[];
	setProducts: React.Dispatch<Product[]>;
	isFetching: boolean;
	refetch(): void;
	heading?: HeaderDataTable[];
}

const ModalDeleteProduct = React.lazy(() => import('./ModalDeleteProduct'));
const FormCreateProduct = React.lazy(() => import('../forms/FormCreateProduct'));
const FormUpdateProduct = React.lazy(() => import('../forms/FormUpdateProduct'));

const TableProducts: React.FunctionComponent<ITableProductsProps> = props => {
	const { products, setProducts, isFetching, refetch, heading } = props;
	const [showModalDeleteProduct, setShowModalDeleteProduct] = React.useState(false);
	const [stateProductDelete, setStateProductDelete] = React.useState<Product>(null);
	const [isLoadingDeleteProduct, setIsLoadingDeleteProduct] = React.useState(null);

	const setModal = useModalStore(state => state.setModal);
	const closeModal = useModalStore(state => state.closeModal);

	const onUpdateProduct = async (product: Product) => {
		const onSuccess = (data: Product) => {
			setProducts(products.map(p => (p.id === data.id ? { ...p, ...data } : p)));
			closeModal();
		};

		try {
			showLoader();
			const req = await categoriesService.getCategories();
			if (!req.data.length) {
				throw new Error(
					'No categories found, please try adding a new category'
				);
			}

			setModal({
				title: 'Update Product',
				children: (
					<React.Suspense fallback={<></>}>
						<FormUpdateProduct
							product={product}
							onSuccess={onSuccess}
							categories={req.data}
						/>
					</React.Suspense>
				),
				size: 'xl',
			});
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			hideLoader();
		}
	};

	const onCreateProduct = async () => {
		const onSuccess = (data: Product) => {
			setProducts([data, ...products]);
			closeModal();
		};

		try {
			showLoader();
			const req = await categoriesService.getCategories();
			if (!req.data.length) {
				throw new Error(
					'No categories found, please try adding a new category'
				);
			}

			setModal({
				title: 'Create Product',
				children: (
					<React.Suspense fallback={<></>}>
						<FormCreateProduct
							onSuccess={onSuccess}
							categories={req.data}
						/>
					</React.Suspense>
				),
				size: 'xl',
			});
		} catch (error) {
			toast.error(error.message);
		} finally {
			hideLoader();
		}
	};

	const onCloseModalDelete = () => {
		setShowModalDeleteProduct(false);
		setStateProductDelete(null);
	};

	const onDeleteProduct = (product: Product) => {
		setShowModalDeleteProduct(true);
		setStateProductDelete(product);
	};

	const onAcceptDeleteProduct = async () => {
		try {
			setIsLoadingDeleteProduct(true);
			await productsService.deleteProduct(stateProductDelete.id);
			setProducts(products.filter(c => c.id !== stateProductDelete.id));
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
		<React.Fragment>
			<DataTable
				placeholder={<TablePlaceholder />}
				buttons={
					<React.Fragment>
						<button
							className="btn btn-primary btn-xs"
							onClick={onCreateProduct}
						>
							<FaPlus />
						</button>
						<button
							className="btn btn-outline-alternative btn-xs"
							onClick={refetch}
						>
							<AiOutlineReload />
						</button>
					</React.Fragment>
				}
				data={mapProducts({ products, onDeleteProduct, onUpdateProduct })}
				heading={heading || defaultHeadingProducts}
				loading={isFetching}
			/>
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
		</React.Fragment>
	);
};

export default TableProducts;
