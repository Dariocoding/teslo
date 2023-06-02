import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import { Category, CategoryDto } from '@teslo/interfaces';
import { CategoryRequestResponse, categoriesService } from '@teslo/services';
import { AxiosResponse } from 'axios';
import { Form, Formik } from 'formik';
import * as React from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

interface IFormCategoryProps {
	onSuccess?: (data: Category) => void;
	category?: Category;
}

const validationSchema = yup.object({ title: yup.string().required('Category name is required') });

const FormCategory: React.FunctionComponent<IFormCategoryProps> = props => {
	const { onSuccess, category: categoryToUpdate } = props;
	const status = categoryToUpdate ? 'update' : 'create';
	const [errorMessage, setErrorMessage] = useTimeOutMessage();

	const initialValues: CategoryDto = {
		title: categoryToUpdate?.title || '',
	};

	const onSubmit = async (data: CategoryDto) => {
		try {
			let req: AxiosResponse<CategoryRequestResponse>;
			if (status === 'create') {
				req = await categoriesService.createCategory(data);
				toast.success('Category created successfully!');
			} else if (status === 'update') {
				req = await categoriesService.updateCategory(
					categoryToUpdate.idcategory,
					data
				);
				toast.success('Category updated successfully!');
			}
			if (onSuccess) onSuccess(req.data.category);
		} catch (error) {
			console.log(error);
			setErrorMessage(error.response.data.message || 'Error setting category');
		}
	};

	return (
		<Formik
			onSubmit={onSubmit}
			validationSchema={validationSchema}
			initialValues={initialValues}
		>
			<Form>
				<InputFormik
					name="title"
					placeholder="Type the name of the category"
					label={'Category name'}
					forceErrorMessage={errorMessage}
				/>

				<ButtonFormik className="btn-primary btn-sm" full>
					{status === 'create'
						? 'Create category'
						: 'Update Category'}
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormCategory;
