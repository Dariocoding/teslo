'use client';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { authService, LoginUserDto } from '@teslo/services';
import InputFormik from '@/shared/@forms/InputFormik';
import ButtonFormik from '@/shared/@forms/ButtonFormik';
import useTimeoutMessage from '@/utils/hooks/useTimeoutMessage';
import Link from 'next/link';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { viewPaths } from '@/utils';
import Alert from '@teslo/react-ui/Alert';
import RenderIf from '@teslo/react-ui/RenderIf';
import { toast } from 'react-hot-toast';

interface IFormLoginProps {}

const INITIAL_VALUES: LoginUserDto = { username: '', password: '' };

const validationSchema = yup.object({
	username: yup.string().required('Username is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters'),
});

const FormLogin: React.FunctionComponent<IFormLoginProps> = props => {
	const {} = props;
	const router = useRouter();
	const { initAuthenticate } = useAuthStore();
	const [errorMessage, setErrorMessage] = useTimeoutMessage(3000);

	async function onSubmit(values: LoginUserDto, actions: FormikHelpers<LoginUserDto>) {
		try {
			const req = await authService.logIn(values);
			initAuthenticate(req.data);
			router.push(viewPaths.home);
			toast.success('Sucessfully logged!');
			localStorage.setItem('at', req.data.token);
		} catch (error) {
			console.log(error);
			setErrorMessage(
				error?.response?.data?.message ||
					'Error authenticating user, please contact the administrator'
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
					<Alert type={'danger'} title={'Error authenticating'}>
						{errorMessage}
					</Alert>
				</RenderIf>

				<InputFormik
					name={'username'}
					placeholder={'Username'}
					label={'Username'}
					showError={false}
				/>

				<InputFormik
					type={'password'}
					name={'password'}
					placeholder={'Password'}
					classNameLabel={
						'flex justify-between items-center text-neutral-800 dark:text-neutral-200'
					}
					label={
						<>
							Password{' '}
							<Link
								href="/forgot-pass"
								className="text-sm text-green-600"
							>
								Forgot password?
							</Link>
						</>
					}
					showError={false}
				/>

				<ButtonFormik className="btn-dark" full>
					Log In
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormLogin;
