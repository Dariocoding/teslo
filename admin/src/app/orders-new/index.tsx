import { User } from '@teslo/interfaces';
import * as React from 'react';
import FormUserNewOrder from './forms/FormUser';
import { Form, Formik } from 'formik';
import ProfileUserOrder from './ProfileUserOrder';

interface IOrdersNewProps {}
export interface NewOrderValues {
	user: User;
}

const OrdersNew: React.FunctionComponent<IOrdersNewProps> = props => {
	const {} = props;

	const onSubmit = () => {};
	const initialValues: NewOrderValues = {
		user: null,
	};

	return (
		<div className="p-4">
			<Formik onSubmit={onSubmit} initialValues={initialValues}>
				<Form>
					<div className="flex items-start justify-center gap-4">
						<FormUserNewOrder />
						<div className="w-full">
							<div className="flex items-center justify-center gap-4">
								<ProfileUserOrder />
								<div className="tile"></div>
							</div>
							<div className="tile"></div>
						</div>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default OrdersNew;
