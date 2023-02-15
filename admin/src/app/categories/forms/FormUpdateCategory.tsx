import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import { Category, CategoryDto } from '@teslo/interfaces';
import { categoriesService } from '@teslo/services';

interface IFormCreateCategoryProps {
	category: Category;
	onSuccess?: (data: Category) => void;
}

const validationSchema = yup.object({ title: yup.string().required('Category name is required') });

const FormCreateCategory: React.FunctionComponent<IFormCreateCategoryProps> = props => {
	const { onSuccess, category } = props;

	const initialValues: CategoryDto = {
		title: category.title,
	};

	const [errorMessage, setErrorMessage] = useTimeOutMessage();

	const onSubmit = async (data: CategoryDto) => {
		try {
			const req = await categoriesService.updateCategory(
				category.idcategory,
				data
			);
			if (onSuccess) onSuccess(req.data.category);
			toast.success('Category updated successfully!');
		} catch (error) {
			console.log(error);
			setErrorMessage(error.response.data.message || 'Error creating category');
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
					Update category
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormCreateCategory;
