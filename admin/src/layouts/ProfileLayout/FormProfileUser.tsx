import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import { User, UserDto } from '@teslo/interfaces';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import * as yup from 'yup';

interface IFormProfileUserProps {
	user: User;
	onSubmitUpdateUser(user: UserDto): Promise<void>;
	extraInitialValues?: UserDto;
	extraInputsForm?: React.ReactNode;
}

const FormProfileUser: React.FunctionComponent<IFormProfileUserProps> = props => {
	const { user, onSubmitUpdateUser, extraInitialValues = {}, extraInputsForm } = props;

	const initialValues: UserDto = {
		lastName: user.lastName,
		firstName: user.firstName,
		email: user.email,
		phone: user.phone,
		...extraInitialValues,
	};

	async function onSubmit(user: UserDto, actions: FormikHelpers<UserDto>) {
		actions.setSubmitting(true);
		await onSubmitUpdateUser(user);
		actions.setSubmitting(false);
	}

	const validationSchema = yup.object({
		firstName: yup.string().required('First Name is required.'),
		lastName: yup.string().required('Last Name is requred.'),
		email: yup.string().required('Email is required.').email('Email not Valid.'),
		password: yup.string().min(6, 'Password should be at least 6 characters'),
	});

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			<Form className="text-start">
				<InputFormik
					label={'Firstname'}
					placeholder={'Type your firstname'}
					name={'firstName'}
				/>

				<InputFormik
					label={'Lastname'}
					placeholder={'Type your lastname'}
					name={'lastName'}
				/>

				<InputFormik
					label={'Email'}
					placeholder={'Type your email address'}
					name={'email'}
				/>

				<InputFormik
					label={'Phone'}
					placeholder={'Type your phone number'}
					name={'phone'}
				/>

				<InputFormik
					type={'password'}
					label={'New Password'}
					placeholder={'Type your new password'}
					name={'password'}
				/>

				{extraInputsForm}

				<ButtonFormik className="btn-primary mt-4" full>
					Update Profile
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormProfileUser;
