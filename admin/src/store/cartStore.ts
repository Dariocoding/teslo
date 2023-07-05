import { hideLoader, showLoader } from "@/components/ui/Loader";
import { DetailOrderTemp } from "@teslo/interfaces";
import { detailTempOrdersService } from "@teslo/services";
import { create } from "zustand";

export interface OptionsCart extends Pick<DetailOrderTemp, "size" | "qty"> {
	sameQty?: boolean;
}

export interface Cart extends DetailOrderTemp, OptionsCart {}

interface CartStoreValues {
	cart: Cart[];
	addCart(detail: DetailOrderTemp, opts: OptionsCart): void;
	removeCart(detail: Cart, opts: OptionsCart): void;
	removeCartItem(cart: Cart): void;
	clean(): Promise<void>;
	setCart(detail: DetailOrderTemp[]): void;
}

export const useCartStore = create<CartStoreValues>(set => ({
	cart: [],
	addCart(detail, opts) {
		const { size, qty, sameQty } = opts;
		set(cartStore => {
			const isInCart = cartStore.cart.some(
				p => p.product.id === detail.product.id && p.size === size
			);
			let cart: Cart[];

			if (!isInCart) {
				cart = [detail, ...cartStore.cart];
			} else {
				cart = cartStore.cart.map(p => {
					if (p.product.id === detail.product.id && p.size === size) {
						if (sameQty) {
							p.qty = qty;
						} else {
							p.qty += qty;
						}
					}
					return p;
				});
			}

			return { ...cartStore, cart };
		});
	},
	removeCart(product, opts) {
		const { size, qty } = opts;
		set(cartStore => {
			const isInCart = cartStore.cart.some(p => p.id === product.id && p.size === size);
			if (!isInCart) return { ...cartStore };

			const cartItem = cartStore.cart.find(p => p.id === product.id && p.size === size);

			const result = cartItem.qty - qty;
			if (result <= 0) {
				return {
					...cartStore,
					cart: cartStore.cart.filter(c => {
						const sameid = c.id === product.id;
						if (!sameid) return true;
						const samesize = c.size === size;
						if (samesize) return false;
						return true;
					}),
				};
			}

			return {
				...cartStore,
				cart: cartStore.cart.map(p => {
					if (p.id === product.id && p.size === size) {
						p.qty -= qty;
					}
					return p;
				}),
			};
		});
	},
	removeCartItem(cart: Cart) {
		set(cartStore => ({
			...cartStore,
			cart: cartStore.cart.filter(c => {
				const sameid = c.id === cart.id;
				if (!sameid) return true;
				const samesize = c.size === cart.size;
				if (samesize) return false;
				return true;
			}),
		}));
	},
	async clean() {
		try {
			showLoader();
			await detailTempOrdersService.deleteAll();
			set({ cart: [] });
		} catch (error) {
			console.log(error);
		} finally {
			hideLoader();
		}
	},
	setCart(cart: DetailOrderTemp[]) {
		set({ cart });
	},
}));
