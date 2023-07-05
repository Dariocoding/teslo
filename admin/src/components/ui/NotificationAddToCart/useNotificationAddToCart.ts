import { OptionsCart, useCartStore } from "@/store";
import { Product } from "@teslo/interfaces";
import { notifyAddTocart } from ".";
import { useNavigate } from "react-router-dom";
import { hideLoader, showLoader } from "../Loader";
import { detailTempOrdersService } from "@teslo/services";

export const useNotificationAddToCart = () => {
	const { addCart } = useCartStore();
	const navigate = useNavigate();

	return async (product: Product, opts: OptionsCart) => {
		try {
			showLoader();
			const res = await detailTempOrdersService.create({
				product,
				size: opts.size,
				qty: opts.qty,
			});

			addCart(res.data, opts);
			notifyAddTocart({ ...product, size: opts.size, qty: opts.qty }, navigate);
		} catch (error) {
			console.log(error);
		} finally {
			hideLoader();
		}
	};
};
