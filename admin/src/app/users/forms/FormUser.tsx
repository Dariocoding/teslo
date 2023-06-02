import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import SelectFormik, { OptionReactSelect } from '@/components/@forms/SelectFormik';
import { User, UserDto, ValidRol, ValidRoles } from '@teslo/interfaces';
import Alert from '@teslo/react-ui/Alert';
import RenderIf from '@teslo/react-ui/RenderIf';
import { usersService } from '@teslo/services';
import { Form, Formik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import { AxiosResponse } from 'axios';

interface IFormUserProps {
	onSuccess?(user: User): void;
	user?: User;
	defaultValidRole?: ValidRol[];
}

const FormUser: React.FunctionComponent<IFormUserProps> = props => {
	const { onSuccess, defaultValidRole = [ValidRoles.USER], user: userToUpdate } = props;
	const status = userToUpdate ? 'update' : 'create';

	const [errorMessage, setErrorMessage] = useTimeOutMessage(5000);

	const INITIAL_VALUES: UserDto = {
		firstName: userToUpdate?.firstName || '',
		lastName: userToUpdate?.lastName || '',
		email: userToUpdate?.email || '',
		phone: userToUpdate?.phone || '',
		...(userToUpdate?.password && { password: userToUpdate?.password }),

		isActive: userToUpdate?.isActive ?? true,
		roles: userToUpdate?.roles || defaultValidRole,
	};

	const onSubmit = async (values: UserDto) => {
		try {
			let req: AxiosResponse<User>;
			if (status === 'create') {
				req = await usersService.createUser(values);
				toast.success('User created successfully.');
			} else if (status === 'update') {
				req = await usersService.updateUser(userToUpdate.iduser, values);
				toast.success('User updated successfully.');
			}
			if (onSuccess) onSuccess(req.data);
		} catch (error) {
			console.log(error);
			setErrorMessage(error.response.data.message || 'Error creating user');
		} finally {
		}
	};

	const validationSchema = yup.object({
		firstName: yup.string().required('First Name is required.'),
		lastName: yup.string().required('Last Name is requred.'),
		email: yup.string().required('Email is required.').email('Email not Valid.'),
		...(status === 'create' && {
			password: yup
				.string()
				.required('Password is required.')
				.min(5, 'Password should be at least 5 characters'),
		}),
		...(status === 'update' && {
			password: yup.string().min(6, 'Password should be at least 6 characters'),
		}),
	});

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			<Form>
				<RenderIf isTrue={errorMessage}>
					<Alert type="danger" className="mb-6">
						{errorMessage}
					</Alert>
				</RenderIf>

				<InputFormik
					label={''}
					name={'firstName'}
					placeholder={'Type a first name'}
					required
				/>

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
					{status === 'create' ? 'Create User' : 'Update User'}
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormUser;
