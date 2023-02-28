import React from 'react';
import classNames from 'classnames';
import FormDontMissOutOffer from './FormDontMissOutOffer';
import NcImage from '../../../shared/NCImage';

export interface DontMissOutSpecialOffersProps {
	className?: string;
}

const DontMissOutSpecialOffers: React.FunctionComponent<DontMissOutSpecialOffersProps> = props => {
	const { className } = props;
	return (
		<div className={classNames(className ? className : 'lg:pt-10')}>
			<div className="relative flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
				<div className="absolute inset-0">
					<img
						className="absolute w-full h-full object-contain object-bottom dark:opacity-5"
						src={'/images/BackgroundLine.svg'}
						alt="backgroundLineSvg"
					/>
				</div>

				<div className="lg:w-[50%] max-w-lg relative">
					<h2 className="font-semibold text-4xl md:text-5xl">
						Don't miss out on special offers
					</h2>
					<span className="block mt-5 text-neutral-500 dark:text-neutral-400">
						Register to receive news about the latest, savings
						combos, discount codes...
					</span>
					<ul className="space-y-4 mt-10">
						<li className="flex items-center space-x-4">
							<button className="btn btn-pill btn-sm bg-purple-400">
								01
							</button>
							<span className="font-medium text-neutral-700 dark:text-neutral-300">
								Savings combos
							</span>
						</li>
						<li className="flex items-center space-x-4">
							<button className="btn btn-pill btn-sm bg-red-400">
								02
							</button>
							<span className="font-medium text-neutral-700 dark:text-neutral-300">
								Freeship
							</span>
						</li>
						<li className="flex items-center space-x-4">
							<button className="btn btn-pill btn-sm bg-blue-400">
								03
							</button>
							<span className="font-medium text-neutral-700 dark:text-neutral-300">
								Premium magazines
							</span>
						</li>
					</ul>
					<FormDontMissOutOffer />
				</div>

				<NcImage
					containerClassName="relative block lg:absolute lg:right-0 lg:bottom-0 mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)]"
					src={'/images/promo3.png'}
				/>
			</div>
		</div>
	);
};

export default DontMissOutSpecialOffers;
