import { validPaths } from '@/utils';
import { Bill } from '@teslo/interfaces';
import * as React from 'react';
import { FaEdit, FaEye, FaFilePdf } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { HiFolderOpen } from 'react-icons/hi';

interface IActionsTableBillsProps {
	bill: Bill;
	onCancelBill: (bill: Bill) => void;
}

const ActionsTableBills: React.FunctionComponent<IActionsTableBillsProps> = props => {
	const { bill, onCancelBill } = props;
	const isCancelled = bill.status === 'cancelled';
	const handleCancelBill = () => onCancelBill(bill);
	return (
		<div className="flex items-center justify-center">
			<button type="button" className="btn btn-sm btn-warning px-2 5">
				<FaFilePdf />
			</button>

			<Link
				to={validPaths.viewBill.fnPath(bill.idbill)}
				className="btn btn-sm btn-success px-2.5"
			>
				<HiFolderOpen />
			</Link>

			<Link
				to={validPaths.editBill.fnPath(bill.idbill)}
				className="btn btn-sm btn-info px-2.5"
			>
				<FaEdit />
			</Link>

			<button
				className="btn btn-sm btn-danger px-2 py-1.5"
				disabled={isCancelled}
				onClick={handleCancelBill}
			>
				<TiCancel className="text-lg" />
			</button>
		</div>
	);
};

export default ActionsTableBills;
