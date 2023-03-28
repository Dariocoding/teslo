import { useCartStore } from '@/store';
import { formatter, viewPaths } from '@/utils';
import Link from 'next/link';
import * as React from 'react';
import RenderProduct from './RenderProduct';
import HeadingCheckout from './HeadingCheckout';
import SummaryCart from './SummaryCart';
import RenderIf from '@teslo/react-ui/RenderIf';

interface ICheckoutCartProps {}

const CheckoutCart: React.FunctionComponent<ICheckoutCartProps> = props => {
	const {} = props;
	const { cart } = useCartStore();
	const [checkoutPage, setCheckoutPage] = React.useState(false);

	return (
		<main className="container py-16 lg:pb-28 lg:pt-20 ">
			<HeadingCheckout
				checkoutPage={checkoutPage}
				setCheckoutPage={setCheckoutPage}
			/>

			<RenderIf isTrue={!checkoutPage}>
				<hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

				<div className="flex flex-col lg:flex-row">
					<div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
						{cart.map((product, key) => (
							<RenderProduct
								product={product}
								key={key}
							/>
						))}
					</div>
					<div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
					<SummaryCart
						checkoutPage={checkoutPage}
						setCheckoutPage={setCheckoutPage}
					/>
				</div>
			</RenderIf>
		</main>
	);
};

export default CheckoutCart;
