import { useModalStore } from "@/store";
import { validPaths } from "@/utils";
import { Product } from "@teslo/interfaces";
import { useNavigate } from "react-router-dom";
import { ITableProductsProps } from ".";
import React from "react";
import { useIntl } from "react-intl";
import { productsService } from "@teslo/services";
import { toast } from "react-hot-toast";
import Loader from "@/components/ui/Loader";

const FormQuickEditProduct = React.lazy(() => import("../forms/FormQuickEditProduct"));
const ModalBarCode = React.lazy(() => import("./ModalBarCode"));

export const useActionsTableProducts = (props: ITableProductsProps) => {
	const { products, setProducts } = props;
	const [showModalDeleteProduct, setShowModalDeleteProduct] = React.useState(false);
	const [stateProductDelete, setStateProductDelete] = React.useState<Product>(null);
	const [isLoadingDeleteProduct, setIsLoadingDeleteProduct] = React.useState(null);
	const { formatMessage: t } = useIntl();
	const navigate = useNavigate();
	const { setModal, closeModal } = useModalStore();

	const onUpdateProduct = (product: Product) => {
		navigate(validPaths.editProduct.fnPath(product.id));
	};

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
			toast.success(t({ id: "products.deleted.success" }));
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.message ||
					"There was an error deleting the product. Please try again"
			);
		} finally {
			setIsLoadingDeleteProduct(false);
		}
	};

	const onQuickEditProduct = (product: Product) => {
		function onSuccess(response: Product) {
			setProducts(products.map(c => (c.id === response.id ? response : c)));
			closeModal();
		}

		setModal({
			title: t({ id: "products.quickEdit.title" }),
			children: (
				<React.Suspense fallback={<Loader loading />}>
					<FormQuickEditProduct product={product} onSuccess={onSuccess} />
				</React.Suspense>
			),
			size: "md",
		});
	};

	const onViewBarCode = (product: Product) => {
		setModal({
			title: t({ id: "products.actions.viewBarCode" }),
			children: <ModalBarCode product={product} />,
			size: "lg",
		});
	};

	return {
		onQuickEditProduct,
		showModalDeleteProduct,
		isLoadingDeleteProduct,
		onCreateProduct,
		onDeleteProduct,
		onUpdateProduct,
		stateProductDelete,
		onAcceptDeleteProduct,
		onCloseModalDelete,
		onViewBarCode,
	};
};
