import { OptionsCart, useCartStore } from "@/store";
import { Product } from "@teslo/interfaces";
import { notifyAddTocart } from ".";
import { useNavigate } from "react-router-dom";
import { hideLoader, showLoader } from "../Loader";
import { detailTempOrdersService } from "@teslo/services";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";

export const useNotificationAddToCart = () => {
	const { addCart, cart } = useCartStore();
	const { formatMessage: t } = useIntl();
	const navigate = useNavigate();

	return async (product: Product, opts: OptionsCart) => {
		try {
			showLoader();
			const productTemp = cart.find(p => p.product.id === product.id);

			if (productTemp) {
				const isGreaterThanStock = product.stock < productTemp.qty + opts.qty;
				if (isGreaterThanStock) {
					return toast.error(
						t(
							{ id: "orders.stockMustBeGreaterThan" },
							{ qty: productTemp.qty + opts.qty }
						)
					);
				}
			}

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
