'use client';
import classNames from 'classnames';
import React from 'react';
import { CiStar } from 'react-icons/ci';
import ProductStatus from './ProductStatus';
import { Product } from '@teslo/interfaces';
import Link from 'next/link';
import Prices from '@/shared/Prices';
import SizeList from './SizeList';
import { PF } from '@/utils';
import LikeButton from './LikeButton';
import { viewPaths } from '@/utils';
import NcImage from '@/shared/NCImage';

export interface ProductCardProps {
	className?: string;
	data: Product;
}

const ProductCard: React.FunctionComponent<ProductCardProps> = props => {
	const { className, data } = props;
	const { title, price, description, images, slug } = data;
	const image = PF.product(images[0]);

	return (
		<div
			suppressHydrationWarning
			className={classNames('relative flex flex-col bg-transparent', className)}
		>
			<Link
				href={viewPaths.viewProduct(slug)}
				className="absolute inset-0"
			></Link>

			<div className="relative flex-shrink-Link0 bg-slate-50 rounded-3xl overflow-hidden z-1 group">
				<Link href={viewPaths.viewProduct(slug)} className="block">
					<NcImage
						containerClassName="flex aspect-w-11 aspect-h-12 w-full"
						src={image}
						className="object-cover w-full h-full drop-shadow-xl"
					/>
				</Link>

				<ProductStatus status={'New in'} />

				<LikeButton className="absolute top-3 right-3 z-10" />

				<SizeList image={image} product={data} />
			</div>

			<div className="space-y-4 px-2.5 pt-5 pb-2.5">
				<div>
					<h2 className={`text-base font-semibold transition-colors`}>
						{title}
					</h2>
					<p className={`text-sm text-slate-500 mt-1 `}>
						{description}
					</p>
				</div>

				<div className="flex justify-between items-end ">
					<Prices price={price} />
					<div className="flex items-center mb-0.5">
						<CiStar className="w-5 h-5 pb-[1px] text-amber-400" />
						<span className="text-sm ml-1 text-slate-500">
							(75 reviews)
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
