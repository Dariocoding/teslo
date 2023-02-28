'use client';
import classNames from 'classnames';
import Heading from '@/shared/Heading';
import { Product } from '@teslo/interfaces';
import React from 'react';
import Slider, { Settings } from 'react-slick';
import ProductCard from '@/shared/ProductCard';

export interface SectionSliderProductCardProps {
	className?: string;
	itemClassName?: string;
	heading?: string;
	headingFontClassName?: string;
	headingClassName?: string;
	subHeading?: string;
	data?: Product[];
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

const SectionSliderProductCard: React.FunctionComponent<SectionSliderProductCardProps> = props => {
	const {
		className,
		itemClassName,
		headingFontClassName,
		headingClassName,
		heading,
		subHeading = 'REY backpacks & bags',
		data = [],
	} = props;
	const sliderRef = React.useRef<Slider>();

	return (
		<div className={className} suppressHydrationWarning>
			<div className={'flow-root'}>
				<Heading
					className={headingClassName}
					fontClass={headingFontClassName}
					rightDescText={subHeading}
					hasNextPrev
					onClickNext={() => sliderRef.current.slickNext()}
					onClickPrev={() => sliderRef.current.slickPrev()}
				>
					{heading || `New Arrivals`}
				</Heading>
				<Slider {...settings} ref={sliderRef}>
					{data.map((item, index) => (
						<div
							key={index}
							className={classNames(
								'px-2.5',
								itemClassName
							)}
						>
							<ProductCard data={item} />
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default SectionSliderProductCard;
