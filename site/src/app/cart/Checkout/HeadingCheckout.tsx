import { viewPaths } from '@/utils';
import RenderIf from '@teslo/react-ui/RenderIf';
import classNames from 'classnames';
import Link from 'next/link';
import * as React from 'react';

interface IHeadingCheckoutProps {
	checkoutPage?: boolean;
	setCheckoutPage(value: boolean): void;
}

const HeadingCheckout: React.FunctionComponent<IHeadingCheckoutProps> = props => {
	const { checkoutPage, setCheckoutPage } = props;
	return (
		<div className="mb-12 sm:mb-16">
			<h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
				{checkoutPage ? 'Checkout' : 'Shopping Cart'}
			</h2>
			<div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
				<Link href={viewPaths.home} className="">
					Homepage
				</Link>
				<span className="text-xs mx-1 sm:mx-1.5">/</span>
				<span
					className={classNames(
						'underline',
						checkoutPage && 'cursor-pointer'
					)}
					onClick={
						checkoutPage
							? () => setCheckoutPage(false)
							: undefined
					}
				>
					Shopping Cart
				</span>

				<RenderIf isTrue={checkoutPage}>
					<span className="text-xs mx-1 sm:mx-1.5">/</span>
					<span className="underline">Checkout</span>
				</RenderIf>
			</div>
		</div>
	);
};

export default HeadingCheckout;
