'use client';
import React from 'react';
import Heading from '@/shared/Heading';
import classNames from 'classnames';
import CardCategory3, { CardCategory3Props } from './CardCategory3';
import Slider, { Settings } from 'react-slick';

export const CATS_DISCOVER: CardCategory3Props[] = [
	{
		name: 'Explore new arrivals',
		desc: 'Shop the latest <br /> from top brands',
		featuredImage: '/images/collections/1.png',
		color: 'bg-yellow-500',
	},
	{
		name: 'Digital gift cards',
		desc: 'Give the gift <br /> of choice',
		featuredImage: '/images/collections/2.png',
		color: 'bg-red-500',
	},
	{
		name: 'Sale collection',
		desc: 'Up to <br /> 80% off retail',
		featuredImage: '/images/collections/3.png',
		color: 'bg-blue-500',
	},
	{
		name: 'Sale collection',
		desc: 'Up to <br /> 80% off retail',
		featuredImage: '/images/collections/4.png',
		color: 'bg-green-500',
	},
];

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

const DiscoverMoreSlider = () => {
	const id = React.useId();
	const refSlider = React.useRef<Slider>();

	React.useEffect(() => {}, []);

	const next = () => refSlider.current.slickNext();
	const prev = () => refSlider.current.slickPrev();

	return (
		<div className={classNames('py-12')}>
			<Heading
				className="mb-8 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
				desc=""
				hasNextPrev
				rightDescText="Good things are waiting for you"
				onClickNext={next}
				onClickPrev={prev}
			>
				Discover more
			</Heading>
			<Slider ref={refSlider} {...settings}>
				{CATS_DISCOVER.map((item, idx) => (
					<CardCategory3 key={idx} {...item} />
				))}
			</Slider>
		</div>
	);
};

export default DiscoverMoreSlider;
