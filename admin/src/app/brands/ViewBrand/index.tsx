import Loader from '@/components/ui/Loader';
import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { protectedRoutes, validPaths } from '@/utils';
import * as React from 'react';
import { FaTag } from 'react-icons/fa';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import HeaderViewBrand from './HeaderViewBrand';
import toast from 'react-hot-toast';
import { brandsService } from '@teslo/services';
import FormBrand from '../forms/FormBrand';
import { Brand } from '@teslo/interfaces';
import { useModalStore } from '@/store';
import { useFetchBrand } from '../hooks/useFetchBrand';
import TableProductsByBrandId from './TableProductsByBrandId';
import ModalDeleteBrand from '../TableBrands/ModalDeleteBrand';

interface IViewBrandPageProps {}

const ViewBrandPage: React.FunctionComponent<IViewBrandPageProps> = props => {
	const {} = props;
	const navigate = useNavigate();
	const params = useParams();
	const { data: brand, setData, isFetching } = useFetchBrand(params.id);
	const setModal = useModalStore(state => state.setModal);
	const closeModal = useModalStore(state => state.closeModal);
	const [showModalDeleteBrand, setShowModalDeleteBrand] = React.useState(false);
	const [isLoadingDeleteBrand, setIsLoadingDeleteBrand] = React.useState(null);

	const onUpdate = () => {
		const onSuccess = (data: Brand) => {
			setData({ ...brand, ...data });
			closeModal();
		};

		setModal({
			title: 'Update Brand',
			children: (
				<React.Suspense fallback={<></>}>
					<FormBrand brand={brand} onSuccess={onSuccess} />
				</React.Suspense>
			),
			size: 'md',
		});
	};

	const onCloseModalDelete = () => setShowModalDeleteBrand(false);
	const onDeleteCategory = () => setShowModalDeleteBrand(true);

	const onAcceptDeleteCategory = async () => {
		try {
			setIsLoadingDeleteBrand(true);
			await brandsService.delete(brand.idbrand);
			onCloseModalDelete();
			toast.success('Brand deleted successfully');
			navigate(protectedRoutes.brands.path);
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.message ||
					'There was an error deleting the category'
			);
		} finally {
			setIsLoadingDeleteBrand(false);
		}
	};

	if (isFetching) return <Loader loading={true} />;

	if (!brand) return <Navigate replace to={protectedRoutes.categories.path} />;

	return (
		<HeaderDashboard
			to={validPaths.brands.path}
			title={'Brands'}
			icon={<FaTag />}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.home.path },
				{ label: 'Brands', to: validPaths.brands.path },
				{ label: brand?.title || 'Brand' },
			]}
		>
			<HeaderViewBrand
				brand={brand}
				onDelete={onDeleteCategory}
				onUpdate={onUpdate}
			/>
			<TableProductsByBrandId brand={brand} />
			<ModalDeleteBrand
				onAcceptDelete={onAcceptDeleteCategory}
				onClose={onCloseModalDelete}
				show={showModalDeleteBrand}
				brand={brand}
				isLoading={isLoadingDeleteBrand}
			/>
		</HeaderDashboard>
	);
};

export default ViewBrandPage;
