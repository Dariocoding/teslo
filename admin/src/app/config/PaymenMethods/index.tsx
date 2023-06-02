import RenderIf from '@teslo/react-ui/RenderIf';
import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { protectedRoutes } from '@/utils';
import * as React from 'react';
import TableOrdersByPayment from './TableOrdersByPayment';
import TablePaymentMethods from './TablePaymentMethods';
import { IoMdWallet } from 'react-icons/io';

interface IPaymentMethodsPageProps {}

const PaymentMethodsPage: React.FunctionComponent<IPaymentMethodsPageProps> = props => {
	const {} = props;
	const [selected, setSelected] = React.useState<number>(null);

	return (
		<HeaderDashboard
			title={'Payment Methods'}
			icon={<IoMdWallet />}
			to={protectedRoutes.settings.path}
			breadcrumbs={[
				{ label: 'Dashboard', to: protectedRoutes.dashboard.path },
				{ label: 'Settings', to: protectedRoutes.settings.path },
				{ label: 'Payment Methods' },
			]}
		>
			<TablePaymentMethods setSelected={setSelected} />
			<RenderIf isTrue={selected}>
				<TableOrdersByPayment id={selected} setId={setSelected} />
			</RenderIf>
		</HeaderDashboard>
	);
};

export default PaymentMethodsPage;
