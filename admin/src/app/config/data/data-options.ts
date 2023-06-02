import { BsFillCreditCard2BackFill, BsDatabaseFillCheck } from 'react-icons/bs';
import { ICardProps } from '../Card';
import { MdOutlineSupervisedUserCircle } from 'react-icons/md';
import { AiOutlineBgColors } from 'react-icons/ai';
import { validPaths } from '@/utils';
import { BiImages } from 'react-icons/bi';

export interface DataOption extends ICardProps {
	id: 'payment-methods' | 'user-prefixes' | 'images-enterprise' | 'colors-admin' | 'app-data';
}

const dataOptions: DataOption[] = [
	{
		id: 'payment-methods',
		icon: BsFillCreditCard2BackFill,
		title: 'Payment Methods',
		to: validPaths.paymentMethods.path,
		description: 'Check out the payment methods!',
		className: 'bg-blue-600',
		btnLinkText: 'Edit Payment Methods',
		classNameButton: 'btn-primary',
	},
	{
		id: 'user-prefixes',
		icon: MdOutlineSupervisedUserCircle,
		title: 'User Prefixes',
		description: 'Add or edit user prefixes!',
		className: 'bg-red-600',
		btnLinkText: 'Edit user prefixes',
		classNameButton: 'btn-danger',
	},
	{
		id: 'images-enterprise',
		icon: BiImages,
		title: 'Images Enterprise',
		description: 'Edit images enterprise!',
		className: 'bg-teal-600',
		btnLinkText: 'Edit images enterprise',
		classNameButton: 'btn-success',
		to: validPaths.imagesEnterpriseConfig.path,
	},
	{
		id: 'colors-admin',
		icon: AiOutlineBgColors,
		title: 'Colors',
		to: validPaths.colorsAdmin.path,
		description: 'Personalize your admin!',
		className: 'bg-yellow-600',
		btnLinkText: 'Edit colors admin',
		classNameButton: 'btn-warning',
	},
	{
		id: 'app-data',
		icon: BsDatabaseFillCheck,
		title: 'App Data',
		to: validPaths.appData.path,
		description: 'Email, ChatGpt, etc',
		className: 'bg-pink-600',
		btnLinkText: 'Edit App Data',
		classNameButton: 'bg-pink-600 hover:bg-pink-700 text-white',
	},
];

export default dataOptions;
