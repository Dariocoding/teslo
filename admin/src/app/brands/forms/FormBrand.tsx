import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import { Brand, BrandDto } from '@teslo/interfaces';
import { brandsService } from '@teslo/services';
import { AxiosResponse } from 'axios';
import { Form, Formik } from 'formik';
import * as React from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

interface IFormBrandProps {
	onSuccess?: (data: Brand) => void;
	brand?: Brand;
}
const validationSchema = yup.object({ title: yup.string().required('Brand name is required') });

const FormBrand: React.FunctionComponent<IFormBrandProps> = props => {
	const { onSuccess, brand: brandToUpdate } = props;
	const status = brandToUpdate ? 'update' : 'create';
	const [errorMessage, setErrorMessage] = useTimeOutMessage();

	const initialValues: BrandDto = {
		title: brandToUpdate?.title || '',
	};

	const onSubmit = async (data: BrandDto) => {
		try {
			let req: AxiosResponse<Brand>;
			if (status === 'create') {
				req = await brandsService.create(data);
				toast.success('Brand created successfully!');
			} else if (status === 'update') {
				req = await brandsService.update(brandToUpdate.idbrand, data);
				toast.success('Brand updated successfully!');
			}
			if (onSuccess) onSuccess(req.data);
		} catch (error) {
			console.log(error);
			setErrorMessage(error.response.data.message || 'Error setting brand');
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
					placeholder="Type the name of the brand"
					label={'Brand name'}
					forceErrorMessage={errorMessage}
				/>

				<ButtonFormik className="btn-primary btn-sm" full>
					{status === 'create' ? 'Create brand' : 'Update brand'}
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormBrand;
