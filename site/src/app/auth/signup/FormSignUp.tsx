'use client';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { authService, SignUpUserDto } from '@teslo/services';
import InputFormik from '@/shared/@forms/InputFormik';
import ButtonFormik from '@/shared/@forms/ButtonFormik';
import useTimeoutMessage from '@/utils/hooks/useTimeoutMessage';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { viewPaths } from '@/utils';
import Alert from '@teslo/react-ui/Alert';
import RenderIf from '@teslo/react-ui/RenderIf';
import { toast } from 'react-hot-toast';
import { ValidRoles } from '@teslo/interfaces';

interface IFormSignUpProps {}

const INITIAL_VALUES: SignUpUserDto = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	roles: [ValidRoles.USER],
};

const validationSchema = yup.object({
	firstName: yup.string().required('First Name is required.'),
	lastName: yup.string().required('Last Name is requred.'),
	email: yup.string().required('Email is required.').email('Email not Valid.'),
	password: yup
		.string()
		.required('Password is required.')
		.min(5, 'Password should be at least 5 characters'),
});

const FormSignUp: React.FunctionComponent<IFormSignUpProps> = props => {
	const {} = props;
	const router = useRouter();
	const { initAuthenticate } = useAuthStore();
	const [errorMessage, setErrorMessage] = useTimeoutMessage(3000);

	async function onSubmit(values: SignUpUserDto, actions: FormikHelpers<SignUpUserDto>) {
		try {
			const req = await authService.signUp(values);
			initAuthenticate(req.data);
			router.push(viewPaths.home);
			toast.success('Sucessfully registered!');
			localStorage.setItem('at', req.data.token);
		} catch (error) {
			console.log(error);
			setErrorMessage(
				error?.response?.data?.message ||
					'Error creating user, please contact the administrator'
			);
			actions.setFieldValue('password', '');
		}
	}

	return (
		<Formik
			onSubmit={onSubmit}
			initialValues={INITIAL_VALUES}
			validationSchema={validationSchema}
		>
			<Form>
				<RenderIf isTrue={errorMessage}>
					<Alert type={'danger'} title={'Error creating user'}>
						{errorMessage}
					</Alert>
				</RenderIf>

				<InputFormik
					name={'firstName'}
					placeholder={'First Name'}
					label={'First Name'}
				/>

				<InputFormik
					name={'lastName'}
					placeholder={'Last Name'}
					label={'Last Name'}
				/>

				<InputFormik name={'email'} placeholder={'Email'} label={'Email'} />

				<InputFormik
					type={'password'}
					name={'password'}
					placeholder={'Password'}
					label={'Password'}
				/>

				<ButtonFormik className="btn-dark" full>
					Sign Up
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormSignUp;
