import Prices from '@/shared/Prices';
import { Product } from '@teslo/interfaces';
import * as React from 'react';
import { CiStar } from 'react-icons/ci';
import { HiOutlineSparkles } from 'react-icons/hi';
import AccordionInfo from './Accordion';
import AddCartProduct from './AddCartProduct';
import ButtonsProduct from './ButtonsProduct';
import Policy from './Policy';

interface ISectionContentProps {
	product: Product;
}

const SectionContent: React.FunctionComponent<ISectionContentProps> = props => {
	const { product } = props;
	return (
		<div className="space-y-7 2xl:space-y-8">
			<div>
				<h2 className="text-2xl sm:text-3xl font-semibold">
					{product.title}
				</h2>

				<div className="flex items-center mt-5 space-x-4 sm:space-x-5">
					{/* <div className="flex text-xl font-semibold">$112.00</div> */}
					<Prices
						contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
						price={product.price}
					/>

					<div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

					<div className="flex items-center">
						<a
							href="#reviews"
							className="flex items-center text-sm font-medium"
						>
							<CiStar className="w-5 h-5 pb-[1px] text-yellow-400" />
							<div className="ml-1.5 flex">
								<span>4.9</span>
								<span className="block mx-2">
									·
								</span>
								<span className="text-slate-600 dark:text-slate-400 underline">
									142 reviews
								</span>
							</div>
						</a>
						<span className="hidden sm:block mx-2.5">·</span>
						<div className="hidden sm:flex items-center text-sm">
							<HiOutlineSparkles className="w-3.5 h-3.5" />
							<span className="ml-1 leading-none">
								New In
							</span>
						</div>
					</div>
				</div>
			</div>

			<hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>

			<AddCartProduct product={product} />

			<AccordionInfo />

			<div className="hidden xl:block">
				<Policy />
			</div>
		</div>
	);
};

export default SectionContent;
