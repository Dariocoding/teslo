'use client';
import ButtonFormik from '@/shared/@forms/ButtonFormik';
import InputFormik from '@/shared/@forms/InputFormik';
import { useAuthStore } from '@/store';
import { User, UserDto } from '@teslo/interfaces';
import { usersService } from '@teslo/services';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

interface IFormUserAccountProps {
	user: User;
}

const validationSchema = yup.object({
	firstName: yup.string().required('First Name is required'),
	lastName: yup.string().required('Last Name is required'),
	email: yup.string().required('Email is required').email('Email not valid'),
});

const FormUserAccount: React.FunctionComponent<IFormUserAccountProps> = props => {
	const { user } = props;
	const { initAuthenticate } = useAuthStore();
	const INITAL_VALUES: UserDto = {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		phone: user.phone,
	};

	async function onSubmit(values: UserDto) {
		try {
			await usersService.updateProfileUser(values);
			await initAuthenticate();
			toast.success('User updated successfully');
		} catch (error) {
			console.log(error);
			toast.error(
				error?.response?.data?.message ||
					'Error updating user, please contact the administrator'
			);
		}
	}

	return (
		<Formik
			onSubmit={onSubmit}
			initialValues={INITAL_VALUES}
			validationSchema={validationSchema}
		>
			<Form>
				<div className="grid lg:grid-cols-2 lg:gap-4">
					<InputFormik
						name="firstName"
						placeholder="First Name"
						label={'First Name'}
					/>

					<InputFormik
						name="lastName"
						placeholder="Last Name"
						label={'Last Name'}
					/>
				</div>
				<InputFormik name="email" placeholder="Email" label={'Email'} />{' '}
				<InputFormik name="phone" placeholder="Phone" label={'Phone'} />
				<ButtonFormik className="btn btn-dark btn-pill">
					Update User
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormUserAccount;
