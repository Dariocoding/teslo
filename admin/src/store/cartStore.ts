import { Product, Size } from "@teslo/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OptionsCart {
  qty: number;
  size: Size;
  image?: string;
}

export interface Cart extends Product, OptionsCart {}

interface CartStoreValues {
  cart: Cart[];
  addCart(product: Product, opts: OptionsCart): void;
  removeCart(product: Cart, opts: OptionsCart): void;
  removeCartItem(cart: Cart): void;
  clean(): void;
}

export const useCartStore = create(
  persist<CartStoreValues>(
    (set) => ({
      cart: [],
      addCart(product, opts) {
        const { size, image, qty } = opts;
        set((cartStore) => {
          const isInCart = cartStore.cart.some((p) => p.id === product.id && p.size === size);
          let cart: Cart[];

          if (!isInCart) {
            cart = [...cartStore.cart, { ...product, qty, size, image }];
          } else {
            cart = cartStore.cart.map((p) => {
              if (p.id === product.id && p.size === size) {
                p.qty += qty;
              }
              return p;
            });
          }

          return { ...cartStore, cart };
        });
      },
      removeCart(product, opts) {
        const { size, qty } = opts;
        set((cartStore) => {
          const isInCart = cartStore.cart.some((p) => p.id === product.id && p.size === size);
          if (!isInCart) return { ...cartStore };

          const cartItem = cartStore.cart.find((p) => p.id === product.id && p.size === size);

          const result = cartItem.qty - qty;
          if (result <= 0) {
            return {
              ...cartStore,
              cart: cartStore.cart.filter((c) => {
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
            cart: cartStore.cart.map((p) => {
              if (p.id === product.id && p.size === size) {
                p.qty -= qty;
              }
              return p;
            }),
          };
        });
      },
      removeCartItem(cart: Cart) {
        set((cartStore) => ({
          ...cartStore,
          cart: cartStore.cart.filter((c) => {
            const sameid = c.id === cart.id;
            if (!sameid) return true;
            const samesize = c.size === cart.size;
            if (samesize) return false;
            return true;
          }),
        }));
      },
      clean() {
        set({ cart: [] });
      },
    }),
    { name: "state-cart" }
  )
);
