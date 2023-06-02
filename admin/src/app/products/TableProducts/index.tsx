import DataTable, { HeaderDataTable } from '@teslo/react-ui/DataTable';
import * as React from 'react';
import defaultHeadingProducts from './heading';
import mapProducts from './mapProducts';
import RenderIf from '@teslo/react-ui/RenderIf';
import toast from 'react-hot-toast';
import { Brand, Category, Product, Provider } from '@teslo/interfaces';
import { productsService } from '@teslo/services';
import { TablePlaceholder } from '@/components/placeholders';
import { useNavigate } from 'react-router-dom';
import { validPaths } from '@/utils';
import ButtonsTableProduct from './ButtonsTable';

interface ITableProductsProps {
	products: Product[];
	setProducts: React.Dispatch<Product[]>;
	isFetching: boolean;
	refetch(): void;
	heading?: HeaderDataTable[];
	providers?: Provider[];
	categories?: Category[];
	loadingProviders?: boolean;
	loadingCategories?: boolean;
	brands?: Brand[];
	loadingBrands?: boolean;
	showSelects?: boolean;
}

const ModalDeleteProduct = React.lazy(() => import('./ModalDeleteProduct'));

const TableProducts: React.FunctionComponent<ITableProductsProps> = props => {
	const {
		products,
		setProducts,
		isFetching,
		refetch,
		heading,
		providers,
		categories,
		loadingCategories,
		loadingProviders,
		brands,
		loadingBrands,
		showSelects,
	} = props;
	const navigate = useNavigate();

	const [isLoadingTable, setIsLoadingTable] = React.useState(false);
	const [showModalDeleteProduct, setShowModalDeleteProduct] = React.useState(false);
	const [stateProductDelete, setStateProductDelete] = React.useState<Product>(null);
	const [isLoadingDeleteProduct, setIsLoadingDeleteProduct] = React.useState(null);

	const onUpdateProduct = (product: Product) =>
		navigate(validPaths.editProduct.fnPath(product.id));

	const onCreateProduct = () => navigate(validPaths.newProduct.path);

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
					<ButtonsTableProduct
						categories={categories}
						providers={providers}
						refetch={refetch}
						onCreateProduct={onCreateProduct}
						loadingCategories={loadingCategories}
						loadingProviders={loadingProviders}
						setProducts={setProducts}
						setIsLoadingTable={setIsLoadingTable}
						brands={brands}
						loadingBrands={loadingBrands}
						showSelects={showSelects}
					/>
				}
				data={mapProducts({ products, onDeleteProduct, onUpdateProduct })}
				heading={heading || defaultHeadingProducts}
				loading={isFetching || isLoadingTable}
				showResponsive={false}
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
