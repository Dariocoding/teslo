import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import { PaymentMethod, PaymentMethodDto } from '@teslo/interfaces';
import { paymentMethodService } from '@teslo/services';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

interface IFormPaymentMethodProps {
	state: 'create' | 'update';
	paymentMethod?: PaymentMethod;
	onSuccess(payment: PaymentMethod): void;
}

const validationSchema = yup.object({ title: yup.string().required('Name is required') });

const FormPaymentMethod: React.FunctionComponent<IFormPaymentMethodProps> = props => {
	const { state, paymentMethod, onSuccess } = props;

	const initialValues: PaymentMethodDto =
		state === 'create'
			? { title: '', owner: '', phone: '', email: '', dni: '' }
			: {
					title: paymentMethod.title,
					owner: paymentMethod.owner,
					phone: paymentMethod.phone,
					email: paymentMethod.email,
					dni: paymentMethod.dni,
			  };

	async function onSubmit(data: PaymentMethodDto, actions: FormikHelpers<PaymentMethodDto>) {
		try {
			let req: AxiosResponse<PaymentMethod>;

			if (state === 'create') {
				req = await paymentMethodService.createOne(data);
			} else if (state === 'update') {
				req = await paymentMethodService.updateOne(
					paymentMethod.idpaymentmethod,
					data
				);
			}
			toast.success(
				state === 'create'
					? 'Payment Method created successfully'
					: 'Payment Method updated successfully'
			);
			onSuccess(req.data);
			if (state === 'create') actions.resetForm();
		} catch (error) {
			console.log(error);
			toast.error('There was an error setting the payment method');
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			enableReinitialize
			validationSchema={validationSchema}
		>
			<Form>
				<InputFormik
					label={'Name'}
					name={'title'}
					placeholder={'Name of payment method'}
				/>

				<InputFormik
					label={'Owner'}
					name={'owner'}
					placeholder={'Owner of payment method'}
				/>

				<InputFormik
					label={'Phone'}
					name={'phone'}
					placeholder={'Phone of payment method'}
				/>

				<InputFormik
					label={'Email'}
					name={'email'}
					placeholder={'Email of payment method phone'}
				/>

				<InputFormik
					label={'DNI'}
					name={'dni'}
					placeholder={'DNI of payment method DNI'}
				/>

				<ButtonFormik
					className={classNames(
						'btn-sm',
						state === 'create' && 'btn-primary',
						state === 'update' && 'btn-danger'
					)}
					full
				>
					{state === 'create'
						? 'Create Payment Method'
						: 'Update Payment Method'}
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormPaymentMethod;
