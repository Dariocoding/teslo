import * as React from "react";
import { useOrdersFormContext } from "../../FormContainer";
import SelectFormik from "@/components/@forms/SelectFormik";
import { capitalize } from "@/utils";
import { useConfigApp } from "@/store";

interface ITdSizeProductProps {}

const TdSizeProduct: React.FunctionComponent<ITdSizeProductProps> = props => {
	const {} = props;
	const { colors } = useConfigApp();
	const { values, setValues } = useOrdersFormContext();

	React.useEffect(() => {
		if (colors.enableClothesShopping) {
			if (values.tempProduct?.sizes?.length) {
				setValues({ ...values, tempSize: values.tempProduct?.sizes[0] });
			} else {
				setValues({ ...values, tempSize: null });
			}
		}
	}, [values.tempProduct?.sizes, colors.enableClothesShopping]);

	if (!colors.enableClothesShopping) return null;

	return (
		<td className="px-2 py-3">
			<SelectFormik
				sm
				name="tempSize"
				options={values.tempProduct?.sizes?.map?.(size => ({
					label: capitalize(size),
					value: size,
				}))}
				className="mb-0"
				placeholder="Select Size"
				disabled={!values.tempProduct?.sizes?.length}
			/>
		</td>
	);
};

export default TdSizeProduct;
