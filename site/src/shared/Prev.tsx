import React from 'react';
import classNames from 'classnames';
import { icons } from '@/utils';

export interface PrevProps {
	btnClassName?: string;
	className?: string;
	svgClassName?: string;
	onClickPrev?: () => void;
}

const Prev: React.FunctionComponent<PrevProps> = props => {
	const {
		className = 'relative',
		onClickPrev,
		btnClassName = 'w-10 h-10',
		svgClassName = 'w-5 h-5',
	} = props;

	return (
		<div className={classNames('text-slate-500 dark:text-slate-400', className)}>
			<button
				className={classNames(
					'rounded-full flex items-center justify-center border-2 hover:border-slate-200 dark:hover:border-slate-600 border-transparent',
					btnClassName
				)}
				onClick={onClickPrev}
				title="Prev"
			>
				<icons.Prev className={svgClassName} />
			</button>
		</div>
	);
};

export default Prev;
