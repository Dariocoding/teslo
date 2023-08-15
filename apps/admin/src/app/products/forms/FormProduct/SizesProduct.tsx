import SelectFormik, { OptionReactSelect } from "@/components/@forms/SelectFormik";
import { ARRSIZES } from "@teslo/interfaces";
import * as React from "react";
import { translate } from "@/i18n";

interface ISizesProductProps {}

const options: OptionReactSelect[] = ARRSIZES.map(option => ({ value: option, label: option }));

const SizesProduct: React.FunctionComponent<ISizesProductProps> = props => {
	const {} = props;

	return (
		<SelectFormik
			multiple={true}
			name="sizes"
			options={options}
			onChange={(items: OptionReactSelect[]) => {
				if (!items) return [];
				const copyItems = [...items];
				return copyItems.map(item => item.value);
			}}
			label={translate("products.label.sizes")}
			placeholder={translate("products.placeholder.sizes")}
		/>
	);
};

export default SizesProduct;
