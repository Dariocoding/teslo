import { Bill, ValidStatusOrder } from '@teslo/interfaces';
import * as React from 'react';
import EnterpriseInfo from '../shared/EnterpriseInfo';
import TableBillProducts from './TableBillProducts';
import dayjs from 'dayjs';
import BadgeStatusOrder from '@/app/orders/TableOrders/BadgeStatusOrder';
import { Link } from 'react-router-dom';
import { validPaths } from '@/utils';
import { FaEdit, FaFilePdf } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import RenderIf from '@teslo/react-ui/RenderIf';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { billsService } from '@teslo/services';

interface IBillInfoProps {
	bill: Bill;
	setBill: (bill: Bill) => void;
}

const BillInfo: React.FunctionComponent<IBillInfoProps> = props => {
	const { bill, setBill } = props;

	const onCancelBill = () => {
		confirmAlert({
			title: '¿Are you sure you want to cancel this order?',
			message: 'Are you sure to do this.',
			buttons: [
				{
					label: 'Yes',
					onClick: async () => {
						const req = await billsService.updateBill(
							bill.idbill,
							{ status: ValidStatusOrder.CANCELED }
						);
						setBill({ ...req.data });
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
		<div className="tile p-0 max-w-[900px] mx-auto">
			<div className="p-4 border-b border-gray-200">
				<EnterpriseInfo />
			</div>
			<div className="p-4">
				<div className="mb-6">
					<h6 className="font-semibold text-lg">
						<div className="flex items-center">
							<span className="text-xl">Bill</span>{' '}
							<BadgeStatusOrder
								full={false}
								status={bill.status}
								className="px-2 py-0.5 rounded-md text-[10px] mb-0 ml-1.5"
							/>
						</div>
					</h6>
					<div className="flex lg:items-center items-start justify-start lg:justify-between lg:mt-1 lg:flex-row flex-col">
						<div className="text-xs">
							<strong>ID:</strong> {bill.idbill}
						</div>
						<div className="text-xs">
							<strong>Reference:</strong>{' '}
							{bill.reference || 'No reference'}
						</div>
					</div>

					<div className="flex lg:items-center items-start justify-start lg:justify-between lg:mt-1 lg:flex-row flex-col">
						<div className="text-xs">
							<strong>Date Created:</strong>{' '}
							{dayjs(bill.dateCreated).format(
								'DD/MM/YYYY HH:mm'
							)}
						</div>
						<div className="text-xs">
							<strong>Date Updated:</strong>{' '}
							{dayjs(bill.dateUpdated).format(
								'DD/MM/YYYY HH:mm'
							)}
						</div>
					</div>
				</div>
				<div>
					<h6 className="font-semibold text-lg">Provider</h6>
					<div className="flex items-start justify-start lg:gap-1 mt-1 flex-col">
						<div className="flex lg:items-center items-start justify-start lg:justify-between w-full lg:flex-row flex-col text-xs">
							<div>
								<strong>Name:</strong>{' '}
								{bill?.provider?.name}
							</div>
							<div>
								<strong>Email:</strong>{' '}
								{bill?.provider?.email}
							</div>
						</div>

						<div className="flex lg:items-center items-start justify-start lg:justify-between w-full lg:flex-row flex-col text-xs">
							<div>
								<strong>Phone1:</strong>{' '}
								{bill?.provider?.phone1}
							</div>
							<div>
								<strong>Phone2:</strong>{' '}
								{bill?.provider?.phone2}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-6">
					<TableBillProducts bill={bill} />
				</div>

				<div className="mt-4">
					<div className="flex items-center justify-between gap-x-1">
						<Link
							to={validPaths.editBill.fnPath(bill.idbill)}
							className="btn btn-primary btn-sm w-full"
						>
							Edit <FaEdit className="ml-1" />
						</Link>
						<button
							type="button"
							disabled={
								bill.status ===
								ValidStatusOrder.CANCELED
							}
							onClick={onCancelBill}
							className="btn btn-danger btn-sm w-full mr-0"
						>
							Delete
							<TiCancel className="ml-1" />
						</button>
					</div>
					<button
						type="button"
						className="w-full btn btn-warning btn-xs lg:flex hidden"
					>
						Export as PDF <FaFilePdf className="ml-1" />
					</button>
				</div>

				<RenderIf isTrue={bill.description}>
					<div className="mt-4">
						<div>
							<h6 className="font-semibold text-lg">
								Description
							</h6>
							<p className="text-xs">
								{bill.description}
							</p>
						</div>
					</div>
				</RenderIf>
			</div>
		</div>
	);
};

export default BillInfo;
