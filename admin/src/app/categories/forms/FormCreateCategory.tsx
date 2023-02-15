import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { toast } from 'react-toastify';
import { categoriesService } from '@teslo/services';
import * as yup from 'yup';
import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import { Category, CategoryDto } from '@teslo/interfaces';

interface IFormCreateCategoryProps {
	onSuccess?: (data: Category) => void;
}

const initialValues: CategoryDto = {
	title: '',
};

const validationSchema = yup.object({ title: yup.string().required('Category name is required') });

const FormCreateCategory: React.FunctionComponent<IFormCreateCategoryProps> = props => {
	const { onSuccess } = props;
	const [errorMessage, setErrorMessage] = useTimeOutMessage();

	const onSubmit = async (data: CategoryDto) => {
		try {
			const req = await categoriesService.createCategory(data);
			toast.success('Category created successfully!');
			if (onSuccess) onSuccess(req.data.category);
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
					Create category
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormCreateCategory;
