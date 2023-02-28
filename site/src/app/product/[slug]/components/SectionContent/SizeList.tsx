import { ARRSIZES, Product, Size } from '@teslo/interfaces';
import classNames from 'classnames';
import * as React from 'react';

interface ISizeListProps {
	product: Product;
	sizeSelected: Size;
	setSizeSelected: React.Dispatch<Size>;
}

const sizeOutStock = false;

const SizeList: React.FunctionComponent<ISizeListProps> = props => {
	const { sizeSelected, setSizeSelected, product } = props;

	return (
		<div>
			<div className="flex justify-between font-medium text-sm">
				<label htmlFor="">
					<span className="">
						Size:
						<span className="ml-1 font-semibold">
							{sizeSelected}
						</span>
					</span>
				</label>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="##"
					className="text-blue-500 hover:text-blue-500"
				>
					See sizing chart
				</a>
			</div>
			<div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
				{product.sizes.map((size, index) => {
					const isActive = size === sizeSelected;
					return (
						<div
							key={index}
							className={classNames(
								'relative h-10 sm:h-11 rounded-2xl border flex items-center',
								'justify-center text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0',
								isActive
									? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-600'
									: 'border-slate-300 text-slate-900 hover:bg-neutral-50'
							)}
							onClick={() => {
								if (sizeOutStock) return;
								setSizeSelected(size);
							}}
						>
							{size}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SizeList;
