'use client';
import classNames from 'classnames';
import Heading from '@/shared/Heading';
import { Product } from '@teslo/interfaces';
import React from 'react';
import Slider, { Settings } from 'react-slick';
import CollectionCard from './CollectionCard';

export interface SectionSliderLargeProductProps {
	className?: string;
	itemClassName?: string;
	products: Product[];
}

const settings: Settings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 3000,
	arrows: false,
	responsive: [
		{ breakpoint: 1350, settings: { slidesToShow: 2 } },
		{ breakpoint: 800, settings: { slidesToShow: 1 } },
	],
};

const SectionSliderLargeProduct: React.FC<SectionSliderLargeProductProps> = props => {
	const { className, products, itemClassName } = props;

	const sliderRef = React.useRef<Slider>();

	return (
		<div className={className}>
			<div className={'flow-root'}>
				<Heading
					isCenter={false}
					hasNextPrev
					onClickNext={() => sliderRef.current.slickNext()}
					onClickPrev={() => sliderRef.current.slickPrev()}
				>
					Chosen by our experts
				</Heading>
				<Slider {...settings} ref={sliderRef}>
					{products.map(product => (
						<CollectionCard
							className={classNames(
								itemClassName
									? itemClassName
									: 'px-2.5'
							)}
							product={product}
							key={product.id}
						/>
					))}

					<div className="px-2.5">
						<div className="block relative group">
							<div className="relative rounded-2xl overflow-hidden h-[410px]">
								<div className="h-[410px] bg-black/5 dark:bg-neutral-800"></div>
								<div className="absolute inset-y-6 inset-x-10  flex flex-col items-center justify-center">
									<div className="flex items-center justify-center relative">
										<span className="text-xl font-semibold">
											More items
										</span>
										<svg
											className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeMiterlimit="10"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M12 20.4999V3.66992"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeMiterlimit="10"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
									<span className="text-sm mt-1">
										Show me more
									</span>
								</div>
							</div>
						</div>
					</div>
				</Slider>
			</div>
		</div>
	);
};

export default SectionSliderLargeProduct;
