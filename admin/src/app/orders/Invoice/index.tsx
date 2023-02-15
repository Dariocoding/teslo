import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import * as React from 'react';
import { protectedRoutes } from '@/utils';
import { Link, useParams } from 'react-router-dom';
import { useFetchOrder } from '../hooks/useFetchOrder';
import Loader from '@/components/ui/Loader';
import RenderIf from '@teslo/react-ui/RenderIf';
import InvoiceOrder from './InvoiceOrder';

interface IInvoicePageProps {}

const InvoicePage: React.FunctionComponent<IInvoicePageProps> = props => {
	const {} = props;
	const params = useParams();
	const { data: order, isFetching, error } = useFetchOrder(params.id);

	if (isFetching) return <Loader loading={true} />;

	return (
		<React.Fragment>
			<RenderIf isTrue={Object.keys(order).length}>
				<HeaderDashboard to={protectedRoutes.orders.path}>
					Orders
				</HeaderDashboard>

				<InvoiceOrder order={order} />
			</RenderIf>

			<RenderIf isTrue={!Object.keys(order).length && error}>
				<div className="flex items-center justify-center lg:mt-44">
					<div>
						<img
							src="/img/others/error.png"
							alt="Error"
							className="mx-auto"
						/>
						<div className="text-center mt-4">
							<h5>Oops! we've not found your order</h5>
							<p>Please contact the admin to check out</p>
							<Link
								to={protectedRoutes.orders.path}
								className="btn btn-primary w-full mt-3"
							>
								Go back to orders list
							</Link>
						</div>
					</div>
				</div>
			</RenderIf>
		</React.Fragment>
	);
};

export default InvoicePage;
