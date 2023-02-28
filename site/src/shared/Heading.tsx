import NextPrev from '@/shared/NextPrev';
import RenderIf from '@teslo/react-ui/RenderIf';
import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	fontClass?: string;
	rightDescText?: React.ReactNode;
	rightPopoverOptions?: typeof solutions;
	desc?: React.ReactNode;
	hasNextPrev?: boolean;
	isCenter?: boolean;
	onClickNext?(): void;
	onClickPrev?(): void;
}

const solutions = [
	{
		name: 'last 24 hours',
		href: '##',
	},
	{
		name: 'last 7 days',
		href: '##',
	},
	{
		name: 'last 30 days',
		href: '##',
	},
];

const Heading: React.FC<HeadingProps> = props => {
	const {
		children,
		desc = '',
		className = 'mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50',
		isCenter = false,
		hasNextPrev = false,
		fontClass = 'text-3xl md:text-4xl font-semibold',
		rightDescText,
		rightPopoverOptions = solutions,
		onClickNext = () => {},
		onClickPrev = () => {},
		...args
	} = props;

	return (
		<div
			className={classNames(
				'relative flex flex-col sm:flex-row sm:items-end justify-between',
				className
			)}
		>
			<div
				className={classNames(
					isCenter &&
						'flex flex-col items-center text-center w-full mx-auto'
				)}
			>
				<h2
					className={classNames(
						isCenter && 'justify-center',
						fontClass
					)}
					{...args}
				>
					{children || `Section Heading`}
					<RenderIf isTrue={rightDescText}>
						<span className="">{`. `}</span>
						<span className="text-neutral-500 dark:text-neutral-400">
							{rightDescText}
						</span>
					</RenderIf>
				</h2>
				<RenderIf isTrue={!!desc}>
					<span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
						{desc}
					</span>
				</RenderIf>
			</div>
			<RenderIf isTrue={hasNextPrev && !isCenter}>
				<div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
					<NextPrev
						onClickNext={onClickNext}
						onClickPrev={onClickPrev}
					/>
				</div>
			</RenderIf>
		</div>
	);
};

export default Heading;
