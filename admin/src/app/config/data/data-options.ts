import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { ICardProps } from '../Card';

const dataOptions: ICardProps[] = [
	{
		icon: BsFillCreditCard2BackFill,
		title: 'Payment Methods',
		to: '/settings/payment-methods',
		description: '¡Check out the payment methods!',
		className: 'bg-blue-600',
		btnLinkText: 'Edit Payment Methods',
	},
];

export default dataOptions;
