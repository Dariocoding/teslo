import SelectFormik, { OptionReactSelect } from "@/components/@forms/SelectFormik";
import { translate } from "@/i18n";
import { Brand } from "@teslo/interfaces";
import * as React from "react";

interface IBrandsSelectProps {
	brands: Brand[];
}

const BrandsSelect: React.FunctionComponent<IBrandsSelectProps> = props => {
	const { brands } = props;

	const options: OptionReactSelect[] = React.useMemo(
		() =>
			brands.map(
				brand =>
					({
						value: brand.idbrand,
						label: brand.title,
					} as OptionReactSelect)
			),
		[brands]
	);

	return (
		<SelectFormik options={options} name={"brand"} label={translate("products.label.brand")} />
	);
};

export default BrandsSelect;
