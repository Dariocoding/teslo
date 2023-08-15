import useQueryState from '@/utils/hooks/useQueryState';
import { paymentMethodService } from '@teslo/services';

async function fetchPaymentMethods() {
	const { data } = await paymentMethodService.getAll();
	return data;
}

export function useFetchPaymentMethods() {
	return useQueryState(['payment-methods'], fetchPaymentMethods, []);
}
