'use client';
import ButtonFormik from '@/shared/@forms/ButtonFormik';
import InputFormik from '@/shared/@forms/InputFormik';
import { usersService } from '@teslo/services';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

interface IFormChangePasswordProps {}

const INITIAL_VALUES = {
	password: '',
	confirmPassword: '',
};

const validationSchema = yup.object({
	password: yup
		.string()
		.required('Password is required')
		.min(6, 'Min password length is 6 characters'),
	passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const FormChangePassword: React.FunctionComponent<IFormChangePasswordProps> = props => {
	const {} = props;

	async function onSubmit(
		values: typeof INITIAL_VALUES,
		actions: FormikHelpers<typeof INITIAL_VALUES>
	) {
		try {
			await usersService.updateProfileUser({ password: values.password });
			toast.success('Password updated successfully');
			actions.resetForm();
			actions.setFieldValue('passwordConfirm', '');
		} catch (error) {
			toast.error(
				error?.response?.data?.message ||
					'Error updating password, please contact the administrator'
			);
		}
	}

	return (
		<Formik
			onSubmit={onSubmit}
			initialValues={INITIAL_VALUES}
			validationSchema={validationSchema}
		>
			<Form>
				<InputFormik
					type={'password'}
					name="password"
					placeholder="Password"
					label={'Password'}
				/>

				<InputFormik
					type={'password'}
					name="passwordConfirm"
					placeholder="Confirm Password"
					label={'Confirm Password'}
				/>

				<ButtonFormik className="btn btn-dark btn-pill">
					Update Password
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormChangePassword;
