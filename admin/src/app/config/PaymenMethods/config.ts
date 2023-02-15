import { PaymentMethod } from '@teslo/interfaces';

export interface PaymentMethodTable extends PaymentMethod {
	actions: React.ReactNode;
}
