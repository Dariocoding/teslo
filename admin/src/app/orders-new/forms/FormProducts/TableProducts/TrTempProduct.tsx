import { formatter } from "@/utils";
import { DetailOrderTemp } from "@teslo/interfaces";
import * as React from "react";
import TdActions from "./TdActions";
import RenderIf from "@teslo/react-ui/RenderIf";
import InputFormik from "@/components/@forms/InputFormik";
import { useOrdersFormContext } from "../../FormContainer";
import { toast } from "react-hot-toast";
import { detailTempOrdersService } from "@teslo/services";
import TdSizeProduct from "./TdSizeProduct";
import Swal from "sweetalert2";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { useIntl } from "react-intl";
import { useCartStore } from "@/store";

export interface ITrTempProductProps {
	tempP: DetailOrderTemp;
	idx: number;
}

const TrTempProduct: React.FunctionComponent<ITrTempProductProps> = props => {
	const { tempP, idx } = props;
	const { addCart } = useCartStore();
	const { formatMessage: t } = useIntl();
	const { values, setValues } = useOrdersFormContext();
	const [isEditing, setIsEditing] = React.useState(false);

	const handleClickEdit = async () => {
		if (!isEditing) {
			setIsEditing(true);
			return;
		}

		const temp = values.products.find(p => p.product.id === tempP.product.id);
		if (!temp.qty) {
			toast.error("Please add quantity");
			return;
		}

		try {
			const req = await detailTempOrdersService.updateOne(temp.id, {
				qty: tempP.qty,
				size: tempP.size,
			});

			addCart(req.data, { size: req.data.size, qty: tempP.qty, sameQty: true });

			toast.success(t({ id: "products.edit.success" }));
			setIsEditing(false);
		} catch (error) {
			console.log(error);
			toast.error("There was an error");
		} finally {
		}
	};

	const inputPriceQtyName = `products[${idx}].qty`;

	const handleClickDelete = async () => {
		async function deleteData() {
			try {
				showLoader();
				await detailTempOrdersService.deleteOne(tempP.id);
				setValues({ ...values, products: values.products.filter(p => p.id !== tempP.id) });
				toast.success(t({ id: "products.deleted.success" }));
			} catch (error) {
				console.log(error);
			} finally {
				hideLoader();
			}
		}

		const resSwal = await Swal.fire({
			title: t({ id: "orders.form.delete.temporalProduct" }),
			text: t({ id: "app.areYouSureToDoThis" }),
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
			cancelButtonText: "No",
			reverseButtons: true,
		});
		if (resSwal.isConfirmed) {
			deleteData();
		}
	};

	return (
		<tr>
			<td className="px-2 py-3">{tempP.product.code}</td>
			<td className="max-w-[130px] whitespace-normal text-xs px-2 py-3">
				{tempP.product.title}
			</td>
			<TdSizeProduct {...props} isEditing={isEditing} />
			<td></td>
			<td className="text-center px-2 py-3">{formatter.format(tempP.product.price)}</td>
			<td className="text-center px-2 py-3">
				<RenderIf isTrue={isEditing}>
					<InputFormik
						type="number"
						decimalValues={false}
						name={inputPriceQtyName}
						classNameInput="form-control-sm"
						className="mb-0"
						showError={false}
						showSuccess={false}
					/>
				</RenderIf>{" "}
				<RenderIf isTrue={!isEditing}>{tempP.qty}</RenderIf>
			</td>
			<td className="text-center px-2 py-3">
				{formatter.format((tempP.qty || 0) * tempP.product.price) || null}
			</td>
			<TdActions
				handleClickDelete={handleClickDelete}
				handleClickEdit={handleClickEdit}
				isEditing={isEditing}
			/>
		</tr>
	);
};

export default TrTempProduct;
