import { OptionsCart, useCartStore } from '@/store';
import { Product } from '@teslo/interfaces';
import { notifyAddTocart } from '../NotifyAddToCart';

export const useNotificationAddToCart = () => {
	const { addCart } = useCartStore();

	return (product: Product, opts: OptionsCart) => {
		addCart(product, opts);
		notifyAddTocart({ ...product, size: opts.size, image: opts.image, qty: opts.qty });
	};
};
