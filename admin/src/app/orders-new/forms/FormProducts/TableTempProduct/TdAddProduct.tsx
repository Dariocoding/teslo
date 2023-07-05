import RenderIf from "@teslo/react-ui/RenderIf";
import * as React from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useOrdersFormContext } from "../../FormContainer";
import { detailTempOrdersService } from "@teslo/services";
import { useCartStore } from "@/store";
import { hideLoader, showLoader } from "@/components/ui/Loader";

interface ITdAddProductProps {}

const TdAddProduct: React.FunctionComponent<ITdAddProductProps> = props => {
	const {} = props;
	const { addCart } = useCartStore();
	const { values, setValues } = useOrdersFormContext();
	const { tempProduct, tempQty } = values;

	const addProductToStorage = async () => {
		if (!tempProduct?.id && !tempProduct?.stock) return;
		if (tempProduct?.stock < tempQty) {
			return toast.error(`Stock must be greater than or equal to (qty)=${tempQty}`);
		}

		try {
			showLoader();

			const req = await detailTempOrdersService.create({
				product: values.tempProduct,
				qty: values.tempQty,
				size: values.tempSize,
			});

			if (values.products.some(p => p.product.id === values.tempProduct?.id)) {
				const productOld = values.products.find(
					p => p.product.id === values.tempProduct?.id
				);
				if (productOld) {
					addCart(req.data, { size: req.data.size, qty: req.data.qty - productOld.qty });
				}
			} else {
				addCart(req.data, { size: req.data.size, qty: req.data.qty });
			}

			setValues({
				...values,
				tempProduct: {},
				searchProduct: "",
				products: values.products.some(p => p.product.id === values.tempProduct.id)
					? values.products.map(p =>
							p.product.id === values.tempProduct.id ? req.data : p
					  )
					: [req.data, ...values.products],
			});

			toast.success("Product added sucessfully!");
			const inputCode = document.getElementById("searchProduct");
			if (inputCode) inputCode.focus();
		} catch (error) {
			console.log(error);
			toast.error("Ha ocurrido un error...");
		} finally {
			hideLoader();
		}
	};

	React.useEffect(() => {
		function onKeyDownPres(event: KeyboardEvent) {
			if (event.key === "Enter") addProductToStorage();
		}

		window.addEventListener("keydown", onKeyDownPres);

		return () => {
			window.removeEventListener("keydown", onKeyDownPres);
		};
	}, [addProductToStorage]);

	return (
		<td className="bg-white px-2 py-3">
			<RenderIf
				isTrue={
					Boolean(+values.tempProduct?.price * values.tempQty) &&
					values.tempProduct?.stock
				}
			>
				<span
					onClick={addProductToStorage}
					className="flex item-center justify-center mx-auto gap-1 w-fit rounded-md text-xs text-teal-600 cursor-pointer px-2 py-1 border-teal-600 hover:bg-teal-600 hover:text-white transition"
				>
					<FaPlus className="mt-0.5" /> <span>Agregar</span>
				</span>
			</RenderIf>
		</td>
	);
};

export default TdAddProduct;
