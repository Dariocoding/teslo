import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import SelectFormik, { OptionReactSelect } from '@/components/@forms/SelectFormik';
import Alert from '@teslo/react-ui/Alert';
import RenderIf from '@teslo/react-ui/RenderIf';
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import { Form, Formik } from 'formik';
import { User, UserDto, ValidRoles } from '@teslo/interfaces';
import * as React from 'react';
import { toast } from 'react-toastify';
import { validationSchemaUpdateUserDto } from './validationSchemaUserDto';
import { usersService } from '@teslo/services';

interface IFormUpdateUserProps {
	onSuccess?(user: User): void;
	user: User;
}

const FormUpdateUser: React.FunctionComponent<IFormUpdateUserProps> = props => {
	const { user, onSuccess } = props;
	const INITIAL_VALUES: UserDto = {
		isActive: user.isActive,
		phone: user.phone,
		lastName: user.lastName,
		email: user.email,
		firstName: user.firstName,
		roles: user.roles,
	};

	const [errorMessage, setErrorMessage] = useTimeOutMessage(5000);

	const onSubmit = async (values: UserDto) => {
		try {
			if (!values.password?.trim()) delete values.password;
			const req = await usersService.updateUser(user.iduser, values);
			toast.success('User updated successfully.');
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
			validationSchema={validationSchemaUpdateUserDto}
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
					Update User
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormUpdateUser;
