import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import ButtonFormik from '@/components/@forms/ButtonFormik';
import { useNavigate } from 'react-router-dom';
import RenderIf from '@teslo/react-ui/RenderIf';
import Alert from '@teslo/react-ui/Alert';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store';
import InputFormik from '@/components/@forms/InputFormik';
import { authService, LoginUserDto } from '@teslo/services';

const ForgottenPasswordForm = React.lazy(() => import('./ForgottenPasswordForm'));

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Please enter your user name'),
	password: Yup.string().required('Please enter your password'),
});

const INITIAL_VALUES: LoginUserDto = {
	username: '',
	password: '',
};

interface ISignInFormProps {}

const SignInForm: React.FunctionComponent<ISignInFormProps> = props => {
	const {} = props;
	const navigate = useNavigate();
	const initAuthenticate = useAuthStore(state => state.initAuthenticate);
	const [message, setMessage] = useTimeOutMessage();
	const { setModal } = useModalStore();

	const onSubmit = async (values: LoginUserDto) => {
		try {
			const req = await authService.logIn(values);
			initAuthenticate(req.data);
			navigate('/dashboard');
		} catch (error) {
			console.log(error);
			setMessage(error.response.data.message);
		}
	};

	const openForgottenPasswordModal = () => {
		setModal({
			title: 'Forgot Password',
			children: (
				<React.Suspense fallback={<></>}>
					<ForgottenPasswordForm />
				</React.Suspense>
			),
		});
	};

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			<Form>
				<RenderIf isTrue={message}>
					<Alert
						type="danger"
						className="mb-4"
						title="Error authenticating"
					>
						Hola
					</Alert>
				</RenderIf>
				<InputFormik
					name="username"
					label="Username"
					placeholder="Type your username"
					showSuccess={false}
					classNameLabel={'text-xs'}
				/>

				<InputFormik
					name="password"
					type="password"
					label="Password"
					placeholder="Type your password"
					autoComplete="off"
					showSuccess={false}
					classNameLabel={'text-xs'}
				/>

				<div className="form-group">
					<ButtonFormik className="btn-primary" full>
						Sign In
					</ButtonFormik>
				</div>

				<p className="text-center text-sm">
					Have you forgotten your{' '}
					<button
						type="button"
						onClick={openForgottenPasswordModal}
						className="text-blue-500 hover:text-blue-700 transition font-bold"
					>
						password?
					</button>
				</p>
			</Form>
		</Formik>
	);
};

export default SignInForm;
