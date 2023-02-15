import { Form, Formik } from 'formik';
import * as React from 'react';
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import ButtonFormik from '@/components/@forms/ButtonFormik';
import Alert from '@teslo/react-ui/Alert';
import { toast } from 'react-toastify';
import RenderIf from '@teslo/react-ui/RenderIf';
import InputFormik from '@/components/@forms/InputFormik';
import SelectFormik, { OptionReactSelect } from '@/components/@forms/SelectFormik';
import { validationSchemaCreateUserDto } from './validationSchemaUserDto';
import { User, UserDto, ValidRol, ValidRoles } from '@teslo/interfaces';
import { usersService } from '@teslo/services';

interface IFormCreateUserProps {
	onSuccess?(user: User): void;
	defaultValidRole: ValidRol[];
}

const FormCreateUser: React.FunctionComponent<IFormCreateUserProps> = props => {
	const { onSuccess, defaultValidRole } = props;
	const [errorMessage, setErrorMessage] = useTimeOutMessage(5000);

	const INITIAL_VALUES: UserDto = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		password: '',
		isActive: true,
		roles: defaultValidRole,
	};

	const onSubmit = async (values: UserDto) => {
		try {
			const req = await usersService.createUser(values);
			toast.success('User created successfully.');
			if (onSuccess) onSuccess(req.data);
		} catch (error) {
			console.log(error);
			setErrorMessage(error.response.data.message || 'Error creating user');
		}
	};

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={onSubmit}
			validationSchema={validationSchemaCreateUserDto}
		>
			<Form>
				<RenderIf isTrue={errorMessage}>
					<Alert type="danger" className="mb-6">
						{errorMessage}
					</Alert>
				</RenderIf>

				<div className="grid lg:grid-cols-2 lg:gap-4">
					<InputFormik
						label={'First Name'}
						name={'firstName'}
						placeholder={'Type a first name'}
						required
					/>

					<InputFormik
						label={'Last Name'}
						name={'lastName'}
						placeholder={'Type a last name'}
						required
					/>
				</div>

				<InputFormik
					label={'Email'}
					name={'email'}
					placeholder={'Type a emaill'}
					required
				/>

				<InputFormik
					label={'Phone'}
					name={'phone'}
					placeholder={'Type a phone number'}
				/>

				<InputFormik
					type={'password'}
					label={'Password'}
					name={'password'}
					required
					placeholder={'Type a secure password'}
				/>

				<SelectFormik
					name="isActive"
					options={[
						{ value: true, label: 'Active' },
						{ value: false, label: 'Inactive' },
					]}
				/>

				<SelectFormik
					multiple={true}
					name="roles"
					options={[
						{ value: ValidRoles.ADMIN, label: 'Admin' },
						{ value: ValidRoles.USER, label: 'User' },
					]}
					onChange={(items: OptionReactSelect[], lastState) => {
						if (!items) return lastState;
						const copyItems = [...items];
						if (copyItems.length === 2) {
							copyItems.shift();
						}
						return copyItems.map(item => item.value);
					}}
				/>

				<ButtonFormik full className="btn-primary btn-sm">
					Create User
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

FormCreateUser.defaultProps = {
	defaultValidRole: [ValidRoles.USER],
};

export default FormCreateUser;
