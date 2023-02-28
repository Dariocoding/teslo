import classNames from 'classnames';
import { CiClock1, CiDiscount1 } from 'react-icons/ci';
import { MdOutlineDoNotDisturb } from 'react-icons/md';
import { HiOutlineSparkles } from 'react-icons/hi';
import React from 'react';

interface Props {
	status: string;
	className?: string;
}

const ProductStatus: React.FunctionComponent<Props> = props => {
	const {
		status,
		className = 'absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300',
	} = props;

	if (!status) {
		return null;
	}
	const CLASSES = classNames('rounded-full flex items-center justify-center', className);

	if (status === 'New in') {
		return (
			<div className={CLASSES}>
				<HiOutlineSparkles className="w-3.5 h-3.5" />
				<span className="ml-1 leading-none">{status}</span>
			</div>
		);
	}
	if (status === '50% Discount') {
		return (
			<div className={CLASSES}>
				<CiDiscount1 className="w-3.5 h-3.5" />
				<span className="ml-1 leading-none">{status}</span>
			</div>
		);
	}
	if (status === 'Sold Out') {
		return (
			<div className={CLASSES}>
				<MdOutlineDoNotDisturb className="w-3.5 h-3.5" />
				<span className="ml-1 leading-none">{status}</span>
			</div>
		);
	}

	if (status === 'limited edition') {
		return (
			<div className={CLASSES}>
				<CiClock1 className="w-3.5 h-3.5" />
				<span className="ml-1 leading-none">{status}</span>
			</div>
		);
	}

	return null;
};

export default ProductStatus;
