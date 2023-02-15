import { PaymentMethod } from '@teslo/interfaces';
import { PaymentMethodTable } from '../config';
import ActionsPaymentMethods from './ActionsPaymentMethods';

interface IMapPaymentMethodsProps {
	paymentMethods: PaymentMethod[];
	deletePaymentMethod(paymentMethod: PaymentMethod): void;
	updatePaymentMethod(paymentMethod: PaymentMethod): void;
	setViewOrdersByPaymentMethod(paymentMethod: PaymentMethod): void;
}

const mapPaymentMethods = (props: IMapPaymentMethodsProps): PaymentMethodTable[] => {
	const {
		paymentMethods,
		updatePaymentMethod,
		deletePaymentMethod,
		setViewOrdersByPaymentMethod,
	} = props;

	return paymentMethods.map(paymentMethod => ({
		...paymentMethod,
		actions: (
			<ActionsPaymentMethods
				setViewOrdersByPaymentMethod={setViewOrdersByPaymentMethod}
				paymentMethod={paymentMethod}
				updatePaymentMethod={updatePaymentMethod}
				deletePaymentMethod={deletePaymentMethod}
			/>
		),
	}));
};

export default mapPaymentMethods;
