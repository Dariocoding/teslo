import Loader from "@/components/ui/Loader";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import * as React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFetchProduct } from "../hooks/useFetchProduct";
import HeaderViewProduct from "./HeaderViewProduct";
import { protectedRoutes, validPaths } from "@/utils";
import { FaBox } from "react-icons/fa";
import { RenderIf } from "react-rainbow-components";
import ModalDeleteProduct from "../TableProducts/ModalDeleteProduct";
import { Product } from "@teslo/interfaces";
import toast from "react-hot-toast";
import { productsService } from "@teslo/services";
import { translate } from "@/i18n";
import { useIntl } from "react-intl";
import { useModalStore } from "@/store";

interface IViewProductProps {}

const FormQuickEditProduct = React.lazy(() => import("../forms/FormQuickEditProduct"));

const ViewProduct: React.FunctionComponent<IViewProductProps> = props => {
	const {} = props;
	const { setModal, closeModal } = useModalStore();
	const params = useParams();
	const { formatMessage: t } = useIntl();
	const navigate = useNavigate();
	const { data: product, isFetching, error, setData: setProduct } = useFetchProduct(params.id);
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
			toast.success(t({ id: "producs.deleted.success" }));
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message || t({ id: "products.deleted.error" }));
		} finally {
			setIsLoadingDeleteProduct(false);
		}
	};

	const onOpenQuickModal = () => {
		function onSuccess(response: Product) {
			setProduct(response);
			closeModal();
		}

		setModal({
			title: t({ id: "products.quickEdit.title" }),
			children: (
				<React.Suspense>
					<FormQuickEditProduct product={product} onSuccess={onSuccess} />
				</React.Suspense>
			),
			size: "md",
		});
	};

	return (
		<HeaderDashboard
			breadcrumbs={[
				{ label: translate("dashboard.title"), to: validPaths.home.path },
				{
					label: translate("products.title"),
					to: validPaths.products.path,
				},
				{ label: product.title || t({ id: "products.single" }) },
			]}
			icon={<FaBox />}
			title={product.title || t({ id: "products.single" })}
			to={validPaths.products.path}
		>
			<HeaderViewProduct
				product={product}
				onDeleteProduct={onDeleteProduct}
				onOpenQuickModal={onOpenQuickModal}
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
		</HeaderDashboard>
	);
};

export default ViewProduct;
