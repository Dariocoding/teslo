import RenderIf from '@teslo/react-ui/RenderIf';
import classNames from 'classnames';
import { icons } from '@/utils';
import React from 'react';

export interface NextPrevProps {
	className?: string;
	currentPage?: number;
	totalPage?: number;
	btnClassName?: string;
	onClickNext?: () => void;
	onClickPrev?: () => void;
	onlyNext?: boolean;
	onlyPrev?: boolean;
}

const NextPrev: React.FunctionComponent<NextPrevProps> = props => {
	const {
		className = '',
		onClickNext = () => {},
		onClickPrev = () => {},
		btnClassName = 'w-10 h-10',
		onlyNext = false,
		onlyPrev = false,
	} = props;
	const [focus, setFocus] = React.useState<'left' | 'right'>('right');

	return (
		<div
			className={`nc-NextPrev relative flex items-center text-slate-500 dark:text-slate-400 ${className}`}
			data-nc-id="NextPrev"
			data-glide-el="controls"
		>
			<RenderIf isTrue={!onlyNext}>
				<button
					className={classNames(
						'border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center',
						btnClassName,
						!onlyPrev && 'mr-2',
						focus === 'left' && 'border-2'
					)}
					onClick={e => {
						e.preventDefault();
						onClickPrev();
					}}
					title="Prev"
					onMouseEnter={() => setFocus('left')}
				>
					<icons.Prev className="w-5 h-5" />
				</button>
			</RenderIf>

			<RenderIf isTrue={!onlyPrev}>
				<button
					className={classNames(
						'border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center',
						btnClassName,
						!onlyPrev && 'mr-2',
						focus === 'right' && 'border-2'
					)}
					onClick={e => {
						e.preventDefault();
						onClickNext();
					}}
					title="Next"
					onMouseEnter={() => setFocus('right')}
				>
					<icons.Next className="w-5 h-5" />
				</button>
			</RenderIf>
		</div>
	);
};

export default NextPrev;
