import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import SelectFormik, { OptionReactSelect } from '@/components/@forms/SelectFormik';
import { capitalize } from '@/utils';
import { Form, Formik } from 'formik';
import { ARRSTATUSORDER, Order, OrderDto, PaymentMethod } from '@teslo/interfaces';
import * as React from 'react';
import { toast } from 'react-toastify';
import { ordersService } from '@teslo/services';

interface IFormUpdateOrderProps {
	order: Order;
	onSuccess?(order: Order): void;
	paymentMethods: PaymentMethod[];
}

const optionsStatus: OptionReactSelect[] = ARRSTATUSORDER.map(status => ({
	value: status,
	label: capitalize(status),
}));

const FormUpdateOrder: React.FunctionComponent<IFormUpdateOrderProps> = props => {
	const { order, onSuccess, paymentMethods } = props;

	const initialValues: OrderDto = {
		reference: order.reference,
		status: order.status,
		paymentMethod: order.paymentMethod.idpaymentmethod as unknown as string,
	};

	const optionsPayment: OptionReactSelect[] = paymentMethods.map(paymentMethod => ({
		value: paymentMethod.idpaymentmethod,
		label: paymentMethod.title,
	}));

	async function onSubmit(values: OrderDto) {
		try {
			values.paymentMethod = paymentMethods.find(
				paymentMethod =>
					paymentMethod.idpaymentmethod === values.paymentMethod
			);
			const req = await ordersService.updateOrder(order.idorder, values);
			toast.success('Order updated successfully.');
			onSuccess?.(req.data);
		} catch (error) {
			console.log(error);
			toast.error('Error updating order');
		}
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			<Form>
				<div className="table-responsive">
					<table className="table">
						<tbody>
							<tr>
								<td>User:</td>
								<td>
									<strong>
										{
											order.user
												.firstName
										}{' '}
										{
											order.user
												.lastName
										}
									</strong>{' '}
									<br />
									{order.user.email}
								</td>
							</tr>
							<tr>
								<td>Reference:</td>

								<td>
									<InputFormik
										className="mb-0"
										name="reference"
										placeholder="Type the reference of the transaction"
									/>
								</td>
							</tr>

							<tr>
								<td>Status:</td>

								<td>
									<SelectFormik
										className="my-2"
										name="status"
										options={
											optionsStatus
										}
									/>
								</td>
							</tr>

							<tr>
								<td>Payment Method:</td>

								<td>
									<SelectFormik
										className="my-2"
										name="paymentMethod"
										options={
											optionsPayment
										}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<ButtonFormik full className="btn-primary btn-sm mt-8">
					Update Order
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormUpdateOrder;
