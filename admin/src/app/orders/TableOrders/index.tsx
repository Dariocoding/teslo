import DataTable, { HeaderDataTable } from '@teslo/react-ui/DataTable';
import { hideLoader, showLoader } from '@/components/ui/Loader';
import RenderIf from '@teslo/react-ui/RenderIf';
import { useModalStore } from '@/store';
import { Order } from '@teslo/interfaces';
import { paymentMethodService } from '@teslo/services';
import * as React from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import defaultHeadingOrders from './heading';
import mapOrders from './MapOrders';
import { TablePlaceholder } from '@/components/placeholders';

const FormUpdateOrder = React.lazy(() => import('../forms/FormUpdateOrder'));
const ModalViewUser = React.lazy(() => import('./ModalViewUser'));

interface TableOrdersProps {
	heading?: HeaderDataTable[];
	refetch?(): void;
	isFetching: boolean;
	orders: Order[];
	setOrders(orders: Order[]): void;
	showPagination?: boolean;
	showSearch?: boolean;
}

const TableOrders: React.FunctionComponent<TableOrdersProps> = props => {
	const {
		orders,
		isFetching,
		heading = defaultHeadingOrders,
		setOrders,
		refetch,
		showPagination,
		showSearch,
	} = props;

	const setModal = useModalStore(state => state.setModal);
	const closeModal = useModalStore(state => state.closeModal);

	async function onClickUpdateOrder(order: Order) {
		function onSuccess(orderUpdated: Order) {
			setOrders(
				orders.map(order =>
					order.idorder === orderUpdated.idorder
						? { ...orderUpdated }
						: order
				)
			);
			closeModal();
		}

		try {
			showLoader();
			const req = await paymentMethodService.getAll();
			setModal({
				title: `Update Order ${order.idorder}`,
				size: 'lg',
				children: (
					<React.Suspense fallback={<></>}>
						<FormUpdateOrder
							paymentMethods={req.data}
							order={order}
							onSuccess={onSuccess}
						/>
					</React.Suspense>
				),
			});
		} catch (error) {
			console.log(error);
		} finally {
			hideLoader();
		}
	}

	function onClickViewUser(order: Order) {
		setModal({
			title: `View Order #${order.idorder} User`,
			children: (
				<React.Suspense fallback={<></>}>
					<ModalViewUser user={order.user} />
				</React.Suspense>
			),
			size: 'md',
		});
	}

	return (
		<DataTable
			placeholder={<TablePlaceholder />}
			buttons={
				<>
					<RenderIf isTrue={refetch}>
						<button
							className="btn btn-alternative btn-xs"
							onClick={refetch}
						>
							<AiOutlineReload />
						</button>
					</RenderIf>
				</>
			}
			data={mapOrders({ orders, onClickUpdateOrder, onClickViewUser })}
			loading={isFetching}
			heading={heading}
			showPagination={showPagination}
			showSearch={showSearch}
		/>
	);
};

export default TableOrders;
