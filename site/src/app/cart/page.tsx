'use client';
import WaitForAuthentication from '@/shared/routes/WaitForAuthentication';
import { useAuthStore, useCartStore } from '@/store';
import RenderIf from '@teslo/react-ui/RenderIf';
import * as React from 'react';
import CheckoutCart from './Checkout';
import PleaseAddItemsToCart from './PleaseAddItemsToCart';
import PleaseAuthenticateCart from './PleaseAuthenticateCart';

const CartPage: React.FunctionComponent = () => {
	const { authenticated } = useAuthStore();
	const { cart } = useCartStore();

	return (
		<WaitForAuthentication>
			<RenderIf isTrue={authenticated}>
				<RenderIf isTrue={cart.length}>
					<CheckoutCart />
				</RenderIf>

				<RenderIf isTrue={!cart.length}>
					<PleaseAddItemsToCart />
				</RenderIf>
			</RenderIf>
			<RenderIf isTrue={!authenticated}>
				<PleaseAuthenticateCart />
			</RenderIf>
		</WaitForAuthentication>
	);
};

export default CartPage;
