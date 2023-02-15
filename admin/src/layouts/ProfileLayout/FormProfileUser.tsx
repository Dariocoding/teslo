import { validationSchemaUpdateUserDto } from '@/app/users/forms/validationSchemaUserDto';
import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import { User, UserDto } from '@teslo/interfaces';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';

interface IFormProfileUserProps {
	user: User;
	onSubmitUpdateUser(user: UserDto): Promise<void>;
	extraInitialValues?: UserDto;
	extraInputsForm?: React.ReactNode;
}

const FormProfileUser: React.FunctionComponent<IFormProfileUserProps> = props => {
	const { user, onSubmitUpdateUser, extraInitialValues, extraInputsForm } = props;

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

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchemaUpdateUserDto}
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

FormProfileUser.defaultProps = {
	extraInitialValues: {},
};

export default FormProfileUser;
