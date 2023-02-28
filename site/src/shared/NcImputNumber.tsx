import classNames from 'classnames';
import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

export interface NcInputNumberProps {
	className?: string;
	defaultValue?: number;
	min?: number;
	max?: number;
	onChange?: (value: number) => void;
	label?: string;
	desc?: string;
}

const NcInputNumber: React.FunctionComponent<NcInputNumberProps> = props => {
	const {
		className = 'w-full',
		defaultValue = 1,
		min = 1,
		max = 99,
		onChange,
		label,
		desc,
	} = props;
	const [value, setValue] = React.useState(defaultValue);

	React.useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	const handleClickDecrement = () => {
		if (min >= value) return;
		setValue(state => {
			return state - 1;
		});
		onChange && onChange(value - 1);
	};
	const handleClickIncrement = () => {
		if (max && max <= value) return;
		setValue(state => {
			return state + 1;
		});
		onChange && onChange(value + 1);
	};

	const renderLabel = () => {
		return (
			<div className="flex flex-col">
				<span className="font-medium text-neutral-800 dark:text-neutral-200">
					{label}
				</span>
				{desc && (
					<span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
						{desc}
					</span>
				)}
			</div>
		);
	};

	return (
		<div
			className={classNames(
				'flex items-center justify-between space-x-5',
				className
			)}
		>
			{label && renderLabel()}

			<div className={'flex items-center justify-between w-[104px] sm:w-28'}>
				<button
					className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
					type="button"
					onClick={handleClickDecrement}
					disabled={min >= value}
				>
					<FaMinus className="w-4 h-4" />
				</button>
				<span className="select-none block flex-1 text-center leading-none">
					{value}
				</span>
				<button
					className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
					type="button"
					onClick={handleClickIncrement}
					disabled={max ? max <= value : false}
				>
					<FaPlus className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
};

export default NcInputNumber;
