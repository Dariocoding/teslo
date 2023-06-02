import { TablePlaceholder } from '@/components/placeholders';
import { Bill, ValidStatusOrder } from '@teslo/interfaces';
import DataTable from '@teslo/react-ui/DataTable';
import * as React from 'react';
import defaultHeadingBills from './heading';
import { formatter } from '@/utils';
import dayjs from 'dayjs';
import ButtonsTableBills from './ButtonsTableBills';
import BadgeStatusOrder from '@/app/orders/TableOrders/BadgeStatusOrder';
import ActionsTableBills from './ActionsTableBills';
import { billsService } from '@teslo/services';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface IDataTableBillsProps {
	bills: Bill[];
	setBills: React.Dispatch<Bill[]>;
	isLoading: boolean;
	showSelects?: boolean;
}

const DataTableBills: React.FunctionComponent<IDataTableBillsProps> = props => {
	const { bills, setBills, isLoading, showSelects = true } = props;
	const [isLoadingTable, setIsLoadingTable] = React.useState(false);

	const onCancelBill = (billToCancel: Bill) => {
		confirmAlert({
			title: '¿Are you sure you want to cancel this order?',
			message: 'Are you sure to do this.',
			buttons: [
				{
					label: 'Yes',
					onClick: async () => {
						const req = await billsService.updateBill(
							billToCancel.idbill,
							{ status: ValidStatusOrder.CANCELED }
						);
						setBills(
							bills.map(bill =>
								bill.idbill === billToCancel.idbill
									? { ...req.data }
									: bill
							)
						);
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	};

	return (
		<DataTable
			buttons={
				<ButtonsTableBills
					setBills={setBills}
					setIsLoadingTable={setIsLoadingTable}
					showSelects={showSelects}
				/>
			}
			data={bills?.map?.(bill => ({
				...bill,
				dateCreatedFormatted: dayjs(bill.dateCreated).format(
					'DD/MM/YYYY HH:mm'
				),
				dateUpdatedFormatted: dayjs(bill.dateUpdated).format(
					'DD/MM/YYYY HH:mm'
				),
				taxFormatted: `${bill.tax || 0}%`,
				subtotalFormatted: formatter.format(bill.subtotal || 0),
				totalFormatted: formatter.format(bill.total || 0),
				statusFormatted: <BadgeStatusOrder status={bill.status} />,
				deliveryFormatted: formatter.format(bill.delivery || 0),
				actions: (
					<ActionsTableBills
						bill={bill}
						onCancelBill={onCancelBill}
					/>
				),
			}))}
			showResponsive={false}
			heading={defaultHeadingBills}
			placeholder={<TablePlaceholder />}
			loading={isLoading || isLoadingTable}
		/>
	);
};

export default DataTableBills;
