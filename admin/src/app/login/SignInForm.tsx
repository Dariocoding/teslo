import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import ButtonFormik from '@/components/@forms/ButtonFormik';
import { useNavigate } from 'react-router-dom';
import RenderIf from '@teslo/react-ui/RenderIf';
import Alert from '@teslo/react-ui/Alert';
import { useAuthStore } from '@/store/authStore';
import { useConfigApp, useModalStore } from '@/store';
import InputFormik from '@/components/@forms/InputFormik';
import { authService, LoginUserDto, usersService } from '@teslo/services';
import classNames from 'classnames';
import Checkbox from '@teslo/react-ui/Checkbox';
import { sleep, validPaths } from '@/utils';
import { BsFillShieldLockFill } from 'react-icons/bs';
import {
	getUserRememberLocalStorage,
	removeUserRememberLocalStorage,
	storeUserRememberLocalStorage,
} from '@/utils/transformUserToUserRemember';
import { User } from '@teslo/interfaces';
import { validate as validateUUID } from 'uuid';
import { AiOutlineLoading } from 'react-icons/ai';

const ForgottenPasswordForm = React.lazy(() => import('./ForgottenPasswordForm'));

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Please enter your user name'),
	password: Yup.string().required('Please enter your password'),
});

const INITIAL_VALUES: LoginUserDto = {
	username: '',
	password: '',
};
interface ISignInFormProps {
	userRemember?: User;
	setUserRemember?: React.Dispatch<React.SetStateAction<User>>;
}

const SignInForm: React.FunctionComponent<ISignInFormProps> = props => {
	const { userRemember, setUserRemember } = props;
	const refFormik = React.useRef<FormikProps<LoginUserDto>>(null);
	const [loading, setLoading] = React.useState(true);
	const [checked, setChecked] = React.useState(false);
	const { colors } = useConfigApp();
	const navigate = useNavigate();
	const initAuthenticate = useAuthStore(state => state.initAuthenticate);
	const [message, setMessage] = useTimeOutMessage();
	const { setModal } = useModalStore();

	const onSubmit = async (values: LoginUserDto) => {
		try {
			const req = await authService.logIn(values);
			await initAuthenticate(req.data);
			if (checked || userRemember) {
				storeUserRememberLocalStorage(req.data.user);
			} else {
				localStorage.removeItem('userRemember');
			}
			navigate(validPaths.dashboard.path);
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
					<ForgottenPasswordForm
						defaultEmail={refFormik.current.values.username}
					/>
				</React.Suspense>
			),
		});
	};

	React.useEffect(() => {
		async function init() {
			const userRemember = getUserRememberLocalStorage();
			if (validateUUID(userRemember)) {
				try {
					setLoading(true);
					const { data: user } = await usersService.getUser(
						userRemember
					);

					if (!user) {
						setUserRemember(null);
						setLoading(false);
						return;
					}
					refFormik.current.setValues({
						...INITIAL_VALUES,
						username: user.email,
					});
					setUserRemember(user);
				} catch (error) {
					setUserRemember(null);
				} finally {
					setLoading(false);
				}
			} else setLoading(false);
		}

		init();
	}, []);

	React.useEffect(() => {
		if (!userRemember) {
			refFormik.current.setValues(INITIAL_VALUES);
		}
	}, [userRemember]);

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			innerRef={refFormik}
		>
			<Form>
				<RenderIf isTrue={loading}>
					<div className="flex items-center justify-center absolute w-full h-full top-0 left-0 z-10 bg-white bg-opacity-20 backdrop-filter backdrop-blur-[2px] rounded-lg">
						<AiOutlineLoading className="text-2xl w-12 h-12 text-slate-700 animate-spin" />
					</div>
				</RenderIf>
				<RenderIf isTrue={message}>
					<Alert
						type="danger"
						className="mb-4 text-sm"
						title="Error authenticating"
					>
						{message}
					</Alert>
				</RenderIf>
				<RenderIf isTrue={userRemember}>
					<div className="form-group">
						<div className="flex items-center justify-center mb-1 mt-2">
							<BsFillShieldLockFill
								className={classNames(
									'"text-xl',
									colors.isThemed &&
										colors.isThemeDarkLogin &&
										'text-white'
								)}
							/>
						</div>
						<h6
							className={classNames(
								'text-sm text-center',
								colors.isThemed &&
									colors.isThemeDarkLogin &&
									'text-gray-100'
							)}
						>
							{userRemember?.firstName +
								' ' +
								userRemember?.lastName}
						</h6>
						<p
							className={classNames(
								colors.isThemeDarkLogin &&
									colors.isThemed &&
									'text-gray-100',
								'text-xs text-center mt-0'
							)}
						>
							{userRemember?.email}
						</p>
					</div>
				</RenderIf>

				<RenderIf isTrue={!userRemember}>
					<InputFormik
						name="username"
						label="Username"
						placeholder="Type your username"
						showSuccess={false}
						classNameInput={classNames(
							colors.isThemed &&
								colors.isThemeDarkLogin &&
								'bg-gray-800 text-gray-50 border-slate-700'
						)}
						classNameLabel={classNames(
							'text-xs',
							colors.isThemed &&
								colors.isThemeDarkLogin &&
								'text-gray-50'
						)}
						showError={false}
					/>
				</RenderIf>

				<InputFormik
					name="password"
					type="password"
					label="Password"
					placeholder="Type your password"
					autoComplete="off"
					showSuccess={false}
					classNameInput={classNames(
						colors.isThemed &&
							colors.isThemeDarkLogin &&
							'bg-gray-800 text-gray-50 border-slate-700'
					)}
					classNameLabel={classNames(
						'text-xs',
						colors.isThemed &&
							colors.isThemeDarkLogin &&
							'text-gray-50'
					)}
					showError={false}
				/>

				<RenderIf isTrue={!userRemember}>
					<div className="form-group">
						<Checkbox
							classNamesCheck={classNames(
								colors.isThemed &&
									colors.isThemeDarkLogin
									? 'bg-slate-800'
									: 'bg-gray-50'
							)}
							isChecked={checked}
							onChange={() => setChecked(!checked)}
						>
							<span
								className={classNames(
									colors.isThemed &&
										colors.isThemeDarkLogin &&
										'text-white',
									'text-xs'
								)}
							>
								Remember user
							</span>
						</Checkbox>
					</div>
				</RenderIf>

				<div className="form-group">
					<ButtonFormik className="btn-primary btn-sm" full>
						Sign In
					</ButtonFormik>
				</div>

				<RenderIf isTrue={userRemember}>
					<p
						className={classNames(
							'text-center text-xs transition font-semibold mb-0.5 cursor-pointer hover:underline',
							colors.isThemed && colors.isThemeDarkLogin
								? 'text-red-400 hover:text-red-300'
								: 'text-red-500 hover:text-red-400'
						)}
						onClick={() => {
							setUserRemember(null);
							removeUserRememberLocalStorage();
						}}
					>
						I'm not{' '}
						{userRemember?.firstName +
							' ' +
							userRemember?.lastName}
					</p>
				</RenderIf>

				<p
					className={classNames(
						'text-center text-xs',
						colors.isThemed &&
							colors.isThemeDarkLogin &&
							'text-gray-50'
					)}
				>
					Have you forgotten your{' '}
					<button
						type="button"
						onClick={openForgottenPasswordModal}
						className="text-blue-400 hover:text-blue-300 transition font-bold hover:underline"
					>
						password?
					</button>
				</p>
			</Form>
		</Formik>
	);
};

export default SignInForm;
