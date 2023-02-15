import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import { useModalStore } from '@/store';
import { SendRequestPasswordRecoverDto, usersService } from '@teslo/services';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

interface IForgottenPasswordFormProps {}

const INITIAL_VALUES: SendRequestPasswordRecoverDto = {
	email: '',
};

const validationSchema = Yup.object({
	email: Yup.string().required('Email is required').email('Email not valid'),
});

const ForgottenPasswordForm: React.FunctionComponent<IForgottenPasswordFormProps> = props => {
	const {} = props;
	const { closeModal } = useModalStore();

	const onSubmit = async (values: SendRequestPasswordRecoverDto) => {
		try {
			const req = await usersService.sendRequestPassword(values);
			toast.success(req.data.msg);
			closeModal();
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.message || 'Error sending message to the email'
			);
		}
	};

	return (
		<Formik
			initialValues={INITIAL_VALUES}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			<Form>
				<InputFormik
					name="email"
					label="Email"
					placeholder="Type your email"
					showSuccess={false}
				/>

				<ButtonFormik full className="btn-primary">
					Send Email
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default ForgottenPasswordForm;
