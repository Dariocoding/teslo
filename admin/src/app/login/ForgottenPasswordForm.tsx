import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import { useModalStore } from '@/store';
import { validPaths } from '@/utils';
import { SendRequestPasswordRecoverDto, usersService } from '@teslo/services';
import { Form, Formik } from 'formik';
import * as React from 'react';
import toast from 'react-hot-toast';
import { createSearchParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface IForgottenPasswordFormProps {
	defaultEmail?: string;
}

const validationSchema = Yup.object({
	email: Yup.string().required('Email is required').email('Email not valid'),
});

const ForgottenPasswordForm: React.FunctionComponent<IForgottenPasswordFormProps> = props => {
	const { defaultEmail } = props;
	const { closeModal } = useModalStore();
	const navigate = useNavigate();

	const onSubmit = async (values: SendRequestPasswordRecoverDto) => {
		try {
			const req = await usersService.sendRequestPassword(values);
			navigate({
				pathname: validPaths.verifyEmailSent.path,
				search: createSearchParams({ email: values.email }).toString(),
			});
			toast.success(req.data.msg);
			closeModal();
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.message || 'Error sending message to the email'
			);
		}
	};

	const INITIAL_VALUES: SendRequestPasswordRecoverDto = {
		email: defaultEmail || '',
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

				<ButtonFormik full className="btn-primary btn-sm">
					Send Email
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default ForgottenPasswordForm;
