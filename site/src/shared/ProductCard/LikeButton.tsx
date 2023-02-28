'use client';
import classNames from 'classnames';
import { icons } from '@/utils';
import React from 'react';

export interface LikeButtonProps {
	className?: string;
	liked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = props => {
	const { className, liked } = props;
	const [isLiked, setIsLiked] = React.useState(liked);

	return (
		<button
			className={classNames(
				'w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200',
				className
			)}
			onClick={() => setIsLiked(!isLiked)}
		>
			<icons.Heart
				className={classNames(
					'w-5 h-5 transition',
					isLiked && 'text-red-500 fill-red-500 stroke-red-500'
				)}
			/>
		</button>
	);
};

export default LikeButton;
