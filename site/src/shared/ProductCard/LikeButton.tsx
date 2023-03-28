'use client';
import classNames from 'classnames';
import { usersService } from '@teslo/services';
import { icons } from '@/utils';
import React from 'react';
import { useAuthStore } from '@/store';
import { toast } from 'react-hot-toast';
import { emptyUser } from '@/utils/emptyUser';
import { FaInfoCircle } from 'react-icons/fa';
import { Product } from '@teslo/interfaces';
import useIsCSR from '@/utils/hooks/useIsCSR';
import { useSelectFavoriteProduct } from './hooks/useSelectFavoriteProduct';

export interface LikeButtonProps {
	product: Product;
	className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = props => {
	const { className, product } = props;
	const isCSR = useIsCSR();
	const { onClick, isLiked } = useSelectFavoriteProduct(product);

	return (
		<button
			className={classNames(
				'w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 z-[1]',
				className
			)}
			onClick={onClick}
		>
			<icons.Heart
				className={classNames(
					'w-5 h-5 transition',
					isCSR &&
						isLiked &&
						'text-red-500 fill-red-500 stroke-red-500'
				)}
			/>
		</button>
	);
};

export default LikeButton;
