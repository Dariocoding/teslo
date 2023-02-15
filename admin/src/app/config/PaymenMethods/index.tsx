import RenderIf from '@teslo/react-ui/RenderIf';
import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { protectedRoutes } from '@/utils';
import * as React from 'react';
import TableOrdersByPayment from './TableOrdersByPayment';
import TablePaymentMethods from './TablePaymentMethods';

interface IPaymentMethodsPageProps {}

const PaymentMethodsPage: React.FunctionComponent<IPaymentMethodsPageProps> = props => {
	const {} = props;

	const [selected, setSelected] = React.useState<number>(null);
	return (
		<React.Fragment>
			<HeaderDashboard to={protectedRoutes.settings.path}>
				Settings
			</HeaderDashboard>
			<TablePaymentMethods setSelected={setSelected} />
			<RenderIf isTrue={selected}>
				<TableOrdersByPayment id={selected} />
			</RenderIf>
		</React.Fragment>
	);
};

export default PaymentMethodsPage;
