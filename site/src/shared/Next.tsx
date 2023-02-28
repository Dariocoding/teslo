import React from 'react';
import classNames from 'classnames';
import { icons } from '@/utils';

export interface NextProps {
	btnClassName?: string;
	className?: string;
	svgClassName?: string;
	onClickNext?: () => void;
}

const Next: React.FunctionComponent<NextProps> = props => {
	const {
		className = 'relative',
		onClickNext,
		btnClassName = 'w-10 h-10',
		svgClassName = 'w-5 h-5',
	} = props;
	return (
		<div className={classNames('text-slate-500 dark:text-slate-400', className)}>
			<button
				className={`${btnClassName} rounded-full flex items-center justify-center border-2 hover:border-slate-200 dark:hover:border-slate-600 border-transparent`}
				onClick={onClickNext}
				title="Next"
				data-glide-dir=">"
			>
				<icons.Next className={classNames(svgClassName)} />
			</button>
		</div>
	);
};

export default Next;
