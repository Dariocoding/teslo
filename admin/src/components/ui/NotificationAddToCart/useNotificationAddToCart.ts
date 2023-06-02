import { OptionsCart, useCartStore } from '@/store';
import { Product } from '@teslo/interfaces';
import { notifyAddTocart } from '.';
import { useNavigate } from 'react-router-dom';

export const useNotificationAddToCart = () => {
	const { addCart } = useCartStore();
	const navigate = useNavigate();

	return (product: Product, opts: OptionsCart) => {
		addCart(product, opts);
		notifyAddTocart(
			{ ...product, size: opts.size, image: opts.image, qty: opts.qty },
			navigate
		);
	};
};
