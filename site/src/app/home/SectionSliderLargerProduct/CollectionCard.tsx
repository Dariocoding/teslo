import Prices from '@/shared/Prices';
import { PF, viewPaths } from '@/utils';
import { Product } from '@teslo/interfaces';
import Link from 'next/link';
import React from 'react';
import NcImage from '../../../shared/NCImage';

export interface CollectionCardProps {
	className?: string;
	product: Product;
}

const CollectionCard: React.FunctionComponent<CollectionCardProps> = props => {
	const { className, product } = props;
	const { images, title, description, price, slug } = product;
	return (
		<div className={`CollectionCard2 group relative ${className}`}>
			<div className="relative flex flex-col">
				<NcImage
					containerClassName="aspect-w-8 aspect-h-5 bg-neutral-100 rounded-2xl overflow-hidden"
					className="object-contain w-full h-full rounded-2xl"
					src={PF.product(images[0])}
				/>
				<div className="grid grid-cols-3 gap-2.5 mt-2.5">
					<NcImage
						containerClassName="w-full h-24 sm:h-28"
						className="object-cover w-full h-full rounded-2xl"
						src={PF.product(images[1])}
					/>
					<NcImage
						containerClassName="w-full h-24 sm:h-28"
						className="object-cover w-full h-full rounded-2xl"
						src={PF.product(images[2])}
					/>

					<NcImage
						containerClassName="w-full h-24 sm:h-28"
						className="object-cover w-full h-full rounded-2xl"
						src={PF.product(images[3])}
					/>
				</div>
			</div>

			<div className="relative mt-5 flex justify-between">
				<div className="flex-1">
					<h2 className="font-semibold text-lg sm:text-xl ">
						{title}
					</h2>
					<div className="mt-3 flex items-center text-slate-500 dark:text-slate-400">
						<span className="text-sm ">
							<span className="line-clamp-1">
								{description}
							</span>
						</span>
						<span className="h-5 mx-1 sm:mx-2 border-l border-slate-200 dark:border-slate-700"></span>
						{/* <StarIcon className="w-4 h-4 text-orange-400" /> */}
						<span className="text-sm ml-1 ">
							<span className="line-clamp-1">
								4.9 (269 reviews)
							</span>
						</span>
					</div>
				</div>
				<Prices className="mt-0.5 sm:mt-1 ml-4" price={price} />
			</div>
			<Link
				href={viewPaths.viewProduct(slug)}
				className="absolute inset-0 "
			></Link>
		</div>
	);
};

export default CollectionCard;
