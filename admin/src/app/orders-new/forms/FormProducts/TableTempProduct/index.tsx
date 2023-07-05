import * as React from "react";
import HeadingTable from "../HeadingTable";
import InputFormik from "@/components/@forms/InputFormik";
import RenderIf from "@teslo/react-ui/RenderIf";
import { formatter } from "@/utils";
import TdSearchList from "./TdSearchList";
import TdAddProduct from "./TdAddProduct";
import { useOrdersFormContext } from "../../FormContainer";
import TdSizeProduct from "./TdSizeProduct";

interface ITableTempProductProps {}

const TableTempProduct: React.FunctionComponent<ITableTempProductProps> = props => {
	const {} = props;
	const { values } = useOrdersFormContext();

	return (
		<table className="table" id="tableTempProduct">
			<HeadingTable />
			<tbody>
				<tr>
					<TdSearchList />
					<td className="bg-white px-2 py-3">
						<span className="whitespace-normal max-w-[130px] block text-xs">
							{values.tempProduct?.title ? values.tempProduct?.title : "-"}
						</span>
					</td>
					<TdSizeProduct />
					<td className="bg-white px-2 py-3 text-center">
						{!isNaN(values.tempProduct?.stock) ? values.tempProduct?.stock : "-"}
					</td>
					<td className="bg-white px-2 py-3 text-center">
						{values.tempProduct?.price
							? formatter.format(values.tempProduct?.price)
							: "-"}
					</td>
					<td className="bg-white w-[125px] px-2 py-3">
						<InputFormik
							name="tempQty"
							type="number"
							decimalValues={false}
							classNameInput="form-control-sm"
							className="max-w-[125px] mb-0"
							showSuccess={false}
							showError={false}
							disabled={!values.tempProduct?.id}
						/>
					</td>
					<td className="bg-white px-2 py-3 text-center">
						<RenderIf isTrue={values.tempProduct?.price && values.tempQty}>
							{formatter.format(values.tempProduct?.price * values.tempQty)}
						</RenderIf>
						<RenderIf isTrue={!values.tempProduct?.price || !values.tempQty}>
							-
						</RenderIf>
					</td>
					<TdAddProduct />
				</tr>
			</tbody>
		</table>
	);
};

export default TableTempProduct;
