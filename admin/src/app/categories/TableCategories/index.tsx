import DataTable from '@teslo/react-ui/DataTable';
import { useModalStore } from '@/store';
import * as React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useFetchCategories } from '../hooks/useFetchCategories';
import headingCategories from './heading';
import mapCategories from './mapCategories';
import { toast } from 'react-toastify';
import RenderIf from '@teslo/react-ui/RenderIf';
import { AiOutlineReload } from 'react-icons/ai';
import AuthorityCheck from '@/components/AuthorityCheck';
import { Category, ValidRoles } from '@teslo/interfaces';
import { categoriesService } from '@teslo/services';
import { TablePlaceholder } from '@/components/placeholders';

const FormCreateCategory = React.lazy(() => import('../forms/FormCreateCategory'));
const FormUpdateCategory = React.lazy(() => import('../forms/FormUpdateCategory'));
const ModalDeleteCategory = React.lazy(() => import('./ModalDeleteCategory'));

interface ITableCategoriesProps {}

const TableCategories: React.FunctionComponent<ITableCategoriesProps> = props => {
	const {} = props;
	const [showModalDeleteCategory, setShowModalDeleteCategory] = React.useState(false);
	const [stateCategoryDelete, setStateCategoryDelete] = React.useState<Category>(null);
	const [isLoadingDeleteCategory, setIsLoadingDeleteCategory] = React.useState(null);
	const { data: categories, setData, isFetching, refetch } = useFetchCategories();

	const setModal = useModalStore(state => state.setModal);
	const closeModal = useModalStore(state => state.closeModal);

	const onUpdateCategory = (category: Category) => {
		const onSuccess = (data: Category) => {
			setData(
				categories.map(c =>
					c.idcategory === data.idcategory ? { ...c, ...data } : c
				)
			);
			closeModal();
		};

		setModal({
			title: 'Update Category',
			children: (
				<React.Suspense fallback={<></>}>
					<FormUpdateCategory
						category={category}
						onSuccess={onSuccess}
					/>
				</React.Suspense>
			),
			size: 'md',
		});
	};

	const onCreateCategory = () => {
		const onSuccess = (data: Category) => {
			setData([data, ...categories]);
			closeModal();
		};

		setModal({
			title: 'Create Category',
			children: (
				<React.Suspense fallback={<></>}>
					<FormCreateCategory onSuccess={onSuccess} />
				</React.Suspense>
			),
		});
	};

	const onCloseModalDelete = () => {
		setShowModalDeleteCategory(false);
		setStateCategoryDelete(null);
	};

	const onDeleteCategory = (category: Category) => {
		setShowModalDeleteCategory(true);
		setStateCategoryDelete(category);
	};

	const onAcceptDeleteCategory = async () => {
		try {
			setIsLoadingDeleteCategory(true);
			await categoriesService.deleteCategory(stateCategoryDelete.idcategory);
			setData(
				categories.filter(
					c => c.idcategory !== stateCategoryDelete.idcategory
				)
			);
			onCloseModalDelete();
			toast.success('Category deleted successfully');
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.message ||
					'There was an error deleting the category'
			);
		} finally {
			setIsLoadingDeleteCategory(false);
		}
	};

	return (
		<React.Fragment>
			<DataTable
				placeholder={<TablePlaceholder />}
				buttons={
					<React.Fragment>
						<AuthorityCheck
							validRoles={[
								ValidRoles.ADMIN,
								ValidRoles.SUPER_USER,
							]}
						>
							<button
								className="btn btn-primary btn-xs"
								onClick={onCreateCategory}
							>
								<FaPlus />
							</button>
						</AuthorityCheck>

						<button
							className="btn btn-outline-alternative btn-xs"
							onClick={() => refetch()}
						>
							<AiOutlineReload />
						</button>
					</React.Fragment>
				}
				data={mapCategories({
					categories,
					onDeleteCategory,
					onUpdateCategory,
				})}
				heading={headingCategories}
				loading={isFetching}
			/>
			<RenderIf isTrue={showModalDeleteCategory}>
				<React.Suspense fallback={<></>}>
					<ModalDeleteCategory
						onAcceptDeleteCategory={onAcceptDeleteCategory}
						onCloseModalDelete={onCloseModalDelete}
						showModalDeleteCategory={showModalDeleteCategory}
						category={stateCategoryDelete}
						isLoading={isLoadingDeleteCategory}
					/>
				</React.Suspense>
			</RenderIf>
		</React.Fragment>
	);
};

export default TableCategories;
