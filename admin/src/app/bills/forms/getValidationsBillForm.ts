import { BillDto } from '@teslo/interfaces';

export const getValidationsBillForm = (values: BillDto) => {
	const subtotal = values.details.reduce((acc, detail) => acc + detail.qty * detail.price, 0);

	const disabledSubmit =
		!subtotal ||
		values.details.some(detail => !detail.product || !detail.qty || !detail.price) ||
		values.details.length === 0;

	// total is subtotal + iva
	const total =
		(values.tax ? subtotal + (subtotal * values.tax) / 100 : subtotal) +
		(values.delivery || 0);

	return { subtotal, disabledSubmit, total };
};
